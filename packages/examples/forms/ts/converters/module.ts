/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FormattingParsingExample} from './formatting_parsing_example';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule],
  declarations: [FormattingParsingExample],
  bootstrap: [FormattingParsingExample]
})
export class AppModule {
}
