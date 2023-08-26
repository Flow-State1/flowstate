import React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import NavSideBarComponent from "../components/nav-side-bar";
import LoadingCard from "../components/loadingCard";
import LineChart from "../components/lineChart";
import AreaLineChart from "../components/lineAreaChart";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
        setIsLoading(false);
        }, 2000);
    }, []);
    
    return(
        <div className="container-profile">
            {isLoading ? (
                <LoadingCard />
            ) : (
                /* Render your main content here */
                <div>
                    <NavSideBarComponent />

                    <div className="main-content-card">
                        <div className="main-content-card-item">
                                <h1>Dashboard</h1>
                        </div>

                        <div className="profile-edit">
                            <div className="profile-edit-avatar">
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                            </div>

                            <div className="profile-details">
                                <h1 className="profile-details-title">Hi, Andre!</h1>
                            </div>
                        </div>

                        <div className="chart-card-4">
                            <div className="chart">
                                <h1>Consumption/day</h1>
                                <AreaLineChart />
                            </div>
                        </div>

                        <div className="chart-card-5">
                            <div className="chart">
                                <h1>Consumption vs. Cost</h1>
                                <LineChart />
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}


export default Dashboard;