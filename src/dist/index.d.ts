import { Observable } from 'rxjs';
import { ReactiveModel } from './src/decorators';
export declare class TestClass extends ReactiveModel {
    counter$: Observable<number>;
    counter$2: Observable<number>;
    multiples$: Observable<number>;
    combined$: any;
    combined2$: any;
    private sideData;
    constructor();
    print(x: number): void;
    multiply(x: any): void;
}
//# sourceMappingURL=index.d.ts.map