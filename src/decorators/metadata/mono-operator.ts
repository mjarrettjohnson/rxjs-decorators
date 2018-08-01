import { UnaryFunction, ObservableInput } from 'rxjs';
import { Observable } from 'rxjs';
import { Selector } from 'reselect';

export const MONO_OPERATOR = 'Mono Operator';

export type MonoOperatorFn = (...args: any[]) => UnaryFunction<any, any>;

export type Callable = ((...args: any[]) => any) | string | number | undefined;

export interface MonoOperatorPayload {
  operator: MonoOperatorFn;
  name: string;
  fn: Callable;
  isBound?: boolean;
}

export class MonoOperatorMetadata {
  readonly type = MONO_OPERATOR;

  constructor(public payload: MonoOperatorPayload) { }
}

