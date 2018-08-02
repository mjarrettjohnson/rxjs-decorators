import { merge } from 'rxjs';
import { createDecorator } from '../creation';
import { CreationOperatorMetadata, NextOperatorMetadata } from '../metadata';

export function Next(subjectName: string) {
  const metadata = new NextOperatorMetadata({
    name: 'Next',
    subjectName,
  });
  return createDecorator(metadata);
}
