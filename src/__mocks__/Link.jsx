/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/display-name */
// to avoid "not wrapped in act" error
// https://github.com/vercel/next.js/issues/20048#issuecomment-869190879

// this doesn't work; get error about "Element type is invalid"
// module.exports = {
//   __esModule: true,
//   default: ({ children, href }) => (
//     <children.type {...children.props} href={href} />
//   ),
// };

export default ({ children, href }) => <span {...children.props} href={href} />;
