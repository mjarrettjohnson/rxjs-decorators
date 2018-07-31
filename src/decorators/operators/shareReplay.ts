import { createDecorator } from "../creation";
import { shareReplay } from "rxjs/operators";
import { MonoOperatorMetadata } from "../metadata";

export function ShareReplay(replayCount: number) {
  const metadata = new MonoOperatorMetadata({
    fn: () => replayCount,
    isBound: false,
    operator: shareReplay,
    name: 'shareReplay',
  });
  return createDecorator(metadata);
}
