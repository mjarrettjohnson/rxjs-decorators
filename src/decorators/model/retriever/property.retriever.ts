import 'reflect-metadata';
import { isObservable, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  AllMetadata,
  Callable,
  CREATION_OPERATOR,
  CreationOperatorMetadata,
  CreationOperatorPayload,
  INIT_OPERATOR,
  InitOperatorMetadata,
  InitOperatorPayload,
  MAP_TO_OPERATOR,
  MapToOperatorMetadata,
  MapToOperatorPayload,
  MONO_OPERATOR,
  MONO_OPERATOR_LIST,
  MonoOperatorFn,
  MonoOperatorListMetadata,
  MonoOperatorListPayload,
  MonoOperatorMetadata,
  MonoOperatorPayload,
  MULTI_OPERATOR,
  MultiOperatorMetadata,
  MultiOperatorPayload,
  NEXT_OPERATOR,
  NextOperatorMetadata,
  NextOperatorPayload,
  PROP_METADATA,
  PropertyMetadataContainer,
  SELECTOR_FUNCTION,
  SelectorMetadata,
  SelectorPayload,
} from '../../metadata';
import { pipeFromArray } from '../../utils';
import {
  checkType,
  DifferentOperatorAndFunctionCountError,
  FunctionDoesNotExistError,
  NoStoreProvidedError,
  PropertyDoesNotExistError,
  PropertyIsNotObservableError,
} from '../errors';
import { HandlerFactory, MetadataHandler } from '../handler';
import { ReactiveModel } from './../reactive-model';

export class PropertyDataRetriever {
  constructor(private model: ReactiveModel, store?: any) { }

  public retrieve() {
    const metadata: PropertyMetadataContainer = Reflect.getMetadata(PROP_METADATA, this.model);

    if (!metadata) {
      return;
    }

    Object.keys(metadata).forEach(this.handlePropertyMetadata(metadata));
  }

  private handlePropertyMetadata = (metadata: PropertyMetadataContainer) => (metadataKey: string) => {
    const propertyMetadata: AllMetadata[] = metadata[metadataKey];

    propertyMetadata.forEach(this.selectPropertyDecoratorHandler(metadataKey));
  };

  private selectPropertyDecoratorHandler = (propertyName: string) => (current: AllMetadata) => {
    const handler: MetadataHandler = new HandlerFactory().create(current.type);
    handler.handle(this.model, propertyName, current.payload);
  };
}
