import { beforeEach, describe, expect } from '@jest/globals';
import { Camera } from '../camera';
import { Shape } from '../shapes/shape';
import { Scene } from '../scene';

jest.mock('../camera');

describe('scene', () => {
  const camera1 = new Camera();
  const camera2 = new Camera();
  const camera3 = new Camera();
  const shape1 = new Shape();
  const shape2 = new Shape();
  const shape3 = new Shape();
  let scene;

  beforeEach(() => {
    jest.clearAllMocks();
    scene = new Scene(
      [camera1, camera2, camera3],
      [shape1, shape2, shape3],
    );
  });

  test('render', () => {
    scene.render();
    // Each camera should have been rendered once
    scene.cameras.forEach((camera) => {
      expect(camera.render.mock.calls.length).toEqual(1);
      expect(camera.render.mock.calls[0][0]).toEqual(scene.shapes);
    });
  });
});