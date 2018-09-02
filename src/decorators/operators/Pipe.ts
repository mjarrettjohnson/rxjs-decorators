/**
 * @module operators
 */

export const Pipe = (decorators: Array<(...args: any[]) => void>) => (
  ...args: any[]
) => decorators.forEach((decorator) => decorator(...args));
