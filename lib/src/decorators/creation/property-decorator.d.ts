/**
 * @module creation
 */
import 'reflect-metadata';
import { AllMetadata } from '../metadata';
/**
 * Stores the necessary context information in the classes metadata via the property
 * the decorator is attached to. At runtime this context information is retrieved and
 * used by a custom built handler.
 *
 * @see createDecorator
 *
 * @param payload context information that is used by the associated metadata handler
 */
export declare const createPropertyDecorator: (payload: AllMetadata) => (target: object, key: string) => void;
