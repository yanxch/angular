import {Formatter, Formatters, NG_FORMATTERS, NG_PARSERS, Parser, Parsers} from '../converters';
import {Directive, forwardRef} from '@angular/core';

export const SPACES_FORMATTER: any = {
    provide: NG_FORMATTERS,
    useExisting: forwardRef(() => SpacesFormatter),
    multi: true
};

export const SPACES_PARSER: any = {
  provide: NG_PARSERS,
  useExisting: forwardRef(() => SpacesParser),
  multi: true
};

@Directive({
    selector: '[spacesFormatter]',
    providers: [SPACES_FORMATTER]
})
export class SpacesFormatter implements Formatter {
    format(modelValue: any): string {
        return Formatters.spaces(4)(modelValue);
    }
}

@Directive({
    selector: '[spacesFormatter]',
    providers: [SPACES_PARSER]
})
export class SpacesParser implements Parser {
    parse(viewValue: string): any {
        return Parsers.spaces(4)(viewValue);
    }
}