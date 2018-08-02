import { filter, startWith } from 'rxjs/operators';
import { createDecorator } from '../creation';
import { MonoOperatorMetadata } from '../metadata';

export function StartWith(startingValue: any) {
  const metadata = new MonoOperatorMetadata({
    fn: startingValue,
    isBound: false,
    operator: startWith,
    name: 'startWith',
  });
  return createDecorator(metadata);
}
