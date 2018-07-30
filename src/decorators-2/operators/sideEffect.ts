import { createAccessorDecorator, createFunctionDecorator, createPropertyDecorator } from '../base';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

/**
 * Accessor Decorator: Calls the rxjs tap operator with side effect
 * causing function supplied
 * 
 * @export
 * @param {(x: any) => any} effect the side effect function to call
 * @returns {MethodDecorator} the accessor decorator
 */
export function SideEffect(effect: (x: any) => any): MethodDecorator {
  return createAccessorDecorator(
    (val: Observable<any>) => val.pipe(tap(effect)),
    'Tap'
  )
}

/**
 * Function Decorator: Calls the rxjs tap operator with side effect
 * causing function supplied
 * 
 * @export
 * @param {(x: any) => any} effect the side effect function to call
 * @returns {MethodDecorator} the function decorator
 */
export function sideEffect(effect: (x: any) => any): MethodDecorator {
  return createFunctionDecorator(
    (val: Observable<any>) => val.pipe(tap(effect)),
    'Tap'
  )
}

/**
 * Property Accessor: Calls the rxjs tap operator with side effect
 * causing function supplied
 * 
 * @export
 * @param {(x: any) => any} effect the side effect function to call
 * @returns {PropertyDecorator} the property decorator
 */
export function _sideEffect(effect: (x: any) => any): PropertyDecorator {
  return createPropertyDecorator(
    (val: Observable<any>) => val.pipe(tap(effect)),
    'Tap'
  )
}
