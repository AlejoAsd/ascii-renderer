import { expect } from '@jest/globals';
import { toDeg, toRad } from '../trig';

test('convert radians to degrees', () => {
  expect(toDeg(Math.PI)).toBe(180);
  expect(toDeg(Math.PI / 2)).toBe(90);
  expect(toDeg(Math.PI * 2)).toBe(360);
});

test('convert degrees to radians', () => {
  expect(toRad(180)).toBe(Math.PI);
  expect(toRad(90)).toBe(Math.PI / 2);
  expect(toRad(360)).toBe(Math.PI * 2);
});