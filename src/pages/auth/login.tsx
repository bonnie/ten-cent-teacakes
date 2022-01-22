// adapted from https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/

import { useUser } from "@auth0/nextjs-auth0";

import { Button } from "@/components/lib/Button";
import { Heading } from "@/components/lib/Style/Heading";
import { useToast } from "@/components/toasts/useToast";

const Login = () => {
  const { user, error, isLoading } = useUser();
  const { showToast } = useToast();

  if (isLoading) return <div>Loading...</div>;
  if (error) showToast("error", `Login error: ${error.message}`);

  if (user) {
    return (
      <div className="text-center">
        <Heading>Welcome!</Heading>
        <p className="text-xl">You are logged in as {user.name}</p>
        <a href="/api/auth/logout">
          <Button>Log out</Button>
        </a>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Heading>Log in</Heading>
      <p>Note: this button may take you to an Auth0 login screen.</p>
      <a href="/api/auth/login">
        <Button>Log in</Button>
      </a>
    </div>
  );
};

export default Login;
