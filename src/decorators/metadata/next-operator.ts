/**
 * @module metadata
 */
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DecoratorPayload } from '../creation';
import { checkType, getObservableFactory, ReactiveModel, setterFactory } from '../model';
import { MetadataHandler } from './metadata-handler';

export const NEXT_OPERATOR = 'Next Operator';

export interface NextOperatorPayload extends DecoratorPayload {
  /**
   * The name of the reactive model subject to next a value onto.
   */
  subjectName: string;
}

export class NextOperatorMetadata {
  readonly type = NEXT_OPERATOR;

  constructor(public payload: NextOperatorPayload) {}
}

/**
 * Handles NextOperatorHandler by calling next on the reactive model subject stored at the
 * supplied property name.
 */
export class NextOperatorhandler implements MetadataHandler {
  /**
   * Retrieves the subject defined at the subject name and passes
   * all data flowing through the current observable pipeline to it.
   *
   * @param model the reactive model the decorator is applied to
   * @param propertyName the property the decorator is applied to
   * @param payload the next operator payload
   */
  handle(model: ReactiveModel, propertyName: string, payload: NextOperatorPayload) {
    const { subjectName, name } = payload;

    const get = getObservableFactory(model);
    const set = setterFactory(model, propertyName);

    const subject = get(subjectName) as Subject<any>;

    const error = checkType(model, subject, subjectName, name);

    if (error) {
      throw error;
    }

    const obs = get(propertyName).pipe(tap(x => subject.next(x)));

    set(obs);
  }
}
