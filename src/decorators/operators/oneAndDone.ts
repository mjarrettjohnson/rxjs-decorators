import { createAccessorDecorator, createFunctionDecorator, createPropertyDecorator } from '../base';
import { Observable } from 'rxjs';
import { first } from "rxjs/operators";

/**
 * Accessor Decorator: Applies the rxjs first() operator to the returned observable
 * pipeline
 * 
 * @export
 * @returns {MethodDecorator} A accessor decorator
 */
export function OneAndDone() {
  return createAccessorDecorator(
    (val: Observable<any>) => val.pipe(first()),
    'OneAndDone'
  )
}

/**
 * Function Decorator: Applies the rxjs first() operator to the returned observable
 * pipeline
 * 
 * @export
 * @returns {MethodDecorator} A function decorator
 */
export function oneAndDone() {
  return createFunctionDecorator(
    (val: Observable<any>) => val.pipe(first()),
    'OneAndDone'
  )
}

/**
 * Property Decorator: Applies the rxjs first() operator to the returned observable
 * pipeline
 * 
 * @export
 * @returns {PropertyDecorator} A property decorator
 */
export function _oneAndDone() {
  return createPropertyDecorator(
    (val: Observable<any>) => val.pipe(first()),
    'OneAndDone'
  )
}
