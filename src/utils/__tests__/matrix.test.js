import { expect } from '@jest/globals';
import { newMatrix } from '../matrix';

test('new matrix', () => {
  const m = newMatrix(4, 3, 1);

  let expected = [
    [1, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ];

  expect(m).toEqual(expected);

  // Modify a matrix value
  m[0][0] = 0;
  m[1][2] = 0;

  expected = [
    [0, 1, 1, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 1],
  ];

  expect(m).toEqual(expected);
});