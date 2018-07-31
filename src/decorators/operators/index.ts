import { createDecorator } from '../creation/create';
import {
  filter,
  map,
  debounceTime,
  first,
  shareReplay,
  tap,
  distinctUntilChanged,
  withLatestFrom,
} from 'rxjs/operators';
import {
  MonoOperatorMetadata,
  SelectorMetadata,
  CreationOperatorMetadata,
  MultiOperatorMetadata,
} from '../creation/create-property-decorator';
import { Selector } from '../../../node_modules/reselect';
import { noop, combineLatest, merge } from '../../../node_modules/rxjs';
import { SubscriptionMetadata } from '../creation/create-subscription-decorator';

export function Filter(predicate: (_: any) => boolean, isBound?: boolean) {
  const metadata = new MonoOperatorMetadata({
    fn: predicate,
    isBound,
    operator: filter,
    name: 'filter',
  });
  return createDecorator(metadata);
}

export function Transform(transform: (_: any) => any, isBound?: boolean): PropertyDecorator {
  const metadata = new MonoOperatorMetadata({
    fn: transform,
    isBound,
    operator: map,
    name: 'map',
  });
  return createDecorator(metadata);
}

export function DebounceTime(time: number, isBound?: boolean) {
  const metadata = new MonoOperatorMetadata({
    fn: () => time,
    isBound,
    operator: debounceTime,
    name: 'debounceTime',
  });
  return createDecorator(metadata);
}

export function Select(selector: Selector<any, any>): PropertyDecorator {
  const metadata = new SelectorMetadata({ selector });
  return createDecorator(metadata);
}

export function First(isBound?: boolean) {
  const metadata = new MonoOperatorMetadata({
    fn: noop,
    isBound,
    operator: first,
    name: 'first',
  });
  return createDecorator(metadata);
}

export function Exists() {
  const metadata = new MonoOperatorMetadata({
    fn: x => !!x,
    isBound: false,
    operator: filter,
    name: 'filter',
  });
  return createDecorator(metadata);
}

export function ShareReplay(replayCount: number) {
  const metadata = new MonoOperatorMetadata({
    fn: () => replayCount,
    isBound: false,
    operator: shareReplay,
    name: 'shareReplay',
  });
  return createDecorator(metadata);
}

export function Debug(tag: string = 'DEBUG::') {
  const metadata = new MonoOperatorMetadata({
    fn: x => console.log(tag, x),
    isBound: true,
    operator: tap,
    name: 'tap',
  });
  return createDecorator(metadata);
}

export function Subscribe(propertyName: string) {
  return createDecorator(new SubscriptionMetadata(propertyName));
}

export function CombineLatest(...propertyName: string[]) {
  const metadata = new CreationOperatorMetadata({
    name: 'combineLatest',
    operator: combineLatest,
    parameters: propertyName,
  });
  return createDecorator(metadata);
}

export function Merge(...propertyName: string[]) {
  const metadata = new CreationOperatorMetadata({
    name: 'merge',
    operator: merge,
    parameters: propertyName,
  });
  return createDecorator(metadata);
}

export function DistinctUntilChanged(comparator?: (x: any, y: any) => boolean) {
  const metadata = new MonoOperatorMetadata({
    fn: comparator ? comparator : noop,
    isBound: true,
    operator: distinctUntilChanged,
    name: 'distinctUntilChanged',
  });
  return createDecorator(metadata);
}

export function WithLatestFrom(...propertyNames: string[]) {
  const metadata = new MultiOperatorMetadata({
    name: 'withLatestFrom',
    operator: withLatestFrom,
    parameters: propertyNames,
  });
  return createDecorator(metadata);
}
