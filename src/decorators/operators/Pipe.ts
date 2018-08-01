


export const Pipe = (decorators: ((...args: any[]) => void)[]) => (...args: any[]) => decorators.forEach(decorator => decorator(...args));