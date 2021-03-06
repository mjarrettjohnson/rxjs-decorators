/**
 * @module operators
 */
import { Observable } from 'rxjs';
export declare function Swap(switchFn: (_: any) => Observable<any>): (...args: any[]) => any;
export declare function SwapTo(methodName: string): (...args: any[]) => any;
