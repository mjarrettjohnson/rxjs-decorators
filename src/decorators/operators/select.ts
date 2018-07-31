import { createDecorator } from "../creation";
import { SelectorMetadata } from "../metadata";
import { Selector } from "reselect";

export function Select(selector: Selector<any, any>): PropertyDecorator {
  const metadata = new SelectorMetadata({ selector });
  return createDecorator(metadata);
}

