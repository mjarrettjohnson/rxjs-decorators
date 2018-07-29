import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs';
import { SideEffect, sideEffect } from './sideEffect';



describe('SideEffect: Accessor Decorator', () => {
  it('applies the transform', () => {

    const emitter = new BehaviorSubject<number>(0);

    const results = [];

    let side = 0;

    const effect = (x: number) => side += x;

    class TestClass {
      @SideEffect(effect)
      get single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next(1);

    test.single$.subscribe((value: number) => {
      results.push(value);
    })

    emitter.next(10);

    expect(side).to.eql(11);
  })
})

describe('SideEffect: Function Decorator', () => {
  it('applies the transform', () => {

    const emitter = new BehaviorSubject<number>(0);

    const results = [];

    let side = 0;

    const effect = (x: number) => side += x;

    class TestClass {

      @sideEffect(effect)
      single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next(1);

    test.single$().subscribe((value: number) => {
      results.push(value);
    })

    emitter.next(10);

    expect(side).to.eql(11);
  })
})