/**
 * A scene is a container for cameras and shapes.
 * When rendered, a scene makes all active cameras render any shapes in the
 * scene.
 */
export class Scene {
  /**
   * @param {Camera[]} cameras Cameras in the scene.
   * @param {Shape[]} shapes Shapes in the scene.
   */
  constructor(cameras, shapes) {
    this.cameras = cameras || [];
    this.shapes = shapes || [];
  }

  /**
   * Makes all active cameras render any shapes in the scene.
   */
  render() {
    for (let camera of this.cameras) {
      camera.render(this.shapes);
    }
  }
}