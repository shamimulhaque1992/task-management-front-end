/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Dashboard";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import Settings from "./pages/Settings";

const App = () => (
  <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/task-details" element={<TaskDetails />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
    <Route path="/sign-in" element={<SignInPage />}></Route>
    <Route path="/sign-up" element={<SignUpPage />}></Route>
  </Routes>
);

export default App;
