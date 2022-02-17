module.exports = {
  esModule: true,
  getSignedStorageUrl: jest.fn(),
  useSupabasePhoto: jest.fn().mockImplementation((path) => ({ imgSrc: path })),
};
