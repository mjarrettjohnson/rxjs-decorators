import { UnaryFunction, ObservableInput } from 'rxjs';
import { Observable } from 'rxjs';
import { Selector } from 'reselect';

export const MONO_OPERATOR = 'Mono Operator';

export type MonoOperatorFn = (...args: any[]) => UnaryFunction<any, any>;

export type CallableFn = (...args: any[]) => any;

export interface MonoOperatorPayload {
  operator: MonoOperatorFn;
  name: string;
  fn: CallableFn;
  isBound?: boolean;
}

export class MonoOperatorMetadata {
  readonly type = MONO_OPERATOR;

  constructor(public payload: MonoOperatorPayload) { }
}

