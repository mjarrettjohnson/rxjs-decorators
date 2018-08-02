import { tap } from 'rxjs/operators';
import { createDecorator } from '../creation';
import { MonoOperatorMetadata } from '../metadata';

export function Debug(tag: string = 'DEBUG::') {
  const metadata = new MonoOperatorMetadata({
    fn: x => console.log(tag, x),
    isBound: true,
    operator: tap,
    name: 'Debug',
  });
  return createDecorator(metadata);
}
