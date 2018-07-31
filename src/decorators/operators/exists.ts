import { filter } from "rxjs/operators";
import { MonoOperatorMetadata } from "../metadata";
import { createDecorator } from "../creation";

export function Exists() {
  const metadata = new MonoOperatorMetadata({
    fn: x => !!x,
    isBound: false,
    operator: filter,
    name: 'filter',
  });
  return createDecorator(metadata);
}