import { UnaryFunction, ObservableInput, Observable, OperatorFunction } from 'rxjs';
import { Selector } from 'reselect';

export const MULTI_OPERATOR = 'Multi Operator';

export type MultiOperator = (...array: ObservableInput<any>[]) => OperatorFunction<any, any>;

export interface MultiOperatorPayload {
  operator: MultiOperator;
  parameters: string[];
  name: string;
}

export class MultiOperatorMetadata {
  readonly type = MULTI_OPERATOR;

  constructor(public payload: MultiOperatorPayload) { }
}