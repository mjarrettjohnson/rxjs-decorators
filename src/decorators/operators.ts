import { createDecorator, createSubscriptionDecorator, createMultiStreamDecorator } from './create-decorator';
import { filter, map, debounceTime, first, shareReplay, tap, distinctUntilChanged } from 'rxjs/operators';
import { Selector } from 'reselect';
import { SELECTOR_METADATA, PROP_METADATA, COMBINATION_METADATA } from './metadata';
import { combineLatest, merge } from 'rxjs';

export function Filter(predicate: (_: any) => boolean) {
  return createDecorator(filter(predicate));
}

export function Transform(transform: (_: any) => any): PropertyDecorator {
  return createDecorator(map(transform));
}

export function DebounceTime(time: number) {
  return createDecorator(debounceTime(time));
}

export function Select<T, R>(selector: Selector<T, R>): PropertyDecorator {
  return createDecorator(selector, SELECTOR_METADATA);
}

export function First() {
  return createDecorator(first());
}

export function Exists() {
  return createDecorator(filter(x => !!x));
}

export function ShareReplay(replayCount: number) {
  return createDecorator(shareReplay(replayCount));
}

export function Debug(tag: string = 'DEBUG::') {
  return createDecorator(tap(x => console.log(tag, x)));
}


export function Subscribe(propertyName: string) {
  return createSubscriptionDecorator(propertyName);
}

export function CombineLatest(...propertyName: string[]) {
  return createDecorator(combineLatest, COMBINATION_METADATA, ...propertyName);
}

export function Merge(...propertyName: string[]) {
  return createMultiStreamDecorator(merge, COMBINATION_METADATA, ...propertyName);
}


export function DistinctUntilChanged(comparator: (x: any, y: any) => boolean) {
  return createDecorator(comparator ? distinctUntilChanged(comparator) : distinctUntilChanged())
}