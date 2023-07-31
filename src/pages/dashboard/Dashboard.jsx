import React, { useContext, useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import "../styles.css";
import { AppContext } from "../../context/AppContext";
import LineGraph from "../../components/LineGraph";


const Dashboard = () => {

  const {payload,voltage,apower,current,consumption} = useContext(AppContext);

  // console.log(consumption);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-content-header">
            <h2>Dashboard</h2>
          </div>

          <div className="dashboard-content-body">
            <div className="dashboard-content-body-summary-graph-card">
              <div className="dashboard-content-body-summary-graph-card-header">
                <h3>Live Graph</h3>
              </div>
              <LineGraph/>
            </div>
            <div className="dashboard-content-body-profile-right-card">
              <div className="dashboard-content-body-profile-right-card-avatar">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt=""
                />

                <div className="dashboard-content-body-profile-right-card-avatar-name">
                  <h3>Hi Andre!</h3>
                  <p>How are you today?</p>
                </div>
              </div>
            </div>

            <div className="dashboard-content-body-profile-right-summary-card">
              <div className="dashboard-content-body-profile-right-summary-card-header">
                <h3>Latest Updates</h3>
              </div>
            </div>

            <div className="dashboard-content-body-profile-middle-mini-cards">
              <div className="dashboard-content-body-profile-middle-mini-card">
                <div className="dashboard-content-body-profile-middle-mini-card-header">
                  <h3>Voltage: {voltage}</h3>
                </div>
              </div>
              <div className="dashboard-content-body-profile-middle-mini-card">
                <div className="dashboard-content-body-profile-middle-mini-card-header">
                  <h3>Current: {current}</h3>
                </div>
              </div>

              <div className="dashboard-content-body-profile-middle-mini-card">
                <div className="dashboard-content-body-profile-middle-mini-card-header">
                  <h3>Power: {apower}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(Dashboard);
