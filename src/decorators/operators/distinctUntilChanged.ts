/**
 * @module operators
 */

import { distinctUntilChanged } from 'rxjs/operators';
import { createDecorator } from '../creation';
import { MonoOperatorMetadata } from '../metadata';

export function DistinctUntilChanged(comparator?: (x: any, y: any) => boolean) {
  const metadata = new MonoOperatorMetadata({
    fn: comparator,
    isBound: true,
    operator: distinctUntilChanged,
    name: 'distinctUntilChanged',
  });
  return createDecorator(metadata);
}
