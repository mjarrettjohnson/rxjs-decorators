import { expect } from 'chai';
import { combineLatest, of } from 'rxjs';
import { distinctUntilChanged, first, withLatestFrom } from 'rxjs/operators';
import { CreationOperatorMetadata, MonoOperatorMetadata, MultiOperatorMetadata, PROP_METADATA } from '../metadata';
import { createAccessorDecorator, IncorrectDecoratorType } from './accessor-decorator';
import { createDecorator, InvalidMetadataForDecoratorError } from './core';
import { createMethodDecorator, InvalidReturnType } from './method-decorator';
import { createPropertyDecorator } from './property-decorator';

describe('-> Create Method Decorator', () => {
  it('should throw an invalid return type error if no observable is returned', () => {
    const decorator = createMethodDecorator(new MonoOperatorMetadata({ operator: first, fn: () => {}, name: 'First' }));

    class Test {
      @decorator
      method() {}
    }

    const t = new Test();

    expect(t.method.bind(t)).to.throw(
      new InvalidReturnType('Function must return an observable', t, 'method', 'First').message,
    );
  });

  it('should return an observable with the attached operator', () => {
    const decorator = createMethodDecorator(new MonoOperatorMetadata({ operator: first, fn: () => {}, name: 'First' }));

    class Test {
      @decorator
      method() {
        return of(1);
      }
    }

    const t = new Test();
    expect(t.method().source.operator.constructor.name).to.eql('TakeOperator');
  });
});

describe('-> Create Accessor Decorator', () => {
  it('should throw an invalid return type error if no observable is returned', () => {
    const decorator = createAccessorDecorator(
      new MonoOperatorMetadata({ operator: first, fn: () => {}, name: 'First' }),
    );

    class Test {
      @decorator
      get method() {
        return '';
      }
    }

    const t = new Test();

    try {
      const a = t.method;
    } catch (error) {
      expect(error.message).to.eq(
        new InvalidReturnType('Accessor must return an observable', t, 'method', 'First').message,
      );
    }
  });

  it('should throw an Incorrect decorator type error when applied to a function', () => {
    const decorator = createAccessorDecorator(
      new MonoOperatorMetadata({ operator: first, fn: () => {}, name: 'First' }),
    );
    try {
      class Test {
        @decorator
        method() {
          return of(1);
        }
      }
    } catch (e) {
      expect(e.message).to.eq(
        new IncorrectDecoratorType(
          'Accessor decorator cannot be applied to a function',
          { constructor: { name: 'Test' } },
          'method',
          'First',
        ).message,
      );
    }
  });

  it('should return an observable with the attached operator', () => {
    const decorator = createAccessorDecorator(
      new MonoOperatorMetadata({ operator: first, fn: () => {}, name: 'First' }),
    );

    class Test {
      @decorator
      get method() {
        return of(1);
      }
    }

    const t = new Test();
    expect(t.method.source.operator.constructor.name).to.eql('TakeOperator');
  });
});

describe('-> Create Property Decorator', () => {
  it('should create a new key on the metadata for an metadata payload', () => {
    const payload = new MonoOperatorMetadata({
      operator: first,
      fn: () => {},
      name: 'first',
    });
    const First = createPropertyDecorator(payload);

    class Test {
      @First
      method;
    }

    const metadata = Reflect.getMetadata(PROP_METADATA, new Test());
    expect(metadata).to.have.property('method');
    expect(metadata.method).to.eql([payload]);
  });

  it('should handle adding multiple decorators', () => {
    const firstPayload = new MonoOperatorMetadata({
      operator: first,
      fn: () => {},
      name: 'first',
    });
    const distinctPayload = new MonoOperatorMetadata({
      operator: distinctUntilChanged,
      fn: () => {},
      name: 'distinctUntilChanged',
    });

    const First = createPropertyDecorator(firstPayload);
    const DistinctUntilChanged = createPropertyDecorator(distinctPayload);

    class Test {
      @DistinctUntilChanged
      @First
      method;
    }

    const metadata = Reflect.getMetadata(PROP_METADATA, new Test());
    expect(metadata).to.have.property('method');
    expect(metadata.method.length).to.eq(2);
  });

  it('should add decorators from bottom to top', () => {
    const firstPayload = new MonoOperatorMetadata({
      operator: first,
      fn: () => {},
      name: 'first',
    });
    const distinctPayload = new MonoOperatorMetadata({
      operator: distinctUntilChanged,
      fn: () => {},
      name: 'distinctUntilChanged',
    });

    const First = createPropertyDecorator(firstPayload);
    const DistinctUntilChanged = createPropertyDecorator(distinctPayload);

    class Test {
      @DistinctUntilChanged
      @First
      method;
    }

    const metadata = Reflect.getMetadata(PROP_METADATA, new Test());
    expect(metadata).to.have.property('method');
    expect(metadata.method).to.eql([firstPayload, distinctPayload]);
  });

  it('should handle adding different types of metadata', () => {
    const firstPayload = new MonoOperatorMetadata({
      operator: first,
      fn: () => {},
      name: 'first',
    });
    const combinePayload = new CreationOperatorMetadata({
      operator: combineLatest,
      observableProperties: ['data$, id$'],
      name: 'combineLatest',
    });
    const withLatestPayload = new MultiOperatorMetadata({
      operator: withLatestFrom,
      operatorArgs: ['data$', 'id$'],
      name: 'withLatestFrom',
    });

    const First = createPropertyDecorator(firstPayload);
    const CombineLatest = createPropertyDecorator(combinePayload);
    const WithLatestFrom = createPropertyDecorator(withLatestPayload);
    class Test {
      @WithLatestFrom
      @First
      @CombineLatest
      method;
    }

    const metadata = Reflect.getMetadata(PROP_METADATA, new Test());
    expect(metadata).to.have.property('method');
    expect(metadata.method).to.eql([combinePayload, firstPayload, withLatestPayload]);
  });

  it('should handle metadata to different properties', () => {
    const firstPayload = new MonoOperatorMetadata({
      operator: first,
      fn: () => {},
      name: 'first',
    });
    const combinePayload = new CreationOperatorMetadata({
      operator: combineLatest,
      observableProperties: ['data$, id$'],
      name: 'combineLatest',
    });
    const withLatestPayload = new MultiOperatorMetadata({
      operator: withLatestFrom,
      operatorArgs: ['data$', 'id$'],
      name: 'withLatestFrom',
    });

    const First = createPropertyDecorator(firstPayload);
    const CombineLatest = createPropertyDecorator(combinePayload);
    const WithLatestFrom = createPropertyDecorator(withLatestPayload);
    class Test {
      @First
      first;

      @WithLatestFrom
      latest;

      @CombineLatest
      combine;
    }

    const metadata = Reflect.getMetadata(PROP_METADATA, new Test());
    expect(metadata).to.have.property('first');
    expect(metadata).to.have.property('latest');
    expect(metadata).to.have.property('combine');
    expect(metadata.first).to.eql([firstPayload]);
    expect(metadata.latest).to.eql([withLatestPayload]);
    expect(metadata.combine).to.eql([combinePayload]);
  });
});

