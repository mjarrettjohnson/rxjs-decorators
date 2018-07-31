import { MonoOperatorFn, CallableFn } from "./mono-operator";


export const MONO_OPERATOR_LIST = 'Mono Operator List';

export interface MonoOperatorListPayload {
  operators: MonoOperatorFn[];
  name: string;
  fns: CallableFn[];
}

export class MonoOperatorListMetadata {
  readonly type = MONO_OPERATOR_LIST;

  constructor(public payload: MonoOperatorListPayload) { }
}