import { CreationOperatorMetadata } from "../metadata";
import { merge } from "rxjs";
import { createDecorator } from "../creation";

export function Merge(...propertyName: string[]) {
  const metadata = new CreationOperatorMetadata({
    name: 'merge',
    operator: merge,
    parameters: propertyName,
  });
  return createDecorator(metadata);
}
