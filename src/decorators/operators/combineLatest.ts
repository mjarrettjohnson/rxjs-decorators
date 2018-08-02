import { combineLatest } from 'rxjs';
import { createDecorator } from '../creation';
import { CreationOperatorMetadata } from '../metadata';

export function CombineLatest(...propertyName: string[]) {
  const metadata = new CreationOperatorMetadata({
    name: 'combineLatest',
    operator: combineLatest,
    parameters: propertyName,
  });
  return createDecorator(metadata);
}
