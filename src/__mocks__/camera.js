export const Camera = jest.fn().mockImplementation(() => {
  return {
    render: jest.fn(),
  };
});