export const Canvas = jest.fn().mockImplementation(() => {
  return {
    styles: jest.fn(),
  };
});
