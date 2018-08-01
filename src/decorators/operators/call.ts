import { CreationOperatorMetadata, NextOperatorMetadata, MapToOperatorMetadata } from "../metadata";
import { merge } from "rxjs";
import { createDecorator } from "../creation";
import { tap } from "rxjs/operators";

export function Call(functionName: string) {
  const metadata = new MapToOperatorMetadata({
    name: 'Call',
    functionName,
    operator: tap
  });
  return createDecorator(metadata);
}
