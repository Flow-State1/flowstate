import React from "react";
import video from "../assets/forms-bg.mp4";

const Chatbotbg= () => {
    return(
        <div className="background-video" >
            <video autoPlay muted loop>
                <source src={video}/>
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default Chatbotbg;