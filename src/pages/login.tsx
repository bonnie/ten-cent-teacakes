// adapted from https://auth0.com/blog/ultimate-guide-nextjs-authentication-auth0/

import { useUser } from "@auth0/nextjs-auth0";

const Login = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
};

export default Login;
