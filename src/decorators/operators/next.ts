/**
 * @module operators
 */

import { createDecorator } from '../creation';
import { NextOperatorMetadata } from '../metadata';

export function Next(subjectName: string) {
  const metadata = new NextOperatorMetadata({
    name: 'Next',
    subjectName,
  });
  return createDecorator(metadata);
}
