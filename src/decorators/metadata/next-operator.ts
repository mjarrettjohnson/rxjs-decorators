import { Selector } from 'reselect';
import { Observable, ObservableInput, OperatorFunction, UnaryFunction } from 'rxjs';
import { Callable } from './mono-operator';

export const NEXT_OPERATOR = 'Next Operator';

export interface NextOperatorPayload {
  subjectName: string;
  name: string;
}

export class NextOperatorMetadata {
  readonly type = NEXT_OPERATOR;

  constructor(public payload: NextOperatorPayload) {}
}
