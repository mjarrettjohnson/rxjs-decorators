/**
 * @module model
 */

import {
  CREATION_OPERATOR,
  CreationOperatorHandler,
  INIT_OPERATOR,
  InitOperatorHandler,
  MAP_TO_OPERATOR,
  MapToOperatorHandler,
  MetadataHandler,
  MONO_OPERATOR,
  MONO_OPERATOR_LIST,
  MonoOperatorHandler,
  MonoOperatorListHandler,
  MULTI_OPERATOR,
  MultiOperatorHandler,
  NEXT_OPERATOR,
  NextOperatorhandler,
  SELECTOR_FUNCTION,
  SelectorFunctionHandler,
  SUBSCRIPTION_FUNCTION,
  SubscriptionHandler,
} from '../metadata';

/**
 * Factory to determine which handler to use for the
 * decorated metadata.
 */
export class HandlerFactory {
  /**
   * Returns a handler for the specific type of metadata applied to
   * the model
   * @param type the metadata type
   */
  create(type: string): MetadataHandler {
    switch (type) {
      case MONO_OPERATOR:
        return new MonoOperatorHandler();
      case CREATION_OPERATOR:
        return new CreationOperatorHandler();
      case MULTI_OPERATOR:
        return new MultiOperatorHandler();
      case MAP_TO_OPERATOR:
        return new MapToOperatorHandler();
      case MONO_OPERATOR_LIST:
        return new MonoOperatorListHandler();
      case SELECTOR_FUNCTION:
        return new SelectorFunctionHandler();
      case NEXT_OPERATOR:
        return new NextOperatorhandler();
      case INIT_OPERATOR:
        return new InitOperatorHandler();
      case SUBSCRIPTION_FUNCTION:
        return new SubscriptionHandler();
    }
  }
}
