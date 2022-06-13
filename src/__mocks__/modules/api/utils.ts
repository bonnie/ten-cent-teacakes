import utils from "@/lib/api/utils";

// mock checkValidationSecret, as we don't want that to run during jest tests
module.exports = {
  esModule: true,
  ...utils,
  checkValidationSecret: jest.fn().mockReturnValue(true),
};
