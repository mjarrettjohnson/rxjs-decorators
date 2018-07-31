import { MonoOperatorMetadata } from "../metadata";
import { noop } from "rxjs";
import { first } from "rxjs/operators";
import { createDecorator } from "../creation";

export function First(isBound?: boolean) {
  const metadata = new MonoOperatorMetadata({
    fn: noop,
    isBound,
    operator: first,
    name: 'first',
  });
  return createDecorator(metadata);
}


