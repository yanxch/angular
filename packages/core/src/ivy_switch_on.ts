/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {compileComponentDecorator, compileDirective} from './render3/jit/directive';
import {compileInjectable} from './render3/jit/injectable';
import {compileNgModule} from './render3/jit/module';

export const ivyEnabled = true;
export const R3_COMPILE_COMPONENT = compileComponentDecorator;
export const R3_COMPILE_DIRECTIVE = compileDirective;
export const R3_COMPILE_INJECTABLE = compileInjectable;
export const R3_COMPILE_NGMODULE = compileNgModule;
