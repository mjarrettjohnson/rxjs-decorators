import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Debug, debug } from './debug';





describe('Debug: Accessor Decorator', () => {
  it('uses the tag to prefix the log', () => {

    const emitter = new BehaviorSubject<string>('');

    const results = [];
    const logs = [];

    class TestClass {

      @Debug('TEST::', (val: string) => logs.push(val))
      get single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next('hey');

    test.single$.subscribe((value: string) => {
      results.push(value);
    })

    expect(logs).to.eql(['TEST::hey']);
  })
})

describe('Debug: Function Decorator', () => {
  it('uses the tag to prefix the log', () => {

    const emitter = new BehaviorSubject<string>('');

    const results = [];
    const logs = [];

    class TestClass {

      @debug('TEST::', (val: string) => logs.push(val))
      single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next('hey');

    test.single$().subscribe((value: string) => {
      results.push(value);
    })

    expect(logs).to.eql(['TEST::hey']);
  })
})