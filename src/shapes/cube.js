import { Shape } from './shape';
import { Vector3 } from '../vector3';
import { isFunc, isNumber } from '../assert';

/**
 * Builds cubes. Should not be called by external code.
 */
class CubeBuilder extends Shape {
  /**
   * @param {Number} l Side length of the cube.
   * @param {Integer} [subdivisions] Number of subdivisions.
   * @param {Vector3} [position] Center of the cube. Defaults to origin.
   * @param {Function} discardFn Function used to discard points in the cube.
   * Used to create different cube types.
   */
  constructor(l, subdivisions, position, discardFn) {
    super(position);

    // Parameter validation
    // l
    isNumber(l);
    // subdivisions
    subdivisions = subdivisions || 1;
    isNumber(subdivisions);
    // discardFn
    discardFn = discardFn || (() => false);
    isFunc(discardFn);

    // Having more subdivisions than length provides no benefit
    if (subdivisions > l) subdivisions = l;

    this.l = l;

    // Create the set of vertices
    const hL = this.l / 2;
    const step = l / subdivisions;
    for (let i = 0; i <= subdivisions; i++)
      for (let j = 0; j <= subdivisions; j++)
        for (let k = 0; k <= subdivisions; k++) {
          // Only create the outer shell of the cube
          if (discardFn(i, j, k)) continue;

          this.vertices.push(
            new Vector3(
              this.position.x - hL + i * step,
              this.position.y - hL + j * step,
              this.position.z - hL + k * step,
            )
          );
        }
  }
}

/**
 * Cube with solid faces.
 */
export class Cube extends CubeBuilder {
  /**
   * @param {Number} l Side length of the cube.
   * @param {Integer} [subdivisions] Number of subdivisions.
   * @param {Vector3} [position] Center of the cube. Defaults to origin.
   */
  constructor(l, subdivisions, position) {
    const discardFn = (i, j, k) => {
      return (i !== 0 && i !== subdivisions)
        && (j !== 0 && j !== subdivisions)
        && (k !== 0 && k !== subdivisions)
    };

    super(l, subdivisions, position, discardFn);
  }
}

/**
 * Cube outline.
 */
export class CubeOutline extends CubeBuilder {
  /**
   * @param {Number} l Side length of the cube.
   * @param {Integer} [subdivisions] Number of subdivisions.
   * @param {Vector3} [position] Center of the cube. Defaults to origin.
   */
  constructor(l, subdivisions, position) {
    const discardFn = (i, j, k) => {
      const r = (i === 0 || i === subdivisions)
        + (j === 0 || j === subdivisions)
        + (k === 0 || k === subdivisions);
      return r < 2;
    };

    super(l, subdivisions, position, discardFn);
  }
}