import { Selector } from 'reselect';
import { Observable, ObservableInput, OperatorFunction, UnaryFunction } from 'rxjs';
import { Callable } from './mono-operator';

export const INIT_OPERATOR = 'Initialize Operator';

export interface InitOperatorPayload {
  observable: Observable<any>;
  name: string;
}

export class InitOperatorMetadata {
  readonly type = INIT_OPERATOR;

  constructor(public payload: InitOperatorPayload) {}
}
