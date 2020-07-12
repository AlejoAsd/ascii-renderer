import { beforeEach, describe, expect } from '@jest/globals';
import { ASCIIRenderer } from '../renderers/ascii';
import { Camera } from '../camera';
import { Cube } from '../shapes/cube';
import { Vector3 } from '../vector3';
import { toRad } from '../trig';
import { Canvas } from '../__mocks__/canvas';

describe('camera', () => {
  const canvas = Canvas;
  const width = 15;
  const height = 10;
  const l = 2;
  const renderer = new ASCIIRenderer(canvas, width, height);
  let camera;

  beforeEach(() => {
    renderer.clear();
    camera = new Camera(renderer, new Vector3(0, 0, -5));
  });

  test('fails to draw single renderable', () => {
    const cube = new Cube(l);
    expect(() => camera.render()).toThrow();
  });

  test('draws an array of renderables', () => {
    const shapes = [
      new Cube(l),
      new Cube(l).rotZ(toRad(45)),
      new Cube(l).rotZ(toRad(90)),
    ];
    camera.render();
  });

  test('setActive', () => {
    expect(camera.active).toBeTruthy();
    camera.setActive(true);
    expect(camera.active).toBeTruthy();
    camera.setActive(false);
    expect(camera.active).toBeFalsy();
    camera.setActive(true);
    expect(camera.active).toBeTruthy();
  });
});
