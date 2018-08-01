import { MonoOperatorFn, Callable } from "./mono-operator";


export const MONO_OPERATOR_LIST = 'Mono Operator List';

export interface MonoOperatorListPayload {
  operators: MonoOperatorFn[];
  name: string;
  fns: Callable[];
}

export class MonoOperatorListMetadata {
  readonly type = MONO_OPERATOR_LIST;

  constructor(public payload: MonoOperatorListPayload) { }
}