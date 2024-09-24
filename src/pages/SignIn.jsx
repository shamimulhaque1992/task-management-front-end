import { SignIn, useUser } from "@clerk/clerk-react";

const SignInPage = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn></SignIn>
    </div>
  );
};

export default SignInPage;
