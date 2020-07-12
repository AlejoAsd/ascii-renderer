/**
 * Converts radians to degrees.
 * @param {Number} rad Value in radians.
 * @returns {number} Value in degrees.
 */
export function toDeg(rad) {
  return rad / Math.PI * 180;
}

/**
 * Converts degrees to radians.
 * @param {Number} deg Value in degrees.
 * @returns {number} Value in radians.
 */
export function toRad(deg) {
  return deg / 180 * Math.PI;
}