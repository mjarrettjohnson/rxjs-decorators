import { UnaryFunction, ObservableInput } from 'rxjs';
import { Observable } from 'rxjs';
import { Selector } from 'reselect';

export const CREATION_OPERATOR = 'Creation Operator';


export type CreationOperator = (...observable: Observable<any>[]) => Observable<any>;

export interface CreationOperatorPayload {
  operator: CreationOperator;
  parameters: string[];
  name: string;
}

export class CreationOperatorMetadata {
  readonly type = CREATION_OPERATOR;

  constructor(public payload: CreationOperatorPayload) { }
}
