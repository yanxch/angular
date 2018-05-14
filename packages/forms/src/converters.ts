import {InjectionToken} from '@angular/core';
import { ValidatorFn } from '..';

export const NG_FORMATTERS = new InjectionToken<Array<Formatter|Function>>('NgFomatters');
export const NG_PARSERS = new InjectionToken<Array<Parser|Function>>('NgParsers');

export interface Formatter {
    format(modelValue: any): string;    
}

export interface FormatterFn {
    (modelValue: any): string;
}

export interface Parser {
    parse(viewValue: string): any;
}

export interface ParserFn {
    (viewValue: string): any;
}

export class Parsers {

    static compose(parsers: null): null;
    static compose(parsers: (ParserFn|null|undefined)[]): ParserFn|null;
    static compose(parsers: (ParserFn|null|undefined)[]|null): ParserFn|null {
        if (!parsers) return null;
        return null;
    }
}

export function normalizeParsers(parser: Parser|ParserFn): ParserFn {
    if ((<Parser>parser).parse) {
        return (viewValue: any) => (<Parser>parser).parse(viewValue)
    } else {
        return <ParserFn>parser;
    }
}

export class Formatters {

    static compose(formatters: null): null;
    static compose(formatters: (FormatterFn|null|undefined)[]): FormatterFn|null;
    static compose(parsers: (Formatters|null|undefined)[]|null): Formatters|null {
        if (!parsers) return null;
        return null;
    }
}

export function normalizeFormatters(formatter: Formatter|FormatterFn): FormatterFn {
    if ((<Formatter>formatter).format) {
        return (modelValue: any) => (<Formatter>formatter).format(modelValue)
    } else {
        return <FormatterFn>formatter;
    }
}