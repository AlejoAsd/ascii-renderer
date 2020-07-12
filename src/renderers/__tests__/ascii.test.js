import { beforeEach, describe, expect } from '@jest/globals';
import { ASCIIRenderer } from '../ascii';
import { Canvas } from '../../__mocks__/canvas';
import { isInteger } from '../../assert';

describe('ASCIIRenderer', () => {
  const width = 3;
  const height = 3;
  const lightValues = '1234';
  const invertedLightValues = '4321';
  const bufInitialValue = invertedLightValues[0];
  const zbufInitialValue = Infinity;
  let renderer;

  beforeEach(() => {
    renderer = new ASCIIRenderer(Canvas, width, height, 60, lightValues, true);
  });

  test('constructor', () => {
    expect(renderer.lightValues).toEqual(invertedLightValues);
    expect(renderer.valueLowerBound).toEqual(0);
    expect(renderer.valueUpperBound).toEqual(3);
    expect(renderer.valueRange).toEqual(3);
  });

  test('clearBuf', () => {
    // Checks that buf and zbuf contain the expected values
    const check = (renderer, bufValue, zbufValue) => {
      for (let j = 0; j < renderer.buf.length; j++) {
        for (let i = 0; i < renderer.buf[0].length; i++) {
          expect(renderer.buf[j][i]).toEqual(bufValue);
          expect(renderer.zbuf[j][i]).toEqual(zbufValue);
        }
      }
    };

    // Ensure that the buffers have the correct initial values
    check(renderer, bufInitialValue, zbufInitialValue);

    // Replace values
    const testValue = -1;
    for (let j = 0; j < renderer.buf.length; j++) {
      for (let i = 0; i < renderer.buf[0].length; i++) {
        renderer.buf[j][i] = testValue;
        renderer.zbuf[j][i] = testValue;
      }
    }
    check(renderer, testValue, testValue);

    renderer.clearBuf();

    // Check that the buffers were correctly reset
    check(renderer, bufInitialValue, zbufInitialValue)
  });

  test('clearCanvas', () => {
    // Ensure that the buffers have the correct initial values
    expect(renderer.canvas.innerHTML).toEqual('');

    // Replace value
    renderer.canvas.innerHTML = 'test';

    renderer.clearCanvas();

    // Check that the buffers were correctly reset
    expect(renderer.canvas.innerHTML).toEqual('');
  });

  test('clear', () => {
    renderer.clearBuf = jest.fn();
    renderer.clearCanvas = jest.fn();

    renderer.clear();

    // Check that both clearBuf and clearCanvas were called
    renderer.clearBuf.mock.calls.length = 1;
    renderer.clearCanvas.mock.calls.length = 1;
  });

  test('boundValue', () => {
    // Value under lower bound should be clipped to the lower bound
    let value = renderer.valueLowerBound - 1;
    expect(renderer.boundValue(value)).toEqual(renderer.valueLowerBound);

    // Value between the lower and upper bound should be reduced to
    value = renderer.valueLowerBound + renderer.valueUpperBound / 2;
    expect(() => {
      isInteger(value)
    }).toThrow();
    expect(renderer.boundValue(value)).toEqual(Math.floor(value));

    // Value over upper bound should be clipped to the upper bound
    value = renderer.valueUpperBound + 1;
    expect(renderer.boundValue(value)).toEqual(renderer.valueUpperBound);
  });

  test('render', () => {
    // Simplify tests
    renderer.valueRatio = 2;

    // Undefined value should return the first light value
    expect(renderer.render()).toEqual(invertedLightValues[0]);

    // Negative value should return the first light value
    expect(renderer.render(-1)).toEqual(invertedLightValues[0]);

    // Positive value should return the light value of the ratio
    expect(renderer.render(1.2)).toEqual(invertedLightValues[2]);

    // Positive value should clip
    expect(renderer.render(2.5)).toEqual(invertedLightValues[3]);
  });

  test('drawPixel', () => {
    // Simplify tests
    renderer.valueRatio = 1;

    // Check that buf is updated
    renderer.drawPixel(0, 0, 1);
    expect(renderer.buf[0][0]).toEqual(invertedLightValues[1]);

    // Check that the zbuf is applied
    // Should discard higher value
    renderer.drawPixel(0, 0, 2);
    expect(renderer.buf[0][0]).toEqual(invertedLightValues[1]);
    // Should take lower value
    renderer.drawPixel(0, 0, 0);
    expect(renderer.buf[0][0]).toEqual(invertedLightValues[0]);
  });

  test('draw', () => {
    const initialValue = invertedLightValues[0];
    const testValue = 't';

    let expected = [
      initialValue, initialValue, initialValue, '\n',
      initialValue, initialValue, initialValue, '\n',
    ].join('');
    renderer.draw();
    expect(renderer.canvas.innerHTML).toEqual(expected);

    renderer.buf[0][0] = testValue;
    renderer.buf[1][1] = testValue;
    renderer.buf[1][2] = testValue;

    expected = [
      testValue, initialValue, initialValue, '\n',
      initialValue, testValue, testValue, '\n',
    ].join('');
    renderer.draw();
    expect(renderer.canvas.innerHTML).toEqual(expected);
  });
});