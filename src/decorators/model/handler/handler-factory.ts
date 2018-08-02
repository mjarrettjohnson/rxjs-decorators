import {
  AllMetadata,
  CREATION_OPERATOR,
  INIT_OPERATOR,
  MAP_TO_OPERATOR,
  MONO_OPERATOR,
  MONO_OPERATOR_LIST,
  MULTI_OPERATOR,
  NEXT_OPERATOR,
  SELECTOR_FUNCTION,
} from '../../metadata';
import { CreationOperatorHandler } from './creation-operator.handler';
import { MetadataHandler } from './handler';
import { InitOperatorHandler } from './init-operator.handler';
import { MapToOperatorHandler } from './map-to-operator.handler';
import { MonoOperatorListHandler } from './mono-operator-list.handler';
import { MonoOperatorHandler } from './mono-operator.handler';
import { MultiOperatorHandler } from './multi-operator.handler';
import { NextOperatorhandler } from './next-operator.handler';
import { SelectorFunctionHandler } from './selector-function.handler';

export class HandlerFactory {
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
    }
  }
}
