import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchUser, updateUserPreferences } from "@/store/usersSlice.js"; // Thunks for user actions
import ConfirmDialog from "@/components/ConfirmationModal";
import { useUser } from "@clerk/clerk-react";
import { Skeleton } from "@/components/ui/skeleton";
import Loader from "@/components/Loader";
// Separate modal component for confirmation

const Settings = () => {
  const dispatch = useDispatch();
  const { user: clerkUser } = useUser();
  const { users, loading, success } = useSelector((state) => state.users); // Assuming the user data is stored here
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(false);
  const [defaultSortBy, setDefaultSortBy] = useState("priority");
  const [showDialog, setShowDialog] = useState(false); // Modal state

  // Fetch user preferences on mount
  useEffect(() => {
    const email = clerkUser?.primaryEmailAddress?.emailAddress;
    if (!email) return; // Use authenticated user's email
    dispatch(fetchUser(email));
  }, [clerkUser?.primaryEmailAddress?.emailAddress, dispatch]);

  // Update state when user data is fetched
  useEffect(() => {
    if (users && users.preferences) {
      setTheme(users.preferences.theme || "light");
      setNotifications(users.preferences.notifications || false);
      setDefaultSortBy(users.preferences.defaultSortBy || "priority");
    }
  }, [users]);

  // Handle Save Preferences with confirmation modal
  const handleSavePreferences = () => {
    setShowDialog(true); // Show confirmation dialog
  };

  const handleConfirmSave = () => {
    const preferences = {
      userId: users._id, // Assuming user._id exists
      preferences: {
        theme,
        notifications,
        defaultSortBy,
      },
    };
    dispatch(updateUserPreferences(preferences)); // Dispatch the update action
    setShowDialog(false); // Close the dialog
  };

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Settings</h1>

      {/* Theme Selection */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Theme</h2>
        <div className="flex gap-4">
          {/* Light Theme */}
          <Card
            className={`w-1/2 cursor-pointer transition-transform ${
              theme === "light" ? "ring-2 ring-indigo-600 scale-105" : ""
            }`}
            onClick={() => setTheme("light")}
          >
            <CardHeader>
              <CardTitle>Light</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl !animate-none bg-light_gray" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] !animate-none bg-light_gray" />
                  <Skeleton className="h-4 w-[200px] !animate-none bg-light_gray" />
                </div>
              </div>
              <div className="bg-gray-100 rounded-md h-20 p-4">
                <p className="text-gray-800">
                  This is how the light theme looks.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Dark Theme */}
          <Card
            className={`w-1/2 cursor-pointer transition-transform ${
              theme === "dark" ? "ring-2 ring-indigo-600 scale-105" : ""
            }`}
            onClick={() => setTheme("dark")}
          >
            <CardHeader>
              <CardTitle>Dark</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl !animate-none bg-black" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] !animate-none bg-black" />
                  <Skeleton className="h-4 w-[200px] !animate-none bg-black" />
                </div>
              </div>
              <div className="bg-gray-800 rounded-md h-20 p-4">
                <p className="text-gray-200">
                  This is how the dark theme looks.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* System Theme */}
          <Card
            className={`w-1/2 cursor-pointer transition-transform ${
              theme === "system" ? "ring-2 ring-indigo-600 scale-105" : ""
            }`}
            onClick={() => setTheme("system")}
          >
            <CardHeader>
              <CardTitle>System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-[250px] rounded-xl !animate-none bg-light_gray" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px] !animate-none bg-light_gray" />
                  <Skeleton className="h-4 w-[200px] !animate-none bg-light_gray" />
                </div>
              </div>
              <div className="bg-gray-800 rounded-md h-20 p-4">
                <p className="text-gray-200">
                  This is how the system theme looks.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Other Preferences */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          General Preferences
        </h2>

        {/* Notifications */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Label
              htmlFor="notifications"
              className="font-medium text-gray-700"
            >
              Enable Notifications
            </Label>
            <p className="text-gray-500 text-sm">
              Receive email or push notifications for task updates.
            </p>
          </div>
          <Switch
            id="notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>

        {/* Task Sorting */}
        <div className="mb-6">
          <Label className="font-medium text-gray-700 mb-2">
            Default Task Sorting
          </Label>
          <RadioGroup
            value={defaultSortBy}
            onValueChange={setDefaultSortBy}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dueDate" id="dueDate" />
              <Label htmlFor="dueDate">By Due Date</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="priority" id="priority" />
              <Label htmlFor="priority">By Priority</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSavePreferences}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Save Preferences
          </Button>
        </div>
      </section>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={showDialog}
        onConfirm={handleConfirmSave}
        onCancel={() => setShowDialog(false)}
        title="Confirm Preferences Update"
        description="Are you sure you want to update your preferences?"
      />
    </div>
  );
};

export default Settings;
