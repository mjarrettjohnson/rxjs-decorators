# RxJS Decorators: Create observable pipelines using decorators.

Rxjs-Decorators is a library that you can use to apply observable pipelines using decorators. Using decorators to apply
your pipeline operators forces a more functional style and creates more readable code.

## Docs

Documentation can be found [here](http://miles-johnson.me)

## Usage

To use decorators in your project first ensure that your class extends `ReactiveModel` and secondly calls the initialize
method.

The initialize function is what applies the rxjs-operators to your observables and as such should be done after
construction.

```typescript
export class MyModel extends ReactiveModel {
  constructor() {
    super();

    this.initialize();
  }
}
```

### Basic Operators

#### Filter

```typescript
export class MyFilteredStream extends ReactiveModel {
  @Filter(second => second % 2 === 0)
  even$ = interval(1000);

  constructor() {
    super();

    this.initialize();
  }
}
```

### Creation Operators

#### CombineLatest

```typescript
export class MyModel extends ReactiveModel {
  firstName$: Observable<string>;

  lastName$: Observable<string>;

  @CombineLatest('firstName$', 'lastName$')
  name$: Observable<string[]>;

  constructor() {
    super();

    this.initialize();
  }
}
```

### Subscription

```typescript
export class MyModel extends ReactiveModel {
  seconds$ = interval(1000);

  constructor() {
    super();

    this.initialize();
  }

  @Subscribe('seconds$')
  count(second: number) {
    console.log(second);
  }
}
```

#### Managing Subscriptions

```typescript
export class MyModel extends ReactiveModel {
  seconds$ = interval(1000);

  constructor() {
    super();

    this.initialize();
  }

  @Subscribe('seconds$')
  count(second: number) {
    console.log(second);
  }

  unsubscribe() {
    this.destroy();
  }
}
```

### NgRx

#### Select

```typescript
const myDataSelector = createSelector(
  getFirstName,
  getLastName,
  (first, last) => ({first, last});
)

export class MyStoreAwareModel extends ReactiveModel {

  @Select(myDataSelector)
  getData: Observable<MyData>;

  constructor(private store: Store<State>) {
    super(store);

    this.initialize();
  }
}
```

### New Operators

#### Debug

```typescript
export class MyModel extends ReactiveModel {
  @Transform((x: number) => x * x)
  @Debug('My debug message') // will print out 1, 2, 3...
  seconds$ = interval(1000);

  constructor() {
    super();

    this.initialize();
  }

  @Subscribe('seconds$')
  count(second: number) {
    console.log(second); // will print out 1, 4, 9...
  }
}
```

#### Initialization

```typescript
export class MyFilteredStream extends ReactiveModel {
  @Behaviour('')
  bs$: BehaviourSubject<string>;

  constructor() {
    super();

    this.initialize();
  }
}
```

### Decorator Chaining

Decorators are applied from bottom to top, so the following code will filter all odd numbers THEN log the result before
multipling the even numbers by 2

```typescript
export class MyPipelineModel extends ReactiveModel {
  @Transform(second => second * 2)
  @Debug()
  @Filter(second => second % 2 === 0)
  even$ = interval(1000);

  constructor() {
    super();

    this.initialize();
  }
}
```

Functions passed to decorators can also be pulled to be standalone

```typescript
const timesByTwo = x => x * 2;
const onlyEven = x => x % 2 === 0;

export class MyPipelineModel extends ReactiveModel {
  @Transform(timesByTwo)
  @Debug()
  @Filter(onlyEven)
  even$ = interval(1000);

  constructor() {
    super();

    this.initialize();
  }
}
```

### Pipe

Create your own custom decorators by using the Pipe function. Just like RxJS!

```typescript
const timesByTwo = x => x * 2;
const onlyEven = x => x % 2 === 0;

// note functions are applied from beginning to end
const BusinessLogic = (prefix: string) => Pipe([Filter(onlyEven), Debug(prefix), Transform(timesByTwo)]);

const timesByTwo = x => x * 2;
const onlyEven = x => x % 2 === 0;

export class MyPipelineModel extends ReactiveModel {
  @BusinessLogic('My debug message')
  even$ = interval(1000);

  constructor() {
    super();

    this.initialize();
  }
}
```

### Create your own!

```typescript
export function DebounceTwoSeconds() {
  const metadata = new MonoOperatorMetadata({
    fn: 2000,
    isBound: false,
    operator: debounceTime,
    name: 'debounceTime',
  });
  return createDecorator(metadata);
}
```
