/**
 * @module operators
 */

import { debounceTime } from 'rxjs/operators';
import { createDecorator } from '../creation';
import { MonoOperatorMetadata } from '../metadata';

export function DebounceTime(time: number, isBound?: boolean) {
  const metadata = new MonoOperatorMetadata({
    fn: time,
    isBound,
    operator: debounceTime,
    name: 'debounceTime',
  });
  return createDecorator(metadata);
}
