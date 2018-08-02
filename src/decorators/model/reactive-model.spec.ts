import { combineLatest, interval, of } from 'rxjs';
import { filter, first, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { createDecorator, createSubscriptionDecorator } from '../creation';
import { ReactiveModel } from './reactive-model';
import { noop } from '../utils';
import {
  MonoOperatorMetadata,
  MonoOperatorListMetadata,
  MapToOperatorMetadata,
  CreationOperatorMetadata,
  MultiOperatorMetadata,
} from '../metadata';

describe(' -> Reactive Model', () => {
  it('should', () => {
    const First = createDecorator(new MonoOperatorMetadata({ operator: first, fn: noop, name: 'first' }));

    const ScreamEven = createDecorator(
      new MonoOperatorListMetadata({
        operators: [filter, map, map, map],
        fns: [
          (x: number) => x % 2 === 0,
          (x: number) => `${x}`,
          (x: string) => x.toUpperCase(),
          (x: string) => `${x}!!!`,
        ],
        name: 'ScreamEven',
      }),
    );

    const Transform = (fn: (...args: any[]) => any) =>
      createDecorator(
        new MonoOperatorMetadata({
          operator: map,
          fn,
          name: 'map',
          isBound: true,
        }),
      );

    const SwitchMap = (fnName: string) =>
      createDecorator(
        new MapToOperatorMetadata({
          operator: switchMap,
          functionName: fnName,
          name: 'switchMap',
        }),
      );

    const Combine = (...args: string[]) =>
      createDecorator(
        new CreationOperatorMetadata({ operator: combineLatest, parameters: args, name: 'combineLatest' }),
      );

    const WithLatest = (...args: string[]) =>
      createDecorator(
        new MultiOperatorMetadata({
          operator: withLatestFrom,
          parameters: args,
          name: 'withLatestFrom',
        }),
      );

    const square = x => x * x;

    const Subscribe = createSubscriptionDecorator;

    class Test extends ReactiveModel {
      private prop = 'im private';

      one$ = of(1);

      @ScreamEven
      hello$ = interval(1000);

      constructor() {
        super();
        this.initialize();
      }

      toString(x: number) {
        return of(`${x}`);
      }

      switchToTwo([x, y]: [number, number]) {
        console.log(x, y);
        return of(x + y);
      }

      @Subscribe('hello$')
      handle(x: string) {
        console.log(x);
      }
    }

    const t = new Test();
  });
});
