import { Component } from '@angular/core';
import { ReactiveModel, Filter, Subscribe, WithLatestFrom, Transform, Debug, DistinctUntilChanged, Pipe } from 'rxjs-decorators';
import { interval } from 'rxjs';


const secondNumChanged = ([a, b]: [number, number], [x, y]: [number, number]) => b === y;
const add = ([x, y]: [number, number]) => x + y;
const even = x => x % 2 === 0

const CalculateFrom = (withName: string) => Pipe([
  WithLatestFrom(withName),
  DistinctUntilChanged(secondNumChanged),
  Transform(add)
])

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends ReactiveModel {

  value: number;

  @CalculateFrom('seconds$')
  counter2$ = interval(300);

  @Filter(even)
  seconds$ = interval(1000);
  constructor() {
    super();

    this.initialize();
  }

  @Subscribe('counter2$')
  add(x: number) {
    this.value = x;
  }

  unsubscribe() {
    this.value = 0;
    this.destroy();
  }
}
