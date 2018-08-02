import { merge } from 'rxjs';
import { createDecorator } from '../creation';
import { CreationOperatorMetadata } from '../metadata';

export function Merge(...propertyName: string[]) {
  const metadata = new CreationOperatorMetadata({
    name: 'merge',
    operator: merge,
    parameters: propertyName,
  });
  return createDecorator(metadata);
}
