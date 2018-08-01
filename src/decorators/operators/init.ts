


import { CreationOperatorMetadata, NextOperatorMetadata, MapToOperatorMetadata, InitOperatorMetadata } from "../metadata";
import { merge, Observable, BehaviorSubject, of } from "rxjs";
import { createDecorator } from "../creation";
import { tap } from "rxjs/operators";

export function Behaviour(initial?: any) {
  const metadata = new InitOperatorMetadata({
    name: 'BehaviourSubject',
    observable: new BehaviorSubject(initial || null)
  });
  return createDecorator(metadata);
}

export function From(initial: any) {
  const metadata = new InitOperatorMetadata({
    name: 'BehaviourSubject',
    observable: of(initial)
  });
  return createDecorator(metadata);
}
