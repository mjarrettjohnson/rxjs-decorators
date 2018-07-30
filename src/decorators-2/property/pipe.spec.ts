import { Pipe } from './pipe';
import { expect } from 'chai';
import { BehaviorSubject } from 'rxjs';
import { first, map } from 'rxjs/operators';




describe('Pipe: Property Decorator', () => {

  let emitter;
  beforeEach(() => {
    emitter = new BehaviorSubject<string>('');
  })

  it('applies a single operator', () => {

    class TestClass {
      @Pipe([first()])
      single$ = emitter;
    }

    const test = new TestClass();
    const results = []

    test.single$.subscribe((value: string) => { results.push(value); })

    emitter.next('hey');
    expect(results).to.eql(['']);
  })

  it('applies two operators in the correct order', () => {
    class TestClass {
      @Pipe([map((x: string) => x.toUpperCase()), map((x: string) => x + '!!!')])
      single$ = emitter;
    }

    const test = new TestClass();
    const results = []

    emitter.next('hey');

    test.single$.subscribe((value: string) => { results.push(value); })

    expect(results).to.eql(['HEY!!!']);
  })
})