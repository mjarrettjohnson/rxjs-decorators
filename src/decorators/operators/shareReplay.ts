import { shareReplay } from 'rxjs/operators';
import { createDecorator } from '../creation';
import { MonoOperatorMetadata } from '../metadata';

export function ShareReplay(replayCount: number) {
  const metadata = new MonoOperatorMetadata({
    fn: () => replayCount,
    isBound: false,
    operator: shareReplay,
    name: 'shareReplay',
  });
  return createDecorator(metadata);
}
