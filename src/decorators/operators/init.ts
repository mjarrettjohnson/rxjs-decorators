import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { createDecorator } from '../creation';
import {
  CreationOperatorMetadata,
  InitOperatorMetadata,
  MapToOperatorMetadata,
  NextOperatorMetadata,
} from '../metadata';

export function Behaviour(initial?: any) {
  const metadata = new InitOperatorMetadata({
    name: 'BehaviourSubject',
    observable: new BehaviorSubject(initial || null),
  });
  return createDecorator(metadata);
}

export function From(initial: any) {
  const metadata = new InitOperatorMetadata({
    name: 'BehaviourSubject',
    observable: of(initial),
  });
  return createDecorator(metadata);
}
