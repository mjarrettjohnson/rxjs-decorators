import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DistinctUntil, distinctUntil } from './distinctUntil';


interface Name {
  first: string;
  last: string;
}

describe('DistinctUntil: Accessor Decorator', () => {
  it('prevents equal results from being emitted', () => {

    const emitter = new BehaviorSubject<string>('');

    const results = [];

    class TestClass {

      @DistinctUntil()
      get single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next('hey');



    test.single$.subscribe((value: string) => {
      results.push(value);
    })

    emitter.next('hey');
    emitter.next('what');

    expect(results).to.eql(['hey', 'what']);
  })

  it('correctly applies the comparator function', () => {

    const emitter = new BehaviorSubject<Name>({
      first: 'Miles',
      last: 'Johnson'
    });

    const results = [];

    const compareFirstName = (x: Name, y: Name) => x.first === y.first;

    class TestClass {

      @DistinctUntil(compareFirstName)
      get single$() { return emitter };
    }

    const test = new TestClass();


    test.single$.subscribe((value: Name) => {
      results.push(value.first);
    })

    emitter.next({
      first: 'Miles',
      last: 'Davis'
    });

    expect(results).to.eql(['Miles']);
  })
})

describe('DistinctUntil: Function Decorator', () => {
  it('prevents equal results from being emitted', () => {

    const emitter = new BehaviorSubject<string>('');

    const results = [];

    class TestClass {

      @distinctUntil()
      single$() { return emitter };
    }

    const test = new TestClass();

    emitter.next('hey');



    test.single$().subscribe((value: string) => {
      results.push(value);
    })

    emitter.next('hey');
    emitter.next('what');

    expect(results).to.eql(['hey', 'what']);
  })

  it('correctly applies the comparator function', () => {


    const emitter = new BehaviorSubject<Name>({
      first: 'Miles',
      last: 'Johnson'
    });

    const results = [];

    const compareFirstName = (x: Name, y: Name) => x.first === y.first;

    class TestClass {

      @distinctUntil(compareFirstName)
      single$() { return emitter };
    }

    const test = new TestClass();


    test.single$().subscribe((value: Name) => {
      results.push(value.first);
    })

    emitter.next({
      first: 'Miles',
      last: 'Davis'
    });

    expect(results).to.eql(['Miles']);
  })
})