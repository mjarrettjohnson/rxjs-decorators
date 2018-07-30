import { PROP_METADATA, SELECTOR_METADATA, SUBSCRIPTION_METADATA, COMBINATION_METADATA } from './metadata';
import { UnaryFunction } from 'rxjs';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { CombinationMetaData, MetaData } from './create-decorator';
import { tap } from 'rxjs/internal/operators/tap';
import * as util from 'util';

const print = (x) => console.log(util.inspect(x), '\n\n');


const map: WeakMap<Subscription, string> = new WeakMap();
export class ReactiveModel {

  protected subscriptions: Subscription[] = [];

  private skipped = [];

  private alreadyRan = false;

  constructor(store?: any) {
    // console.log('Model', this);
  }

  protected initialize() {
    this.apply();
    this.applySubscriptions();
  }

  private apply() {
    const propDecorators = Reflect.getMetadata(PROP_METADATA, this);

    Object.keys(propDecorators).forEach(key => {
      const values: MetaData[] = propDecorators[key];

      values.forEach(value => {
        if (value.operator) {
          this[key] = this[key].pipe(value.operator);

        } else if (value.combinator) {
          const data = value.combinator;

          const args: Observable<any>[] = data.secondObservable.map(key => {
            return this[key]
          });

          if (this[key]) {
            args.unshift(this[key]);
          }

          this[key] = (data.operator as any)(...args);
        }
      })
    })

  }


  private applyCombinators() {
    const combinatorDecorators: { [k: string]: CombinationMetaData<any, any> } = Reflect.getMetadata(COMBINATION_METADATA, this);
    if (!combinatorDecorators) {
      return;
    }

    Object.keys(combinatorDecorators).forEach(key => {
      const data: CombinationMetaData<any, any> = combinatorDecorators[key];

      const args: Observable<any>[] = data.secondObservable.map(key => this[key]);

      if (this[key]) {
        args.unshift(this[key]);
      }

      this[key] = (data.operator as any)(...args);
    })
  }

  private applySubscriptions() {
    const subDecorators: (_: any) => Subscription = Reflect.getMetadata(SUBSCRIPTION_METADATA, this);

    if (!subDecorators) {
      return;
    }

    Object.keys(subDecorators).forEach(key => {
      const obs: Observable<any> = this[key];

      subDecorators[key].forEach((subscriber: (_: any) => Subscription) => {
        this.subscriptions.push(obs.subscribe(subscriber.bind(this)));
      })

    })
  }


  private applyPropDecorators() {
    const propDecorators = Reflect.getMetadata(PROP_METADATA, this);
    if (!propDecorators) {
      return;
    }
    if (this.alreadyRan) {
      this.skipped.forEach(key => {
        // propDecorators[key].forEach(x => print(x.constructor));
        this[key] = pipeFromArray(propDecorators[key])(this[key]);
      })
      return;
    }

    Object.keys(propDecorators).forEach(key => {

      if (this[key]) {
        console.log('applying: ', key);
        this[key] = pipeFromArray(propDecorators[key])(this[key]);
      } else {
        console.log('skipping: ', key);
        this.skipped.push(key);
      }
    });

    this.alreadyRan = true;
  }

  private applySelectDecorators(store: any) {
    const selectDecorators = Reflect.getMetadata(SELECTOR_METADATA, this);

    if (!selectDecorators) {
      return;
    }

    Object.keys(selectDecorators).forEach(key => {
      this[key] = store.select(selectDecorators[key][0]);
    });
  }
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

function noop() { }
