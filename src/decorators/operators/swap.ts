import { MonoOperatorMetadata, MapToOperatorMetadata } from "../metadata";
import { map, switchMap } from "rxjs/operators";
import { createDecorator } from "../creation";
import { Observable } from "rxjs";

export function Swap(switchFn: (_: any) => Observable<any>) {
  const metadata = new MonoOperatorMetadata({
    fn: switchFn,
    isBound: true,
    operator: switchMap,
    name: 'Swap',
  });
  return createDecorator(metadata);
}

export function SwapTo(functionName: string) {
  const metadata = new MapToOperatorMetadata({
    functionName,
    name: 'SwitchTo',
    operator: switchMap
  });
  return createDecorator(metadata);
}
