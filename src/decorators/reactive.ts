import { PROP_METADATA, SELECTOR_METADATA } from './metadata';
import { UnaryFunction } from 'rxjs';


export function Reactive() {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {


      private applyPropDecorators() {
        const propDecorators = Reflect.getMetadata(PROP_METADATA, this);

        Object.keys(propDecorators).forEach(key => {
          this[key] = pipeFromArray(propDecorators[key])(this[key]);
        });
      }

      private applySelectDecorators() {
        const selectDecorators = Reflect.getMetadata(SELECTOR_METADATA, this);

        console.log('SELECT DECORATORS', selectDecorators);
        // Object.keys(selectDecorators).forEach(key => {
        //   this[key] = (this as any).store.pipe(select(selectDecorators[key]));
        // });
      }
    };
  };
}

function pipeFromArray<T, R>(fns: Array<UnaryFunction<T, R>>): UnaryFunction<T, R> {
  if (!fns) {
    return noop as UnaryFunction<any, any>;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input: T): R {
    return fns.reduce((prev: any, fn: UnaryFunction<T, R>) => fn(prev), input as any);
  };
}

function noop() {}
