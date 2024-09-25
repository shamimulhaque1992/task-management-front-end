import { SignIn, useUser } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <main className="h-screen flex items-center justify-center p-6">
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="grid w-full h-full grid-cols-1 bg-white box-anim md:grid-cols-2">
          <div className="text-white flex items-center justify-center flex-col p-6 md:p-10">
            <div className="my-4">
              <div className="rounded-md mx-auto flex justify-center">
                <img
                  height={100}
                  width={100}
                  className="object-cover "
                  // fill={true}
                  src="/assets/images/top_Icon.png"
                  // placeholder="blur"
                  // blurDataURL="/assets/images/Contener.png"
                  alt="bg-image"
                  style={{ borderRadius: "5px" }}
                />
              </div>
              {/* <h1 className="text-3xl font-semibold ">Login</h1> */}
              <p className="mt-2 text-xl text-green-400">
                Task Management System
              </p>
            </div>
            <SignIn></SignIn>
            <p className="mt-4 text-xs text-slate-200">
              Khandoker Shamimul Haque @ 2024 All rights reserved
            </p>
          </div>
          <div className="relative hidden md:block rounded-md">
            <img
              className="object-cover "
              src="/assets/images/signIn.jpg"
              alt="bg-image"
              style={{ borderRadius: "5px" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
{
  /* <div className="flex items-center justify-center h-screen">
      <SignIn></SignIn>
    </div> */
}
