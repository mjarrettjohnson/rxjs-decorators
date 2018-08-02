import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NextOperatorPayload } from '../../metadata';
import { checkType } from '../errors';
import { ReactiveModel } from '../reactive-model';
import { MetadataHandler } from './handler';
import { getterFactory, setterFactory } from './utils';

export class NextOperatorhandler implements MetadataHandler {
  handle(model: ReactiveModel, propertyName: string, payload: NextOperatorPayload) {
    const { subjectName, name } = payload;

    const get = getterFactory(model);
    const set = setterFactory(model, propertyName);

    const subject: Subject<any> = get(subjectName);

    const error = checkType(model, subject, subjectName, name);

    if (error) {
      throw error;
    }

    const obs = get(propertyName).pipe(tap(x => subject.next(x)));

    set(obs);
  }
}
