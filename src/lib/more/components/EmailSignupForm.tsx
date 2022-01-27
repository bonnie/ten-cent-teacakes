/* eslint-disable @next/next/no-css-tags */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useRef } from "react";
import { tw } from "twind";

import { Button } from "@/components/lib/Button";

export const EmailSignupForm: React.FC = () => {
  const formEl = useRef<HTMLFormElement>(null);
  return (
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
          className={tw(["validate"])}
          target="_blank"
          noValidate
          ref={formEl}
        >
          <div
            className={tw(["flex", "flex-row", "items-center"])}
            id="mc_embed_signup_scroll"
          >
            <input
              type="email"
              name="EMAIL"
              className={tw(["email"])}
              id="mce-EMAIL"
              placeholder="email address"
              required
              onFocus={() => formEl.current?.reset()}
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
            <div className={tw(["ml-2"])}>
              <Button type="submit">Subscribe</Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
