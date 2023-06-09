import React from "react";
import video from "../assets/background-video.mp4";

const BackgroundVideo = () => {
    return(
        <div className="background-video" >
            <video autoPlay muted loop>
                <source src={video}/>
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default BackgroundVideo;