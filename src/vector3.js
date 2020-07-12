import { isNumber } from './assert';

export class Vector3 {
  /**
   * @param {Number} x Vector X coordinate.
   * @param {Number} y Vector Y coordinate.
   * @param {Number} z Vector Z coordinate.
   */
  constructor(x, y, z) {
    // Parameter validation
    // x
    isNumber(x);
    // y
    isNumber(y);
    // z
    isNumber(z);

    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Returns a new vector with the same position.
   * @returns {Vector3} New vector with same coordinates.
   */
  copy() {
    return new Vector3(
      this.x,
      this.y,
      this.z
    );
  }

  /**
   * Returns a new vector pointing in the opposite direction.
   * @returns {Vector3} New vector with opposite coordinates.
   */
  neg() {
    return new Vector3(
      -this.x,
      -this.y,
      -this.z
    );
  }

  /**
   * Translates the vector by a set amount.
   * @param {Vector3} vector Amount to translate.
   * @returns {Vector3} This vector. Useful for chaining.
   */
  translate(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;

    return this;
  }

  /**
   * Rotates the vector with respect to the X axis, from the Z axis to the Y
   * axis.
   * @param {Number} rad Angle to rotate in radians.
   * @returns {Vector3} This vector. Useful for chaining.
   */
  rotX(rad) {
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);

    const y = this.y * cos - this.z * sin;
    this.z = this.y * sin + this.z * cos;
    this.y = y;

    return this;
  }

  /**
   * Rotates the vector with respect to the Y axis, from the Z axis to the X
   * axis.
   * @param {Number} rad Angle to rotate in radians.
   * @returns {Vector3} This vector. Useful for chaining.
   */
  rotY(rad) {
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);

    const x = this.x * cos - this.z * sin;
    this.z = this.x * sin + this.z * cos;
    this.x = x;

    return this;
  }

  /**
   * Rotates the vector with respect to the Z axis, from the Y axis to the X
   * axis.
   * @param {Number} rad Angle to rotate in radians.
   * @returns {Vector3} This vector. Useful for chaining.
   */
  rotZ(rad) {
    const sin = Math.sin(rad);
    const cos = Math.cos(rad);

    const x = this.x * cos - this.y * sin;
    this.y = this.x * sin + this.y * cos;
    this.x = x;

    return this;
  }
}