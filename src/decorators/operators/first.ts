import { noop } from 'rxjs';
import { first } from 'rxjs/operators';
import { createDecorator } from '../creation';
import { MonoOperatorMetadata } from '../metadata';

export function First(isBound?: boolean) {
  const metadata = new MonoOperatorMetadata({
    fn: noop,
    isBound,
    operator: first,
    name: 'first',
  });
  return createDecorator(metadata);
}
