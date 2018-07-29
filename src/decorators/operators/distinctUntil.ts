import { createAccessorDecorator, createFunctionDecorator, createPropertyDecorator } from '../base';
import { Observable } from 'rxjs';
import { distinctUntilChanged as _distinctUntilChanged } from "rxjs/operators";


/**
 * Accessor Decorator: applies the distinctUntilChanged operator to the pipeline.
 * If a comparator has been supplied, it will be used to determine equality
 * 
 * @export
 * @param {(x: any, y: any) => boolean} [compare]  a comparison function
 * @returns {MethodDecorator} a function Decorator
 */
export function DistinctUntil(compare?: (x: any, y: any) => boolean) {
  return createAccessorDecorator(
    (val: Observable<any>) => val.pipe(compare ? _distinctUntilChanged(compare) : _distinctUntilChanged()),
    'DistinctUntil'
  )
}

/**
 * Function Decorator: applies the distinctUntilChanged operator to the pipeline.
 * If a comparator has been supplied, it will be used to determine equality
 * 
 * @export
 * @param {(x: any, y: any) => boolean} [compare]  a comparison function
 * @returns {MethodDecorator} a function Decorator
 */
export function distinctUntil(compare?: (x: any, y: any) => boolean) {
  return createFunctionDecorator(
    (val: Observable<any>) => val.pipe(compare ? _distinctUntilChanged(compare) : _distinctUntilChanged()),
    'DistinctUntil'
  )
}

/**
 * Property Decorator: applies the distinctUntilChanged operator to the pipeline.
 * If a comparator has been supplied, it will be used to determine equality
 * 
 * @export
 * @param {(x: any, y: any) => boolean} [compare]  a comparison function
 * @returns {PropertyDecorator} a property Decorator
 */
export function _distinctUntil(compare?: (x: any, y: any) => boolean) {
  return createPropertyDecorator(
    (val: Observable<any>) => val.pipe(compare ? _distinctUntilChanged(compare) : _distinctUntilChanged()),
    'DistinctUntil'
  )
}