import { Cube } from '../cube';
import { expect } from '@jest/globals';
import { Vector3 } from '../../vector3';

test('cube vertices', () => {
  let c = new Cube(10, 1, new Vector3(1, 1, 1));
  expect(c.vertices[0]).toEqual(new Vector3(-4, -4, -4));
  expect(c.vertices[1]).toEqual(new Vector3(-4, -4, 6));
  expect(c.vertices[2]).toEqual(new Vector3(-4, 6, -4));
  expect(c.vertices[3]).toEqual(new Vector3(-4, 6, 6));
  expect(c.vertices[4]).toEqual(new Vector3(6, -4, -4));
  expect(c.vertices[5]).toEqual(new Vector3(6, -4, 6));
  expect(c.vertices[6]).toEqual(new Vector3(6, 6, -4));
  expect(c.vertices[7]).toEqual(new Vector3(6, 6, 6));
});

test('invalid cube parameters', () => {
  const t = (value) => {
    expect(() => {
      new Cube(
        10,
        value,
      )
    }).toThrow();
  };

  t(true);
  t('a');
  t([1, 2, 3]);
});