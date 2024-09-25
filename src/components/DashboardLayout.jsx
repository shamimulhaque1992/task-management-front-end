import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, fetchUser } from "@/store/usersSlice";
import Loader from "./Loader";
import WelcomeScreen from "./WelcomeScreen";
import { useLocation } from "react-router-dom";

const DashboardLayout = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(location, "locasd");
  const {
    user: backEndUsers,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);
  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    dispatch(fetchUser(user?.primaryEmailAddress?.emailAddress)).then(
      (result) => {
        if (result.error.code === "ERR_BAD_REQUEST") {
          dispatch(
            createUser({
              name: user.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            })
          ).then((result) => {
            if (result.meta.requestStatus === "fulfilled") {
              dispatch(fetchUser(user?.primaryEmailAddress?.emailAddress));
            }
          });
        }
      }
    );
  }, [dispatch, user]);

  const theme = backEndUsers?.preferences?.theme;
  return (
    <section
      className={`${theme === "dark" ? "bg-dark text-white" : "bg-light_gray"}`}
    >
      <div className="flex container p-5">
        {/* Sidebar */}
        <Sidebar theme={theme} />

        <div className="flex-1 flex flex-col ms-5 ">
          {/* Navbar */}
          <Navbar theme={theme} />

          {/* Main Content Area */}
          <main className="flex-1 py-5 bg-gray-100">
            {location.pathname === "/" ? (
              <WelcomeScreen theme={theme}></WelcomeScreen>
            ) : (
              ""
            )}
            <Outlet></Outlet>
          </main>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
