import { Heading } from "@/components/lib/Style/Heading";
import { LinkKeyword } from "@/components/lib/Style/LinkKeyword";

const NotFound = () => (
  <div className="text-center">
    <Heading>Aw, crumbs</Heading>
    <p>This page does not exist.</p>
    <LinkKeyword href="http://tencentteacakes.com">Return home</LinkKeyword>
  </div>
);

export default NotFound;
