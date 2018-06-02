/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {assertEqual, assertNotNull} from './assert';
import {LNode, TNodeType} from './interfaces/node';

export function assertNodeType(node: LNode, type: TNodeType) {
  assertNotNull(node, 'should be called with a node');
  assertEqual(node.tNode.type, type, `should be a ${typeName(type)}`);
}

export function assertNodeOfPossibleTypes(node: LNode, ...types: TNodeType[]) {
  assertNotNull(node, 'should be called with a node');
  const found = types.some(type => node.tNode.type === type);
  assertEqual(found, true, `Should be one of ${types.map(typeName).join(', ')}`);
}

function typeName(type: TNodeType): string {
  if (type == TNodeType.Projection) return 'Projection';
  if (type == TNodeType.Container) return 'Container';
  if (type == TNodeType.View) return 'View';
  if (type == TNodeType.Element) return 'Element';
  return '<unknown>';
}
