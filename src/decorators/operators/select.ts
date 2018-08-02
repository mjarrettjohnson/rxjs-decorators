import { Selector } from 'reselect';
import { createDecorator } from '../creation';
import { SelectorMetadata } from '../metadata';

export function Select(selector: Selector<any, any>): PropertyDecorator {
  const metadata = new SelectorMetadata({ selector });
  return createDecorator(metadata);
}
