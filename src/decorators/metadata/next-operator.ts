import { UnaryFunction, ObservableInput, Observable, OperatorFunction } from 'rxjs';
import { Selector } from 'reselect';
import { Callable } from './mono-operator';

export const NEXT_OPERATOR = 'Next Operator';


export interface NextOperatorPayload {
  subjectName: string;
  name: string;
}

export class NextOperatorMetadata {
  readonly type = NEXT_OPERATOR;

  constructor(public payload: NextOperatorPayload) { }
}