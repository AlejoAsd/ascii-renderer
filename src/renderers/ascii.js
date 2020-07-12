import Renderer from './renderer';
import { newMatrix } from '../utils/matrix';
import { isNumber } from '../assert';

export const LightValues = {
  Squares: ' ◻◫▥▣◼',
  RectanglesInverted: ' ░▒▓█',
  Dice: ' ⚀⚁⚂⚃⚄⚅',
  ASCII: ' .:-=+*#%@',
};
Object.freeze(LightValues);

export class ASCIIRenderer extends Renderer {
  /**
   * @param {HTMLElement} canvas Canvas element to draw on.
   * @param {Integer} width Width of the canvas.
   * @param {Integer} height Height of the canvas.
   * sorted from light to dark.
   * @param {Number} lightIntensity Intensity of the light. Higher values
   * give brighter light.
   * @param {String} lightValues Range of values used to render. Values are
   * @param {Boolean} inverted Invert light values.
   */
  constructor(canvas, width, height, lightIntensity, lightValues, inverted) {
    super(canvas, width, height);

    // Configure canvas border
    if (canvas.style) {
      canvas.style.border = `1px solid #000000`;
      canvas.style.width = `${width}ch`;
      canvas.style.height = `${height}ch`;
    }

    lightIntensity = lightIntensity || 80;
    isNumber(lightIntensity);

    this.lightValues = lightValues || LightValues.Squares;
    if (inverted)
      this.lightValues = this.lightValues.split('').reverse().join('');
    this.valueLowerBound = 0;
    this.valueUpperBound = this.lightValues.length - 1;
    this.valueRange = this.valueUpperBound - this.valueLowerBound;
    this.valueRatio = this.valueRange / lightIntensity;

    this.clear();
  }

  /**
   * Clears the internal buf and zbuf.
   */
  clearBuf() {
    const emptyValue = this.lightValues[0];
    // Adjust size for monospace font characters (2:1 ratio)
    const height = (this.height >> 1) + 1;
    this.buf = newMatrix(this.width, height, emptyValue);
    this.zbuf = newMatrix(this.width, height, Infinity);
  }

  /**
   * Clears the canvas.
   */
  clearCanvas() {
    this.canvas.innerHTML = '';
  }

  /**
   * Clear the internal buffers and canvas.
   */
  clear() {
    this.clearBuf();
    this.clearCanvas();
  }

  /**
   * Bounds pixel values to a valid value in the range.
   * Any value over or under the range will be clipped to the maximum or
   * minimum value in the range, respectively.
   * @param {any|Number} value Incoming pixel value.
   * @returns {any|Integer} `lightValues` index.
   */
  boundValue(value) {
    return Math.floor(
      Math.max(
        this.valueLowerBound,
        Math.min(
          value,
          this.valueUpperBound,
        ),
      ),
    );
  }

  /**
   * Takes pixel information and processes it to return the value to write onto
   * the internal buffer and later the canvas.
   * This implementation uses the value of the pixel to determine the pixel's
   * luminance.
   * @param {Number} value Value to write on the buffer. This value will be
   * clipped if it's outside the renderer value range.
   * @returns {string} Value to write on the canvas.
   */
  render(value) {
    // Get the pixel value
    value = value || 0;
    // Calculate lighting
    // TODO Temporary implementation
    value *= this.valueRatio;
    // Keep within bounds
    value = this.boundValue(value);
    // Get pixel light level
    return this.lightValues[value];
  }

  /**
   * Draws a single pixel on the internal buffer.
   * Once the buffer is completely loaded, it can be drawn onto the canvas
   * using `draw`.
   * @param {Integer} x X coordinate of the value in the canvas.
   * @param {Integer} y Y coordinate of the value in the canvas.
   * @param {Number} value to write on the buffer.
   */
  drawPixel(x, y, value) {
    x = Math.round(x);
    y = Math.round(y / 2);

    // TODO Temporary implementation of a zbuf
    if (value < this.zbuf[y][x]) {
      this.zbuf[y][x] = value;
      this.buf[y][x] = this.render(value);
    }
  }

  /**
   * Draws a frame into a canvas.
   * @param {String} frame Frame information.
   */
  drawCanvas(frame) {
    this.canvas.innerHTML = frame;
  }

  /**
   * Draws the content of the internal buffer on the canvas.
   */
  draw() {
    this.clearCanvas();
    let frame = '';
    for (let j = 0; j < this.buf.length; j++) {
      for (let i = 0; i < this.buf[0].length; i++) {
        frame += this.buf[j][i];
      }
      frame += '\n';
    }
    this.drawCanvas(frame);
    this.clearBuf();
  }
}