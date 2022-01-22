import React from "react";

import { Button } from "@/components/lib/Button";

// TODO: clear form on submit
export const EmailSignupForm: React.FC = () => (
  <>
    <link
      href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7_dtp.css"
      rel="stylesheet"
      type="text/css"
    />

    <div id="mc_embed_signup">
      <form
        action="https://tencentteacakes.us5.list-manage.com/subscribe/post?u=2134a0af05eba7f3e00f40ccd&amp;id=2034d8cd9e"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
        noValidate
      >
        <div className="flex flex-row items-center" id="mc_embed_signup_scroll">
          <input
            type="email"
            name="EMAIL"
            className="email"
            id="mce-EMAIL"
            placeholder="email address"
            required
          />
          <div
            style={{ position: "absolute", left: "-5000px" }}
            aria-hidden="true"
          >
            <input
              type="text"
              name="b_2134a0af05eba7f3e00f40ccd_2034d8cd9e"
              tabIndex={-1}
            />
          </div>
          <div className="ml-2">
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
      </form>
    </div>
  </>
);
