/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
// to avoid "not wrapped in act" error
// https://github.com/vercel/next.js/issues/20048#issuecomment-869190879
export default ({ children, href }) => (
  <children.type {...children.props} href={href} />
);
