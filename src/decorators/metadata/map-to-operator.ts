import { MonoOperatorFn } from './mono-operator';

export const MAP_TO_OPERATOR = 'Map to operator';

export interface MapToOperatorPayload {
  operator: MonoOperatorFn;
  functionName: string;
  name: string;
}

export class MapToOperatorMetadata {
  readonly type = MAP_TO_OPERATOR;

  constructor(public payload: MapToOperatorPayload) {}
}
