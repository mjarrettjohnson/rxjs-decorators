import { Selector } from 'reselect';

export const SELECTOR_FUNCTION = 'Selector Function';

export interface SelectorPayload {
  selector: Selector<any, any>;
}

export class SelectorMetadata {
  readonly type = SELECTOR_FUNCTION;

  constructor(public payload: SelectorPayload) {}
}
