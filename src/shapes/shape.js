import { Vector3 } from '../vector3';
import { isInstanceOf } from '../assert';

export class Shape {
  /**
   * Creates a shape.
   * @param {Vector3} [position] Center of the cube. Defaults to origin.
   */
  constructor(position) {
    this.vertices = [];

    // position
    this.position = position || new Vector3(0, 0, 0);
    isInstanceOf(Vector3, position);
  }

  /**
   * Translates the shape by a set amount.
   * @param {Vector3} vector Amount to translate.
   * @returns {Shape} This shape. Useful for chaining.
   */
  translate(vector) {
    this.position.x += vector.x;
    this.position.y += vector.y;
    this.position.z += vector.z;

    return this;
  }

  /**
   * Rotates the shape with respect to the X axis, from the Z axis to the Y
   * axis.
   * @param {Number} rad Angle to rotate in radians.
   * @returns {Shape} This shape. Useful for chaining.
   */
  rotX(rad) {
    this.vertices.forEach((v) => v.rotX(rad));

    return this;
  }

  /**
   * Rotates the shape with respect to the Y axis, from the Z axis to the X
   * axis.
   * @param {Number} rad Angle to rotate in radians.
   * @returns {Shape} This shape. Useful for chaining.
   */
  rotY(rad) {
    this.vertices.forEach((v) => v.rotY(rad));

    return this;
  }

  /**
   * Rotates the shape with respect to the Z axis, from the Y axis to the X
   * axis.
   * @param {Number} rad Angle to rotate in radians.
   * @returns {Shape} This shape. Useful for chaining.
   */
  rotZ(rad) {
    this.vertices.forEach((v) => v.rotZ(rad));

    return this;
  }

  /**
   * Rotates the shape with respect to its position center.
   * This method is not intended for direct use, use `relRotX`, `relRotY` or
   * `relRotZ` instead.
   * @param {Number} rad Angle to rotate in radians.
   * @param {Function} rotF Rotation function.
   * @returns {Shape} This shape. Useful for chaining.
   */
  relRot(rad, rotF) {
    // Move the shape vertices to the origin to rotate along the axis
    this.vertices.forEach((v) => v.translate(this.position.neg()));
    // Rotate the shape
    rotF.call(this, rad);
    // Move the shape vertices back to their original position
    this.vertices.forEach((v) => v.translate(this.position));

    return this;
  }

  /**
   * Rotates the shape with respect to the X axis of its position center.
   * @param {Number} rad Angle to rotate in radians.
   * @returns {Shape} This shape. Useful for chaining.
   */
  relRotX(rad) {
    return this.relRot(rad, this.rotX);
  }

  /**
   * Rotates the shape with respect to the Y axis of its position center.
   * @param {Number} rad Angle to rotate in radians.
   * @returns {Shape} This shape. Useful for chaining.
   */
  relRotY(rad) {
    return this.relRot(rad, this.rotY);
  }

  /**
   * Rotates the shape with respect to the Z axis of its position center.
   * @param {Number} rad Angle to rotate in radians.
   * @returns {Shape} This shape. Useful for chaining.
   */
  relRotZ(rad) {
    return this.relRot(rad, this.rotZ);
  }

  /**
   * Returns a generator that iterates over each vertex in the shape.
   * @returns {IterableIterator<Vector3>}
   */
  * render() {
    for (let vertex of this.vertices) {
      yield vertex;
    }
  }
}