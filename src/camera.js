import { Vector3 } from './vector3';
import { isArray, isBool, isInstanceOf, isRequired } from './assert';
import Renderer from './renderers/renderer';

export class Camera {
  /**
   * Creates a new camera on the specified position.
   * @param {Renderer} renderer Renderer used to draw on.
   * @param {Vector3} [position] Camera position.
   */
  constructor(renderer, position) {
    // Parameter validation
    // renderer
    isRequired(renderer);
    isInstanceOf(Renderer, renderer);
    // position
    isInstanceOf(Vector3, position);

    this.renderer = renderer;
    this.hWidth = this.renderer.width / 2;
    this.hHeight = this.renderer.height / 2;
    this.active = true;
    this.position = position || new Vector3(0, 0, 0);
  }

  setActive(bool) {
    isBool(bool);
    this.active = bool;
  }

  render(renderables) {
    // Don't render if the camera is not active
    if (!this.active) return;

    isArray(renderables);

    // Draw the camera pixels in the renderer
    // TODO This is temporary code with no projection.
    for (let renderable of renderables) {
      for (let vector of renderable.render()) {
        // Z
        // Skip vertices behind the camera
        if (vector.z < this.position.z) continue;
        // if (vector.z > 0) continue;
        // X
        const x = vector.x + this.position.x + this.hWidth;
        if (x < 0 || this.renderer.width < x) continue;
        // Y
        const y = vector.y + this.position.y + this.hHeight;
        if (y < 0 || this.renderer.height < y) continue;

        this.renderer.drawPixel(x, y, vector.z - this.position.z)
      }
    }

    // Make renderer draw internal buffer on canvas
    this.renderer.draw();
  }
}