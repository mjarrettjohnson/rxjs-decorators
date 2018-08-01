import { MonoOperatorMetadata } from "../metadata";
import { map } from "rxjs/operators";
import { createDecorator } from "../creation";

export function Transform(transform: (_: any) => any, isBound?: boolean) {
  const metadata = new MonoOperatorMetadata({
    fn: transform,
    isBound,
    operator: map,
    name: 'Transform',
  });
  return createDecorator(metadata);
}
