import { isInteger, isRequired } from '../assert';

export default class Renderer {
  /**
   * @param {HTMLElement} canvas Canvas element to draw on.
   * @param {Integer} width Width of the canvas.
   * @param {Integer} height Height of the canvas.
   */
  constructor(canvas, width, height) {
    isRequired(canvas);
    isInteger(width);
    isInteger(height);

    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.valueLowerBound = 0;
    this.valueUpperBound = 255;
    this.valueRange = this.valueUpperBound - this.valueLowerBound;
  }

  /**
   * Draws a single pixel on the internal buffer.
   * Once the buffer is completely loaded, it can be drawn onto the canvas
   * using `draw`.
   * @param x X coordinate of the pixel.
   * @param y Y coordinate of the pixel.
   * @param value
   */
  drawPixel(x, y, value) {
    throw 'not implemented';
  }

  /**
   * Bounds a pixel value to an acceptable value for this renderer.
   * Bounds are set by the `valueLowerBound` and `valueUpperBound` properties.
   * Values outside the accepted range will be clipped.
   * @param {any} value Value.
   * @returns {any} Bounded value..
   */
  boundValue(value) {
    throw 'not implemented';
  }

  /**
   * Takes pixel information and determines the actual value to write into the
   * internal buffer.
   * @param value
   */
  render(value) {
    throw 'not implemented';
  }

  /**
   * Clears the canvas.
   */
  clear() {
    throw 'not implemented';
  }

  /**
   * Draws the content of the internal buffer on the canvas.
   */
  draw() {
    throw 'not implemented';
  }
}