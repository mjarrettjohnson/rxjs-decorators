import { filter } from 'rxjs/operators';
import { createDecorator } from '../creation';
import { MonoOperatorMetadata } from '../metadata';

export function Exists() {
  const metadata = new MonoOperatorMetadata({
    fn: x => !!x,
    isBound: false,
    operator: filter,
    name: 'filter',
  });
  return createDecorator(metadata);
}
