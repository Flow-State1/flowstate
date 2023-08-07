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

const DashboardRoutes = () => {
  const path = useLocation();

  return (
    <AnimatePresence mode="sync">
      <DashboardContextProvider>
        <LayoutDashboard>
          <Routes location={path} key={path.pathname}>
            <Route path="/dashboard/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route
              path="/dashboard/notifications"
              element={<Notifications />}
            />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route
              path="/dashboard/profile/editprofile"
              element={<EditProfile />}
            />
            <Route
              path="/dashboard/profile/viewprofile"
              element={<ViewProfile />}
            />
            <Route
              path="/dashboard/profile/changepassword"
              element={<ChangePassword />}
            />
          </Routes>
        </LayoutDashboard>
      </DashboardContextProvider>
    </AnimatePresence>
  );
};

export default React.memo(DashboardRoutes);
