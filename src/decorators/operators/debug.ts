import { createFunctionDecorator, createAccessorDecorator, createPropertyDecorator } from '../base';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

/**
 * Accessor Decorator: Logs every emission through the pipeline. 
 * If a logging function is defined calls the logging function
 * 
 * @export
 * @param {string} [tag] he tag to prefix the log message
 * @param {(_: any) => any} [logger] an optional function used to log 
 * @returns {MethodDecorator} A accessor decorator
 */
export function Debug(tag?: string, logger?: (_: any) => any): MethodDecorator {
  if (!tag) {
    tag = 'TEST::'
  }
  return createAccessorDecorator(
    (val: Observable<any>) => val.pipe(tap((value: any) => logger ? logger(`${tag}${value}`) : console.log(tag, value))),
    'Debug'
  )
}

/**
 * Function Decorator: Logs every emission through the pipeline. 
 * If a logging function is defined calls the logging function
 * 
 * @export
 * @param {string} [tag] he tag to prefix the log message
 * @param {(_: any) => any} [logger] an optional function used to log 
 * @returns {MethodDecorator} A function decorator
 */
export function debug(tag?: string, logger?: (_: any) => any): MethodDecorator {
  if (!tag) {
    tag = 'TEST::'
  }
  return createFunctionDecorator(
    (val: Observable<any>) => val.pipe(tap((value: any) => logger ? logger(`${tag}${value}`) : console.log(tag, value))),
    'Debug'
  )
}

/**
 * Property Decorator: Logs every emission through the pipeline. 
 * If a logging function is defined calls the logging function
 * 
 * @export
 * @param {string} [tag] he tag to prefix the log message
 * @param {(_: any) => any} [logger] an optional function used to log 
 * @returns {PropertyDecorator} A property decorator
 */
export function _debug(tag?: string, logger?: (_: any) => any): PropertyDecorator {
  if (!tag) {
    tag = 'TEST::'
  }
  return createPropertyDecorator(
    (val: Observable<any>) => val.pipe(tap((value: any) => logger ? logger(`${tag}${value}`) : console.log(tag, value))),
    'Debug'
  )
}
