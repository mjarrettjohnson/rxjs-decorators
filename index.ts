import { ReactiveModel } from "./src/decorators/reactive-model";
import { interval, Observable } from "rxjs";
import { Transform, Filter, Subscribe, CombineLatest, DistinctUntilChanged, Debug, First } from "./src/decorators";



const even = (x: number) => x % 2 === 0
const middleChange = (a: number[], b: number[]) => {
  return a[1] === b[1];
}

export class TestClass extends ReactiveModel {
  counter$: Observable<number> = interval(1000);

  counter$2 = interval(500);

  @Transform(x => x / 2)
  multiples$ = interval(1000);

  @Transform(([x, y]: [number, number, number]) => x + y)
  @DistinctUntilChanged(middleChange)
  @CombineLatest('counter$2', 'counter$')
  combined$;


  @Transform(([x, y]) => x * y)
  @CombineLatest('combined$', 'multiples$')
  combined2$;

  private sideData = 'SIDE';

  constructor() {
    super()
    this.initialize();
  }

  // @Subscribe('counter$')
  print(x: number) {
    console.log(this.sideData);
    console.log(x);
  }

  @Subscribe('combined2$')
  multiply(x) {
    console.log(x);
  }
}

const t = new TestClass();