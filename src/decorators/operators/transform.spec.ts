import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs';
import { Transform, transform } from './transform';



describe('Transform: Accessor Decorator', () => {
  it('applies the transform', () => {

    const emitter = new BehaviorSubject<number>(0);

    const results = [];

    const square = (x: number) => x * x;

    class TestClass {

      @Transform(square)
      get single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next(1);



    test.single$.subscribe((value: number) => {
      results.push(value);
    })

    emitter.next(10);

    expect(results).to.eql([1, 100]);
  })
})

describe('Transform: Function Decorator', () => {
  it('applies the transform', () => {

    const emitter = new BehaviorSubject<number>(0);

    const results = [];

    const square = (x: number) => x * x;

    class TestClass {

      @transform(square)
      single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next(1);



    test.single$().subscribe((value: number) => {
      results.push(value);
    })

    emitter.next(10);

    expect(results).to.eql([1, 100]);
  })
})