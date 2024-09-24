import React, { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaTools,
  FaWrench,
  FaBuilding,
  FaFileAlt,
  FaCog,
  FaShieldAlt,
  FaUsers,
  FaCogs,
  FaChevronDown,
  FaChevronRight,
  FaStar,
  FaLaptopCode,
  FaServer,
  FaCalendarAlt,
  FaChartLine,
  FaSlidersH,
  FaToolbox,
  FaUserShield,
  FaUser,
} from "react-icons/fa";
import { RiMenuUnfold4Line, RiMenuUnfold3Line } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

// Sidebar menu items with nested submenus and icons
const menuItems = [
  { href: "/dashboard", title: "Dashboard", icon: FaTachometerAlt },
  { href: "/task-details", title: "Task Details", icon: FaTools },
  { href: "/settings", title: "Settings", icon: FaWrench },
];

const Sidebar = () => {
  const location = useLocation(); // Get the current path
  const [openMenus, setOpenMenus] = useState([]); // State to track open submenus
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setIsCollapsed(true); // Automatically collapse on smaller screens
      } else {
        setIsMobile(false);
        setIsCollapsed(false); // Default to expanded on larger screens
      }
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle the sidebar's collapsed state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Function to toggle menu visibility
  const toggleMenu = (title) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <div
      className={`${
        isCollapsed ? "w-20" : "w-60"
      } bg-white text-white flex flex-col rounded-lg h-full overflow-y-auto sidebar transition-all duration-500 ease-in-out`}
    >
      {/* Sidebar top icon */}
      <div className="flex flex-col justify-between items-center py-4">
        <div
          className={`flex ${
            isCollapsed ? "justify-center" : "justify-end pe-4"
          } w-full `}
        >
          <button onClick={toggleSidebar} className="text-black">
            {isCollapsed ? (
              <RiMenuUnfold3Line className="text-2xl" />
            ) : (
              <RiMenuUnfold4Line className="text-2xl" />
            )}
          </button>
        </div>
        <div className="p-4 flex justify-center items-center flex-col">
          <img
            height={100}
            width={isCollapsed ? 100 : 150}
            src="/assets/images/time-management.png" // Replace with the actual path to your logo
            alt="logo"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Sidebar menu items */}
      <nav className="flex-1">
        <ul className="space-y-4 p-4">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.href; // Check if the current item is active

            return (
              <li key={index}>
                <div
                  className={`flex items-center justify-between space-x-2 p-2 rounded-md cursor-pointer font-bold
                    ${
                      isActive
                        ? "text-primary-1 bg-gradient-to-r from-primary-3 to-primary-4 border-l-4 border-primary-1"
                        : "text-gray hover:bg-gray-700"
                    }${isCollapsed ? "justify-center" : ""}`}
                >
                  <NavLink
                    to={item.href}
                    className="flex items-center space-x-2"
                  >
                    <item.icon />
                    {!isCollapsed && <span>{item.title}</span>}
                  </NavLink>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
