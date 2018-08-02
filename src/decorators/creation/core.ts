import { AllMetadata, CREATION_OPERATOR, MONO_OPERATOR, MULTI_OPERATOR, SUBSCRIPTION_FUNCTION } from '../metadata';
import { createAccessorDecorator } from './accessor-decorator';
import { createMethodDecorator } from './method-decorator';
import { createPropertyDecorator } from './property-decorator';
import { createSubscriptionDecorator } from './subscription-decorator';

export class InvalidMetadataForDecoratorError extends Error {
  constructor() {
    super();
    this.message = 'Invalid metadata for this decorator';
  }
}

export class CannotSubscribeToPropertyError extends Error {
  constructor() {
    super();
    this.message = 'Cannot apply the subscribe decorator to a property';
  }
}

export class NoClassDecoratorsAllowedError extends Error {
  constructor() {
    super();
    this.message = 'Cannot apply decorators to classes';
  }
}

const isAccessor = (args: any[]) => !!args[2].get;

const handlePropertyDecorator = (metadata: AllMetadata, ...args: any[]) => {
  if (metadata.type === SUBSCRIPTION_FUNCTION) {
    throw new CannotSubscribeToPropertyError();
  }
  createPropertyDecorator(metadata).apply(this, args);
};

const handleFunctionalDecorator = (metadata: AllMetadata, ...args: any[]) => {
  switch (metadata.type) {
    case MONO_OPERATOR:
      return isAccessor(args)
        ? createAccessorDecorator(metadata).apply(this, args)
        : createMethodDecorator(metadata).apply(this, args);
    case SUBSCRIPTION_FUNCTION:
      return createSubscriptionDecorator(metadata.propName).apply(this, args);
    case MULTI_OPERATOR:
    case CREATION_OPERATOR:
      throw new InvalidMetadataForDecoratorError();
  }
};

export const createDecorator = (metadata: AllMetadata) => (...args: any[]) => {
  args = args.filter(t => !!t);
  switch (args.length) {
    case 1:
      throw new NoClassDecoratorsAllowedError();
    case 2:
      return handlePropertyDecorator(metadata, ...args);
    case 3:
      return handleFunctionalDecorator(metadata, ...args);
    default:
      throw new Error('Decorators are not valid here!');
  }
};
