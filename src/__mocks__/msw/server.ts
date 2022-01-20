import { setupServer } from "msw/node";

import { showHandlers, whitelistHandlers } from "./handlers";

export const server = setupServer(...showHandlers, ...whitelistHandlers);
