import React, { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import Report from "./Report";
import { AppContext } from "../../context/AppContext";
import LoginCard from "../../components/LoginCard";
import Redirect from "../Redirect";
import { ThemeProvider } from "../../context/ThemeContext";

const DashboardRoutes = () => {
  const path = useLocation();

  const { authenticated } = useContext(AppContext);
  const navigate = useNavigate();
  // console.log(authenticated);
  return (
    <>
      <AnimatePresence mode="sync">
        <DashboardContextProvider>
          <ThemeProvider>
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
              <Route path="/dashboard/Report" element={<Report />} />
            </Routes>
          </LayoutDashboard>
          </ThemeProvider>
        </DashboardContextProvider>
      </AnimatePresence>
    </>
  );
};

export default React.memo(DashboardRoutes);
