/**
 * Creates a new two-dimensional matrix of the specified size.
 * The matrix index order is:
 *  1. row (bound by height).
 *  2. column (bound by width).
 * @param {Integer} width Number of colums in the matrix.
 * @param {Integer} height Number of rows in the matrix.
 * @param {any} value Initalization value.
 * @returns {any[]}
 */
export function newMatrix(width, height, value) {
  let m = Array(height);

  for (let j = 0; j < height; j++) {
    m[j] = Array(width);
    for (let i = 0; i < width; i++) {
      m[j][i] = value;
    }
  }

  return m
}