import { CreationOperatorMetadata, NextOperatorMetadata } from "../metadata";
import { merge } from "rxjs";
import { createDecorator } from "../creation";

export function Next(subjectName: string) {
  const metadata = new NextOperatorMetadata({
    name: 'Next',
    subjectName
  });
  return createDecorator(metadata);
}
