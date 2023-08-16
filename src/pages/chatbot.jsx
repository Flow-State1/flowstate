import React from"react";
import { useState, useEffect} from "react";
import NavSideBarComponent from "../components/nav-side-bar";
import LoadingCard from "../components/loadingCard";
import LineChart from "../components/lineChart";
import AreaLineChart from "../components/lineAreaChart";
import ProgressDonutChart from "../components/donutChart";
import "./styles.css";
import {Chatbot} from "react-chatbot-kit";
import config from "../chatbox/config";
import MessageParser from "../chatbox/MessageParser"
import ActionProvider from "../chatbox/ActionProvider";
const Chatbox =()=>{
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        // Simulate loading delay
        setTimeout(() => {
        setIsLoading(false);
        }, 2000);
    }, []);


    return(
        <div>
            {isLoading ? (
                <LoadingCard />
            ) : (
                /* Render your main content here */
                <div>
                    <NavSideBarComponent />

                    <div className="main-content-card">
                        <div className="main-content-card-item">
                            {/* <h1>Talk To Us</h1> */}
                            <h1>Hey Lets Chat</h1>
                            <Chatbot
                                 config={config}
                                 messageParser={MessageParser}
                                 actionProvider={ActionProvider}
                                 />
                        </div>
                        </div>
                    </div>
            )}
        </div>
    )
}
export default Chatbox;