import { CreationOperatorMetadata } from "../metadata";
import { combineLatest } from "rxjs";
import { createDecorator } from "../creation";

export function CombineLatest(...propertyName: string[]) {
  const metadata = new CreationOperatorMetadata({
    name: 'combineLatest',
    operator: combineLatest,
    parameters: propertyName,
  });
  return createDecorator(metadata);
}
