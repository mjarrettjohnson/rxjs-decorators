import { createAccessorDecorator, createFunctionDecorator, createPropertyDecorator } from '../base';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

/**
 * Accessor Decorator: Transforms a item flowing through a pipeline 
 * by applying the rxjs map operator using the supplied transformer function
 * 
 * @export
 * @param {(_: any) => any} transformer the transforming function to apply
 * @returns {MethodDecorator} the accessor decorator
 */
export function Transform(transformer: (_: any) => any): MethodDecorator {
  return createAccessorDecorator(
    (val: Observable<any>) => val.pipe(map(transformer)),
    'Transform'
  )
}

/**
 * Function Decorator: Transforms a item flowing through a pipeline 
 * by applying the rxjs map operator using the supplied transformer function
 * 
 * @export
 * @param {(_: any) => any} transformer the transforming function to apply
 * @returns {MethodDecorator} the function decorator
 */
export function transform(transformer: (_: any) => any): MethodDecorator {
  return createFunctionDecorator(
    (val: Observable<any>) => val.pipe(map(transformer)),
    'Transform'
  )
}

/**
 * Property Accessor: Transforms a item flowing through a pipeline 
 * by applying the rxjs map operator using the supplied transformer function
 * 
 * @export
 * @param {(_: any) => any} transformer the transforming function to apply
 * @returns {PropertyDecorator} the property decorator
 */
export function _transform(transformer: (_: any) => any): PropertyDecorator {
  return createPropertyDecorator(
    (val: Observable<any>) => val.pipe(map(transformer)),
    'Transform'
  )
}
