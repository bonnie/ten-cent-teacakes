import { setupServer } from "msw/node";

import { showHandlers } from "./handlers";

export const server = setupServer(...showHandlers);
