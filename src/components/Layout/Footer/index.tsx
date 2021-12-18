import dayjs from "dayjs";
import React from "react";

// TODO: get this at the bottom of the page
export const Footer: React.FC = () => (
  <div className="text-center position-absolute h-full bottom-0 mb-10">
    <p>© {dayjs().year()}</p>
  </div>
);

// https://twitter.com/AdaRoseCannon/status/1471855546580049925?s=20
// Damn i love the CSS inset property, it's short hand for top, left, bottom and right:

// stick to bottom:
//         position: absolute;
//         inset: auto 0 0 0;

// full screen:
//         position: absolute;
//         inset: 0;
