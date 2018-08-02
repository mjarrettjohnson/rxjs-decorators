import { Selector } from 'reselect';
import { ObservableInput, UnaryFunction } from 'rxjs';
import { Observable } from 'rxjs';

export const CREATION_OPERATOR = 'Creation Operator';

export type CreationOperator = (...observable: Array<Observable<any>>) => Observable<any>;

export interface CreationOperatorPayload {
  operator: CreationOperator;
  parameters: string[];
  name: string;
}

export class CreationOperatorMetadata {
  readonly type = CREATION_OPERATOR;

  constructor(public payload: CreationOperatorPayload) {}
}
