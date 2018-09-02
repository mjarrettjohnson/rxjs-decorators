/**
 * @module operators
 */
import { withLatestFrom } from 'rxjs/operators';
import { createDecorator } from '../creation';
import { MultiOperatorMetadata } from '../metadata';

export function WithLatestFrom(...propertyNames: string[]) {
  const metadata = new MultiOperatorMetadata({
    name: 'withLatestFrom',
    operator: withLatestFrom,
    operatorArgs: propertyNames,
  });
  return createDecorator(metadata);
}
