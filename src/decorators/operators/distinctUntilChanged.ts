import { MonoOperatorMetadata } from "../metadata";
import { noop } from "../utils";
import { distinctUntilChanged } from "rxjs/operators";
import { createDecorator } from "../creation";

export function DistinctUntilChanged(comparator?: (x: any, y: any) => boolean) {
  const metadata = new MonoOperatorMetadata({
    fn: comparator,
    isBound: true,
    operator: distinctUntilChanged,
    name: 'distinctUntilChanged',
  });
  return createDecorator(metadata);
}
