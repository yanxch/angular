import {InjectionToken} from '@angular/core';

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

export class Formatters {

    /**
     * Insert character after every characterCount
     * @param characterCount 
     */
    static spaces(characterCount: number): FormatterFn {
        return (modelValue: any) => {
            return modelValue.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
        }
    }

    static compose(formatters: (Formatter|FormatterFn)[]): FormatterFn {
        const normalizedFormatters = formatters.map(Formatters.normalize);
        return function(modelValue: any) {
            return normalizedFormatters.reduce((acc, curr) => curr(acc), modelValue);
        };
    }

    static normalize(formatter: Formatter|FormatterFn): FormatterFn {
        const isFormatter = (<Formatter>formatter).format
        if (isFormatter) {
            return (modelValue: any) => (<Formatter>formatter).format(modelValue);
        } else {
            return <FormatterFn>formatter;
        }
    }
}

export class Parsers {

    static spaces(characterCount: number): ParserFn {
        return (viewValue: string) => {
            return viewValue.replace(/\s/g, '');
        }
    }

    static compose(parsers: (Parser|ParserFn)[]): ParserFn {
        const normalizedParsers = parsers.map(Parsers.normalize);
        return function(viewValue: any) {
            return normalizedParsers.reduce((acc, curr) => curr(acc), viewValue);
        };
    }

    static normalize(parser: Parser|ParserFn): ParserFn {
        const isParser = (<Parser>parser).parse;
        if (isParser) {
            return (viewValue: string) => (<Parser>parser).parse(viewValue);
        } else {
            return <ParserFn>parser;
        }
    }
}