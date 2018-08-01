import { filter, startWith } from "rxjs/operators";
import { MonoOperatorMetadata } from "../metadata";
import { createDecorator } from "../creation";

export function StartWith(startingValue: any) {
  const metadata = new MonoOperatorMetadata({
    fn: startingValue,
    isBound: false,
    operator: startWith,
    name: 'startWith',
  });
  return createDecorator(metadata);
}