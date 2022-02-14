module.exports = {
  esModule: true,
  getSignedStorageUrl: jest.fn(),
  useSupabasePhoto: jest
    .fn()
    .mockReturnValue(Promise.resolve({ imgSrc: "photos/img.jpg" })),
};
