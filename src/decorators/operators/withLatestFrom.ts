import { MultiOperatorMetadata } from "../metadata";
import { withLatestFrom } from "rxjs/operators";
import { createDecorator } from "../creation";

export function WithLatestFrom(...propertyNames: string[]) {
  const metadata = new MultiOperatorMetadata({
    name: 'withLatestFrom',
    operator: withLatestFrom,
    parameters: propertyNames,
  });
  return createDecorator(metadata);
}
