import React from "react";
import { useState, useEffect} from "react";
import "./styles.css";
import NavSideBarComponent from "../components/nav-side-bar";
import LoadingCard from "../components/loadingCard";
import LineChart from "../components/lineChart";
import AreaLineChart from "../components/lineAreaChart";
import ProgressDonutChart from "../components/donutChart";

const Analytics = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
        setIsLoading(false);
        }, 2000);
    }, []);


    return(
        <div className="container-analytics">
            {isLoading ? (
                <LoadingCard />
            ) : (
                /* Render your main content here */
                <div>
                    <NavSideBarComponent />
                    <div className="main-content-card">
                        <div className="main-content-card-item">
                            <h1>Analytics</h1>
                        </div>

                        <div className="chart-card">
                            <div className="chart">
                                <h1>7.5kw/hr</h1>
                                <ProgressDonutChart />
                            </div>
                        </div>

                        <div className="chart-card-2">
                            <div className="chart">
                                <h1>Running Cost</h1>
                            </div>
                        </div>

                        <div className="chart-card-3">
                            <div className="chart">
                                <h1>CO2 emitted</h1>
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

export default Analytics;