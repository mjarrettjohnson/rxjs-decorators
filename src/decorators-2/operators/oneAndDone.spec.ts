import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { OneAndDone, oneAndDone } from './oneAndDone';





describe('OneAndDone: Accessor Decorator', () => {
  it('unsubscribes after first emission', () => {

    const emitter = new BehaviorSubject<string>('');

    const results = [];

    class TestClass {

      @OneAndDone
      get single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next('hey');
    emitter.next('hey');


    test.single$.subscribe((value: string) => {
      results.push(value);
    })

    expect(results).to.eql(['hey']);
  })
})

describe('OneAndDone: Function Decorator', () => {
  it('unsubscribes after first emission', () => {

    const emitter = new BehaviorSubject<string>('');

    const results = [];

    class TestClass {

      @oneAndDone
      single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next('hey');
    emitter.next('hey');

    test.single$().subscribe((value: string) => {
      results.push(value);
    })

    expect(results).to.eql(['hey']);
  })
})