import isEqualFn from 'lodash.isequal';
import isFunctionFn from 'lodash.isfunction';

export const isArray = Array.isArray;
export const isFunction = isFunctionFn;
export const isEqual = isEqualFn;
export const hasOwnProperty = <T>(source: T, key: string) =>
  Object.prototype.hasOwnProperty.call(source, key);
