import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  const [theme, setTheme] = useState("light");

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
              <div className="bg-gray-800 rounded-md h-20 p-4">
                <p className="text-gray-200">
                  This is how the dark theme looks.
                </p>
              </div>
            </CardContent>
          </Card>
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
          <Switch id="notifications" />
        </div>

        {/* Task Sorting */}
        <div className="mb-6">
          <Label className="font-medium text-gray-700 mb-2">
            Default Task Sorting
          </Label>
          <RadioGroup defaultValue="dueDate" className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dueDate" id="dueDate" />
              <Label htmlFor="dueDate">By Due Date</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="priority" id="priority" />
              <Label htmlFor="priority">By Priority</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="status" id="status" />
              <Label htmlFor="status">By Status</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
            Save Preferences
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
