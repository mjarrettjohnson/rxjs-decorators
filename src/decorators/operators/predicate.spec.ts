import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Predicate, predicate } from './predicate';



describe('Predicate: Accessor Decorator', () => {
  it('applies the predicate', () => {

    const emitter = new BehaviorSubject<number>(0);

    const results = [];

    class TestClass {

      @Predicate((x: number) => x > 3)
      get single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next(1);
    emitter.next(10);


    test.single$.subscribe((value: number) => {
      results.push(value);
    })

    expect(results).to.eql([10]);
  })
})

describe('Predicate: Function Decorator', () => {
  it('applies the predicate', () => {

    const emitter = new BehaviorSubject<number>(0);

    const results = [];

    class TestClass {

      @predicate((x: number) => x > 3)
      single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next(1);
    emitter.next(10);


    test.single$().subscribe((value: number) => {
      results.push(value);
    })

    expect(results).to.eql([10]);
  })
})