import { Selector } from 'reselect';
import { Observable, ObservableInput, OperatorFunction, UnaryFunction } from 'rxjs';

export const MULTI_OPERATOR = 'Multi Operator';

export type MultiOperator = (...array: Array<ObservableInput<any>>) => OperatorFunction<any, any>;

export interface MultiOperatorPayload {
  operator: MultiOperator;
  parameters: string[];
  name: string;
}

export class MultiOperatorMetadata {
  readonly type = MULTI_OPERATOR;

  constructor(public payload: MultiOperatorPayload) {}
}
