import { createDecorator } from "../creation";
import { MonoOperatorMetadata } from "../metadata";
import { filter } from "rxjs/operators";

export function Filter(predicate: (...args: any[]) => boolean, isBound?: boolean) {
  const metadata = new MonoOperatorMetadata({
    fn: predicate,
    isBound,
    operator: filter,
    name: 'Filter',
  });
  return createDecorator(metadata);
}