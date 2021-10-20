// adapted from https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/

import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    // Pass in custom params to your handler
    await handleLogin(req, res);
  },
});