describe('-> Create Decorator', () => {
  it('should create a mono operator property decorator', () => {
    const payload = new MonoOperatorMetadata({
      operator: first,
      fn: () => {},
      name: 'first',
    });
    const First = createDecorator(payload);

    class Test {
      @First
      method;
    }

    const metadata = Reflect.getMetadata(PROP_METADATA, new Test());
    expect(metadata).to.have.property('method');
    expect(metadata.method).to.eql([payload]);
  });

  it('should create a multi operator property decorator', () => {
    const combinePayload = new CreationOperatorMetadata({
      operator: combineLatest,
      observableProperties: ['data$, id$'],
      name: 'combineLatest',
    });

    const CombineLatest = createDecorator(combinePayload);
    class Test {
      @CombineLatest
      method;
    }

    const metadata = Reflect.getMetadata(PROP_METADATA, new Test());
    expect(metadata).to.have.property('method');
    expect(metadata.method).to.eql([combinePayload]);
  });

  it('should create a combination operator property decorator', () => {
    const withLatestPayload = new MultiOperatorMetadata({
      operator: withLatestFrom,
      operatorArgs: ['data$', 'id$'],
      name: 'withLatestFrom',
    });

    const WithLatestFrom = createDecorator(withLatestPayload);
    class Test {
      @WithLatestFrom
      method;
    }

    const metadata = Reflect.getMetadata(PROP_METADATA, new Test());
    expect(metadata).to.have.property('method');
    expect(metadata.method).to.eql([withLatestPayload]);
  });

  it('should create a mono operator method decorator', () => {
    const payload = new MonoOperatorMetadata({
      operator: first,
      fn: () => {},
      name: 'first',
    });
    const First = createDecorator(payload);

    class Test {
      @First
      method() {
        return of(1);
      }
    }

    const t = new Test();
    expect(t.method().source.operator.constructor.name).to.eql('TakeOperator');
  });

  it('should create a mono operator accessor decorator', () => {
    const payload = new MonoOperatorMetadata({
      operator: first,
      fn: () => {},
      name: 'first',
    });
    const First = createDecorator(payload);

    class Test {
      @First
      get method() {
        return of(1);
      }
    }

    const t = new Test();
    expect(t.method.source.operator.constructor.name).to.eql('TakeOperator');
  });

  it('should throw an error when a non mono operator  decorator is applied to a method', () => {
    const payload = new MultiOperatorMetadata({
      operator: withLatestFrom,
      operatorArgs: ['something'],
      name: 'withLatestFrom',
    });

    try {
      const WithLatest = createDecorator(payload);

      class Test {
        @WithLatest
        method() {
          return of(1);
        }
      }

      const t = new Test();
    } catch (e) {
      expect(e.message).to.eq(new InvalidMetadataForDecoratorError().message);
    }
  });

  it('should throw an error when a non mono operator  decorator is applied to an accessor', () => {
    const payload = new MultiOperatorMetadata({
      operator: withLatestFrom,
      operatorArgs: ['something'],
      name: 'withLatestFrom',
    });

    try {
      const WithLatest = createDecorator(payload);

      class Test {
        @WithLatest
        get method() {
          return of(1);
        }
      }

      const t = new Test();
    } catch (e) {
      expect(e.message).to.eq(new InvalidMetadataForDecoratorError().message);
    }
  });
});
