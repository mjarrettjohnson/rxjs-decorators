/**
 * @module operators
 */

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { createDecorator } from '../creation';
import { MapToOperatorMetadata, MonoOperatorMetadata } from '../metadata';

export function Swap(switchFn: (_: any) => Observable<any>) {
  const metadata = new MonoOperatorMetadata({
    fn: switchFn,
    isBound: true,
    operator: switchMap,
    name: 'Swap',
  });
  return createDecorator(metadata);
}

export function SwapTo(methodName: string) {
  const metadata = new MapToOperatorMetadata({
    methodName,
    name: 'SwitchTo',
    operator: switchMap,
  });
  return createDecorator(metadata);
}
