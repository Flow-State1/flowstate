import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoadingScreen from "../components/loadingScreen"
import "./styles.css"
import BackgroundVideo from "../components/backgroundVideo"

const Splash = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }, []);

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate("/login")
    }

    const handleSignUp = () => {
        navigate("/sign-up")
    }
    
    return(
        <div className="container">
            {isLoading ? (
                <LoadingScreen />
            ) : (
                /* Render your main content here */
            <div>
                    <BackgroundVideo />
                <div className="title">
                    <h1>Welcome <span className="sub-title">To </span> <span className="sub-sub-title"> floW-stAte</span></h1>
                </div>

                <div className="button-container">
                    <button className="button-segmented left" onClick={handleLogin}>Login</button>
                    <button className="button-segmented right" onClick={handleSignUp}>Sign up</button>
                </div>

            </div>
            )}
        </div>
    )
}

export default Splash;