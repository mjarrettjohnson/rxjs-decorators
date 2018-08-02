import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createDecorator } from '../creation';
import { CreationOperatorMetadata, MapToOperatorMetadata, NextOperatorMetadata } from '../metadata';

export function Call(functionName: string) {
  const metadata = new MapToOperatorMetadata({
    name: 'Call',
    functionName,
    operator: tap,
  });
  return createDecorator(metadata);
}
