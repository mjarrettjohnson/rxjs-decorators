/**
 * @module operators
 */

import { merge } from 'rxjs';
import { createDecorator } from '../creation';
import { CreationOperatorMetadata } from '../metadata';

export function Merge(...propertyName: string[]) {
  const metadata = new CreationOperatorMetadata({
    name: 'merge',
    operator: merge,
    observableProperties: propertyName,
  });
  return createDecorator(metadata);
}
