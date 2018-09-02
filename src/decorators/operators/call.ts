/**
 * @module operators
 */
import { tap } from 'rxjs/operators';
import { createDecorator } from '../creation';
import { MapToOperatorMetadata } from '../metadata';

export function Call(methodName: string) {
  const metadata = new MapToOperatorMetadata({
    name: 'Call',
    methodName,
    operator: tap,
  });
  return createDecorator(metadata);
}
