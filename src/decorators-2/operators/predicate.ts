import {
  createAccessorDecorator,
  createFunctionDecorator,
  createPropertyDecorator
} from '../base';
import { Observable } from 'rxjs';
import { filter } from "rxjs/operators";

/**
 * Accessor Decorator: Applies the rxjs filter operation using the 
 * supplied predicate function
 * 
 * @export
 * @param {(x: any) => boolean} predicate the predicate function to call
 * @returns {MethodDecorator}  an accessor decorator
 */
export function Predicate(predicate: (x: any) => boolean): MethodDecorator {
  return createAccessorDecorator(
    (val: Observable<any>) => val.pipe(filter(predicate)),
    'Filter'
  )
}

/**
 * Function Decorator: Applies the rxjs filter operation using the 
 * supplied predicate function
 * 
 * @export
 * @param {(x: any) => boolean} predicate the predicate function to call
 * @returns {MethodDecorator} a function decorator
 */
export function predicate(predicate: (x: any) => boolean): MethodDecorator {
  return createFunctionDecorator(
    (val: Observable<any>) => val.pipe(filter(predicate)),
    'Filter'
  )
}

/**
 * Property Decorator:  Applies the rxjs filter operation using the 
 * supplied predicate function
 * 
 * @export
 * @param {(x: any) => boolean} predicate the predicate function to call
 * @returns {PropertyDecorator} a property decorator
 */
export function _predicate(predicate: (x: any) => boolean): PropertyDecorator {
  return createPropertyDecorator(
    (val: Observable<any>) => val.pipe(filter(predicate)),
    'Filter'
  )
} 
