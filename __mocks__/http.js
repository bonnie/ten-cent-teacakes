import http, { ServerResponse } from "http";

// mock unstable_revalidate, as we don't want that to run during jest tests
module.exports = {
  esModule: true,
  ...http,
  ServerResponse: { ...ServerResponse, unstable_revalidate: jest.fn() },
};
