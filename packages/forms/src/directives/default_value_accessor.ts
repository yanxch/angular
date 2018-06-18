/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Directive, ElementRef, Inject, InjectionToken, Optional, Renderer2, forwardRef, Self} from '@angular/core';
import {ɵgetDOM as getDOM} from '@angular/platform-browser';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from './control_value_accessor';
import { NG_FORMATTERS, Formatter, FormatterFn, NG_PARSERS, Parser, ParserFn, Formatters, Parsers } from '../converters';

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DefaultValueAccessor),
  multi: true
};

/**
 * We must check whether the agent is Android because composition events
 * behave differently between iOS and Android.
 */
function _isAndroid(): boolean {
  const userAgent = getDOM() ? getDOM().getUserAgent() : '';
  return /android (\d+)/.test(userAgent.toLowerCase());
}

/**
 * Turn this mode on if you want form directives to buffer IME input until compositionend
 * @experimental
 */
export const COMPOSITION_BUFFER_MODE = new InjectionToken<boolean>('CompositionEventMode');

/**
 * The default accessor for writing a value and listening to changes that is used by the
 * `NgModel`, `FormControlDirective`, and `FormControlName` directives.
 *
 *  ### Example
 *  ```
 *  <input type="text" name="searchQuery" ngModel>
 *  ```
 *
 *
 */
@Directive({
  selector:
      'input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
  // TODO: vsavkin replace the above selector with the one below it once
  // https://github.com/angular/angular/issues/3011 is implemented
  // selector: '[ngModel],[formControl],[formControlName]',
  host: {
    '(input)': '$any(this)._handleInput($event.target.value)',
    '(blur)': '$any(this)._handleBlur($event.target.value)',
    '(compositionstart)': '$any(this)._compositionStart()',
    '(compositionend)': '$any(this)._compositionEnd($event.target.value)'
  },
  providers: [DEFAULT_VALUE_ACCESSOR]
})
export class DefaultValueAccessor implements ControlValueAccessor {
  onChange = (_: any) => {};
  onTouched = () => {};

  /** Whether the user is creating a composition string (IME events). */
  private _composing = false;
  private _formatter: FormatterFn;
  private _parser: ParserFn;

  constructor(
      private _renderer: Renderer2, private _elementRef: ElementRef,
      @Optional() @Self() @Inject(NG_FORMATTERS) private _formatters: (Formatter|FormatterFn)[],
      @Optional() @Self() @Inject(NG_PARSERS) private _parsers: (Parser|ParserFn)[],
      @Optional() @Inject(COMPOSITION_BUFFER_MODE) private _compositionMode: boolean) {
    this._formatter = Formatters.compose(_formatters || []);
    this._parser = Parsers.compose(_parsers || []);
    
    console.log(this._formatter);
    console.log(this._parser);

    if (this._compositionMode == null) {
      this._compositionMode = !_isAndroid();
    }
  }

  writeValue(value: any): void {
    const normalizedValue = value == null ? '' : value;
    const formattedValue = this._formatter(normalizedValue);
    console.log('Formatted Value: ' + formattedValue);
    this._renderer.setProperty(this._elementRef.nativeElement, 'value', formattedValue);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }

  /** @internal */
  _handleInput(value: any): void {
    if (!this._compositionMode || (this._compositionMode && !this._composing)) {
      const parsedValue = this._parser(value);
      this.writeValue(parsedValue); 
      console.log('Input - Parsed Value: ' + parsedValue);
      this.onChange(parsedValue);
    }
  }

  _handleBlur(value: any): void {
    const parsedValue = this._parser(value);
    console.log('Blur - Parsed Value: ' + parsedValue);
    this.writeValue(parsedValue);
    this.onTouched();
  }

  /** @internal */
  _compositionStart(): void { this._composing = true; }

  /** @internal */
  _compositionEnd(value: any): void {
    this._composing = false;
    this._compositionMode && this.onChange(value);
  }
}
