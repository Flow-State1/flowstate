import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LayoutDashboard from "../../../src/components/BackgroundImage";
import Analytics from "./Analytics";
import Dashboard from "./Dashboard";
import Notifications from "./Notifications";
import Settings from "./Settings";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";
import ChangePassword from "./ChangePassword";
import DashboardContextProvider from "../../context/DashboardContext";
import { ThemeProvider } from "../../context/ThemeContext";

const DashboardRoutes = () => {
  const path = useLocation();

  return (
    <AnimatePresence mode="sync">
      <DashboardContextProvider>
        <ThemeProvider>
        <LayoutDashboard>
          <Routes location={path} key={path.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route
              path="/notifications"
              element={<Notifications />}
            />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile/editprofile"
              element={<EditProfile />}
            />
            <Route
              path="/profile/viewprofile"
              element={<ViewProfile />}
            />
            <Route
              path="/profile/changepassword"
              element={<ChangePassword />}
            />
          </Routes>
        </LayoutDashboard>
        </ThemeProvider>
      </DashboardContextProvider>
    </AnimatePresence>
  );
};

export default React.memo(DashboardRoutes);
