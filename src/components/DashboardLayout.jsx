import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import Navbar from "./NavBar";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "@/store/usersSlice";

const DashboardLayout = () => {
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(
        createUser({
          name: user.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
        })
      );
    }
  }, [dispatch, user]);
  if (!isSignedIn) {
    navigate("/sign-in");
  }

  return (
    <section className="bg-light_gray ">
      <div className="flex container p-5">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 flex flex-col ms-5 ">
          {/* Navbar */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-1 py-5 bg-gray-100">
            <Outlet></Outlet>
          </main>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
