import { expect } from '@jest/globals';
import { isInstanceOf, isInteger } from '../assert';

const wrapValidator = (validator) => {
  return (...params) => () => validator(...params)
};

test('isInteger', () => {
  const wrappedIsInteger = wrapValidator(isInteger);

  // Integers
  expect(isInteger(0)).toBeUndefined();
  expect(isInteger(1000)).toBeUndefined();
  expect(isInteger(-1234)).toBeUndefined();

  // Floats
  expect(isInteger(0.0)).toBeUndefined();
  expect(isInteger(1000.0)).toBeUndefined();
  expect(isInteger(-1234.0)).toBeUndefined();
  expect(wrappedIsInteger(0.123)).toThrow();
  expect(wrappedIsInteger(1000 + 1E-6)).toThrow();
  expect(wrappedIsInteger(-1234.7777)).toThrow();

  // Other types
  expect(wrappedIsInteger('test')).toThrow();
  expect(wrappedIsInteger(true)).toThrow();
  expect(wrappedIsInteger([1, 2, 3])).toThrow();
  expect(wrappedIsInteger({a: 1})).toThrow();
});

test('isInstanceOf', () => {
  class O {
  };

  class P {
  };

  class C extends P {
  };

  const o = new O();
  const p = new P();
  const c = new C();

  const wrappedIsInstanceOf = wrapValidator(isInstanceOf);

  expect(isInstanceOf(P, p)).toBeUndefined();
  expect(isInstanceOf(P, c)).toBeUndefined();
  expect(wrappedIsInstanceOf(P, o)).toThrow();
});