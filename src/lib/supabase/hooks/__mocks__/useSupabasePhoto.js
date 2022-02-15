module.exports = {
  esModule: true,
  getSignedStorageUrl: jest.fn(),
  useSupabasePhoto: jest.fn().mockReturnValue({ imgSrc: "photos/img.jpg" }),
};
