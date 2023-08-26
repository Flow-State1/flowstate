import React from "react";
import "./styles.css";
import { useState, useEffect } from "react";
import NavSideBarComponent from "../components/nav-side-bar";
import LoadingCard from "../components/loadingCard";

const Notifications = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
        setIsLoading(false);
        }, 2000);
    }, []);


    return(
        <div className="container-notifications">
            {isLoading ? (
                <LoadingCard />
            ) : (
                /* Render your main content here */
                <div>
                    <NavSideBarComponent />

                    <div className="main-content-card">
                        <div className="main-content-card-item">
                            <h1>Notifications</h1>
                        </div>

                        <div className="notifications-card">
                            <div className="notifications-avatar">
                                <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
                            </div>

                            <div className="notifications-content">
                                <p>Andre, only 80% of your notifications have been opened.</p>
                            </div>
                        </div>

                        <div className="notifications-card-2">
                            <div className="notifications-card-item">
                                <h1>All Notifications</h1>
                            </div>

                            <div className="notifications-card-content">
                                <p>Hello Chelsea, the booilers are using up more electricity than usual.</p>
                            </div>

                            <div className="notifications-card-content-2">
                                <p>Time to top up weekly electricity.</p>
                            </div>

                            <div className="notifications-card-content-3">
                                <p>Residents have maintained responsible use of electricity.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Notifications;