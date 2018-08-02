import { Selector } from 'reselect';
import { ObservableInput, UnaryFunction } from 'rxjs';
import { Observable } from 'rxjs';

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

  constructor(public payload: MonoOperatorPayload) {}
}
