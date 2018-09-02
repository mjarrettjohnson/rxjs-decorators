/**
 * @module model
 */
import { MetadataHandler } from '../metadata';
/**
 * Factory to determine which handler to use for the
 * decorated metadata.
 */
export declare class HandlerFactory {
    /**
     * Returns a handler for the specific type of metadata applied to
     * the model
     * @param type the metadata type
     */
    create(type: string): MetadataHandler;
}
