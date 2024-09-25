/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button"; // Shadcn Button Component
import { useNavigate } from "react-router-dom";

const WelcomeScreen = ({ theme }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 via-green_theme to-primary-1 ${
        theme === "dark" ? "text-white" : ""
      }`}
    >
      {/* Logo or Illustration */}
      <div className="mb-8 w-8/12 flex justify-center">
        <img
          src="/assets/images/task_welcom_img.jpg" // Replace with your logo path
          alt="App Logo"
          className="w-6/12 rounded-xl"
        />
      </div>

      {/* Welcome Message */}
      <h1 className="text-5xl font-bold mb-4 text-center">
        Welcome to TaskMaster
      </h1>
      <p className="text-xl font-light mb-8 text-center max-w-lg">
        Organize your tasks, manage your projects, and increase productivity
        with ease. Let&lsquo;s get started!
      </p>

      {/* Call-to-Action Button */}
      <Button
        onClick={() => navigate("/dashboard")}
        className="bg-green_theme text-white px-8 py-3 text-lg rounded-md shadow-lg transition hover:bg-primary-2"
      >
        Get Started
      </Button>
    </div>
  );
};

export default WelcomeScreen;
