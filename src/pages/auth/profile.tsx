import { useUser } from "@auth0/nextjs-auth0";

import { Heading } from "@/components/lib/Style/Heading";

export default function Profile() {
  const { user } = useUser();
  return (
    <div>
      <Heading>Your Profile</Heading>
      <p>You are {user?.email}</p>
    </div>
  );
}
