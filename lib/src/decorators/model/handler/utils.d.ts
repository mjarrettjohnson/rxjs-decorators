import { ReactiveModel } from '../reactive-model';
export declare const getterFactory: (model: ReactiveModel) => (name: string) => any;
export declare const setterFactory: (model: ReactiveModel, name: string) => (value: any) => void;
export declare const allParametersExist: (that: any) => (property: string) => any;
