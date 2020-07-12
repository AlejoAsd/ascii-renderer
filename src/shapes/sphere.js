import { Shape } from './shape';
import { Vector3 } from '../vector3';
import { isInteger, isNumber } from '../assert';

export class Sphere extends Shape {
  /**
   * Creates a new sphere.
   * @param {Number} r Side length of the sphere.
   * @param {Integer} rings Number of horizontal partitions in the sphere.
   * @param {Integer} slices Number of vertical partitions in the sphere.
   * @param {Vector3} [position] Center of the sphere.
   */
  constructor(r, rings, slices, position) {
    super(position);

    // Parameter validation
    // r
    isNumber(r);
    // rings
    isInteger(rings);
    // slices
    isInteger(rings);

    this.r = r;

    // Create the set of vertices
    const ringAngleStep = Math.PI / rings;
    const sliceAngleStep = Math.PI * 2 / slices;

    /**
     * Creates a ring of vertices in the XZ plane.
     * @param {Number} r Ring radius.
     * @param {Number} y Y coordinate of the ring.
     */
    const addRing = (r, y) => {
      for (let s = 0; s < slices; s++) {
        const angle = sliceAngleStep * s;
        this.vertices.push(
          new Vector3(
            r * Math.cos(angle),
            y,
            r * Math.sin(angle),
          ),
        );
      }
    };

    // Create a complete sphere by creating a set of rings.
    for (let i = 0; i <= rings; i++) {
      const y = r * Math.cos(ringAngleStep * i);
      // Add only a single vertex on the first and last levels
      if (i === 0 || i === rings) {
        this.vertices.push(
          new Vector3(
            0,
            y,
            0,
          )
        );
      }
      // If not, create a ring for the level
      else {
        const sliceR = Math.sqrt(r ** 2 - y ** 2);
        addRing(sliceR, y);
      }
    }
  }
}