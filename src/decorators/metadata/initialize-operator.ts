import { UnaryFunction, ObservableInput, Observable, OperatorFunction } from 'rxjs';
import { Selector } from 'reselect';
import { Callable } from './mono-operator';

export const INIT_OPERATOR = 'Initialize Operator';


export interface InitOperatorPayload {
  observable: Observable<any>;
  name: string;
}

export class InitOperatorMetadata {
  readonly type = INIT_OPERATOR;

  constructor(public payload: InitOperatorPayload) { }
}