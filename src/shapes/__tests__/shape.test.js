import { describe, expect } from '@jest/globals';
import { Shape } from '../shape';
import { Vector3 } from '../../vector3';

describe('shape', () => {
  const rad180deg = Math.PI;

  const vectorToBeEqual = (rotV, expectedV) => {
    expect(rotV.x).toBeCloseTo(expectedV.x);
    expect(rotV.y).toBeCloseTo(expectedV.y);
    expect(rotV.z).toBeCloseTo(expectedV.z);
  };

  test('translate', () => {
    const s = new Shape();
    vectorToBeEqual(s.position, new Vector3(0, 0, 0));
    s.translate(new Vector3(10, 10, 10));
    vectorToBeEqual(s.position, new Vector3(10, 10, 10));
    s.translate(new Vector3(-20, -20, -20));
    vectorToBeEqual(s.position, new Vector3(-10, -10, -10));
    s.translate(new Vector3(10, 10, 10));
    vectorToBeEqual(s.position, new Vector3(0, 0, 0));
  });

  const rotXShape = () => {
    const position = new Vector3(1, 0, 1.5);
    const s = new Shape(position);
    s.vertices = [
      new Vector3(1, 1, 1),
      new Vector3(1, 1, 2),
      new Vector3(1, -1, 1),
      new Vector3(1, -1, 2),
    ];

    return s;
  };

  test('rotX', () => {
    const s = rotXShape();

    // Perform the rotation
    const position = s.position.copy();
    s.rotX(rad180deg);
    expect(s.position).toEqual(position);

    vectorToBeEqual(s.vertices[0], new Vector3(1, -1, -1));
    vectorToBeEqual(s.vertices[1], new Vector3(1, -1, -2));
    vectorToBeEqual(s.vertices[2], new Vector3(1, 1, -1));
    vectorToBeEqual(s.vertices[3], new Vector3(1, 1, -2));
  });

  test('relRotX', () => {
    const s = rotXShape();

    // Perform the rotation
    const position = s.position.copy();
    s.relRotX(rad180deg);
    expect(s.position).toEqual(position);

    vectorToBeEqual(s.vertices[0], new Vector3(1, -1, 2));
    vectorToBeEqual(s.vertices[1], new Vector3(1, -1, 1));
    vectorToBeEqual(s.vertices[2], new Vector3(1, 1, 2));
    vectorToBeEqual(s.vertices[3], new Vector3(1, 1, 1));
  });

  const rotYShape = () => {
    const position = new Vector3(0, 1, 1.5);
    const s = new Shape(position);
    s.vertices = [
      new Vector3(1, 1, 1),
      new Vector3(1, 1, 2),
      new Vector3(-1, 1, 1),
      new Vector3(-1, 1, 2),
    ];

    return s;
  };

  test('rotY', () => {
    const s = rotYShape();

    // Perform the rotation
    const position = s.position.copy();
    s.rotY(rad180deg);
    expect(s.position).toEqual(position);

    vectorToBeEqual(s.vertices[0], new Vector3(-1, 1, -1));
    vectorToBeEqual(s.vertices[1], new Vector3(-1, 1, -2));
    vectorToBeEqual(s.vertices[2], new Vector3(1, 1, -1));
    vectorToBeEqual(s.vertices[3], new Vector3(1, 1, -2));
  });

  test('relRotY', () => {
    const s = rotYShape();

    // Perform the rotation
    const position = s.position.copy();
    s.relRotY(rad180deg);
    expect(s.position).toEqual(position);

    vectorToBeEqual(s.vertices[0], new Vector3(-1, 1, 2));
    vectorToBeEqual(s.vertices[1], new Vector3(-1, 1, 1));
    vectorToBeEqual(s.vertices[2], new Vector3(1, 1, 2));
    vectorToBeEqual(s.vertices[3], new Vector3(1, 1, 1));
  });

  const rotZShape = () => {
    const position = new Vector3(0, 1.5, 1);
    const s = new Shape(position);
    s.vertices = [
      new Vector3(1, 1, 1),
      new Vector3(1, 2, 1),
      new Vector3(-1, 1, 1),
      new Vector3(-1, 2, 1),
    ];

    return s;
  };

  test('rotZ', () => {
    const s = rotZShape();

    // Perform the rotation
    const position = s.position.copy();
    s.rotZ(rad180deg);
    expect(s.position).toEqual(position);

    vectorToBeEqual(s.vertices[0], new Vector3(-1, -1, 1));
    vectorToBeEqual(s.vertices[1], new Vector3(-1, -2, 1));
    vectorToBeEqual(s.vertices[2], new Vector3(1, -1, 1));
    vectorToBeEqual(s.vertices[3], new Vector3(1, -2, 1));
  });

  test('relRotZ', () => {
    const s = rotZShape();

    // Perform the rotation
    const position = s.position.copy();
    s.relRotZ(rad180deg);

    vectorToBeEqual(s.vertices[0], new Vector3(-1, 2, 1));
    vectorToBeEqual(s.vertices[1], new Vector3(-1, 1, 1));
    vectorToBeEqual(s.vertices[2], new Vector3(1, 2, 1));
    vectorToBeEqual(s.vertices[3], new Vector3(1, 1, 1));
  });
});