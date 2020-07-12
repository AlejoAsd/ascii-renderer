import { describe, expect } from '@jest/globals';
import { Vector3 } from '../vector3';

const sqrt2over2 = Math.sqrt(2) / 2;
const rad45deg = Math.PI / 4;
const rad90deg = Math.PI / 2;
const rad180deg = Math.PI;
const rad360deg = Math.PI * 2;

const t = (rotV, expectedV) => {
  expect(rotV.x).toBeCloseTo(expectedV.x);
  expect(rotV.y).toBeCloseTo(expectedV.y);
  expect(rotV.z).toBeCloseTo(expectedV.z);
};

describe('Vector3', () => {
  test('X rotations', () => {
    // Fully at Y
    t(new Vector3(1, 1, 0).rotX(0), new Vector3(1, 1, 0));
    t(new Vector3(1, 1, 0).rotX(rad360deg), new Vector3(1, 1, 0));
    t(new Vector3(1, 1, 0).rotX(rad45deg), new Vector3(1, sqrt2over2, sqrt2over2));
    t(new Vector3(1, 1, 0).rotX(rad90deg), new Vector3(1, 0, 1));
    t(new Vector3(1, 1, 0).rotX(-rad90deg), new Vector3(1, 0, -1));
    t(new Vector3(1, 1, 0).rotX(rad180deg), new Vector3(1, -1, 0));

    // Fully at Z
    t(new Vector3(1, 0, 1).rotX(0), new Vector3(1, 0, 1));
    t(new Vector3(1, 0, 1).rotX(rad360deg), new Vector3(1, 0, 1));
    t(new Vector3(1, 0, 1).rotX(rad45deg), new Vector3(1, -sqrt2over2, sqrt2over2));
    t(new Vector3(1, 0, 1).rotX(rad90deg), new Vector3(1, -1, 0));
    t(new Vector3(1, 0, 1).rotX(-rad90deg), new Vector3(1, 1, 0));
    t(new Vector3(1, 0, 1).rotX(rad180deg), new Vector3(1, 0, -1));

    // Between Y and Z
    t(new Vector3(1, sqrt2over2, sqrt2over2).rotX(0), new Vector3(1, sqrt2over2, sqrt2over2));
    t(new Vector3(1, sqrt2over2, sqrt2over2).rotX(rad360deg), new Vector3(1, sqrt2over2, sqrt2over2));
    t(new Vector3(1, sqrt2over2, sqrt2over2).rotX(rad45deg), new Vector3(1, 0, 1));
    t(new Vector3(1, sqrt2over2, sqrt2over2).rotX(rad90deg), new Vector3(1, -sqrt2over2, sqrt2over2));
    t(new Vector3(1, sqrt2over2, sqrt2over2).rotX(-rad90deg), new Vector3(1, sqrt2over2, -sqrt2over2));
    t(new Vector3(1, sqrt2over2, sqrt2over2).rotX(rad180deg), new Vector3(1, -sqrt2over2, -sqrt2over2));
  });

  test('Y rotations', () => {
    // Fully at X
    t(new Vector3(1, 1, 0).rotY(0), new Vector3(1, 1, 0));
    t(new Vector3(1, 1, 0).rotY(rad360deg), new Vector3(1, 1, 0));
    t(new Vector3(1, 1, 0).rotY(rad45deg), new Vector3(sqrt2over2, 1, sqrt2over2));
    t(new Vector3(1, 1, 0).rotY(rad90deg), new Vector3(0, 1, 1));
    t(new Vector3(1, 1, 0).rotY(-rad90deg), new Vector3(0, 1, -1));
    t(new Vector3(1, 1, 0).rotY(rad180deg), new Vector3(-1, 1, 0));

    // Fully at Z
    t(new Vector3(0, 1, 1).rotY(0), new Vector3(0, 1, 1));
    t(new Vector3(0, 1, 1).rotY(rad360deg), new Vector3(0, 1, 1));
    t(new Vector3(0, 1, 1).rotY(rad45deg), new Vector3(-sqrt2over2, 1, sqrt2over2));
    t(new Vector3(0, 1, 1).rotY(rad90deg), new Vector3(-1, 1, 0));
    t(new Vector3(0, 1, 1).rotY(-rad90deg), new Vector3(1, 1, 0));
    t(new Vector3(0, 1, 1).rotY(rad180deg), new Vector3(0, 1, -1));

    // Between X and Z
    t(new Vector3(sqrt2over2, 1, sqrt2over2).rotY(0), new Vector3(sqrt2over2, 1, sqrt2over2));
    t(new Vector3(sqrt2over2, 1, sqrt2over2).rotY(rad360deg), new Vector3(sqrt2over2, 1, sqrt2over2));
    t(new Vector3(sqrt2over2, 1, sqrt2over2).rotY(rad45deg), new Vector3(0, 1, 1));
    t(new Vector3(sqrt2over2, 1, sqrt2over2).rotY(rad90deg), new Vector3(-sqrt2over2, 1, sqrt2over2));
    t(new Vector3(sqrt2over2, 1, sqrt2over2).rotY(-rad90deg), new Vector3(sqrt2over2, 1, -sqrt2over2));
    t(new Vector3(sqrt2over2, 1, sqrt2over2).rotY(rad180deg), new Vector3(-sqrt2over2, 1, -sqrt2over2));
  });

  test('Z rotations', () => {
    // Fully at X
    t(new Vector3(1, 0, 1).rotZ(0), new Vector3(1, 0, 1));
    t(new Vector3(1, 0, 1).rotZ(rad360deg), new Vector3(1, 0, 1));
    t(new Vector3(1, 0, 1).rotZ(rad45deg), new Vector3(sqrt2over2, sqrt2over2, 1));
    t(new Vector3(1, 0, 1).rotZ(rad90deg), new Vector3(0, 1, 1));
    t(new Vector3(1, 0, 1).rotZ(-rad90deg), new Vector3(0, -1, 1));
    t(new Vector3(1, 0, 1).rotZ(rad180deg), new Vector3(-1, 0, 1));

    // Fully at Y
    t(new Vector3(0, 1, 1).rotZ(0), new Vector3(0, 1, 1));
    t(new Vector3(0, 1, 1).rotZ(rad360deg), new Vector3(0, 1, 1));
    t(new Vector3(0, 1, 1).rotZ(rad45deg), new Vector3(-sqrt2over2, sqrt2over2, 1));
    t(new Vector3(0, 1, 1).rotZ(rad90deg), new Vector3(-1, 0, 1));
    t(new Vector3(0, 1, 1).rotZ(-rad90deg), new Vector3(1, 0, 1));
    t(new Vector3(0, 1, 1).rotZ(rad180deg), new Vector3(0, -1, 1));

    // Between Y and Z
    t(new Vector3(sqrt2over2, sqrt2over2, 1).rotZ(0), new Vector3(sqrt2over2, sqrt2over2, 1));
    t(new Vector3(sqrt2over2, sqrt2over2, 1).rotZ(rad360deg), new Vector3(sqrt2over2, sqrt2over2, 1));
    t(new Vector3(sqrt2over2, sqrt2over2, 1).rotZ(rad45deg), new Vector3(0, 1, 1));
    t(new Vector3(sqrt2over2, sqrt2over2, 1).rotZ(rad90deg), new Vector3(-sqrt2over2, sqrt2over2, 1));
    t(new Vector3(sqrt2over2, sqrt2over2, 1).rotZ(-rad90deg), new Vector3(sqrt2over2, -sqrt2over2, 1));
    t(new Vector3(sqrt2over2, sqrt2over2, 1).rotZ(rad180deg), new Vector3(-sqrt2over2, -sqrt2over2, 1));
  });

  test('neg', () => {
    const vec = new Vector3(1, 2, 3);

    // Check neg result
    expect(vec.neg()).toEqual(new Vector3(-1, -2, -3));
    // Check that the original vector was not modified
    expect(vec).toEqual(new Vector3(1, 2, 3));
  });
});