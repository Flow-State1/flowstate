import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import logo from "../assets/logo.png";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import "./styles.css";
import { AppContext } from "../context/AppContext";

const SignUp = () => {
  const {
    isTabletOrLaptop,
    passwordVisible,
    error,
    name,
    email,
    password,
    confirmPassword,
    togglePasswordVisibility,
    SignUpOnChange,
    SignUpSubmit,
  } = useContext(AppContext);

    const navigate = useNavigate();
    const isTabletOrLaptop = useMediaQuery({ query: '(min-width: 768px)' });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const[error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const[inputValue, setInputValue] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    
    const {name, email, password, confirmPassword } = inputValue;
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
  
  const handleOnChange = (e) => {
        const { name , value} = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            fetch("http://localhost:3001/users/signup",{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(inputValue)
            }).then((response) => {
                if(!response.ok) {
                    response.json().then(data => {
                        console.log(data.message);
                        // setErrorMessage(data.message);
                        // setIsErrorVisible(true);
                    });
                }
                else {
                    console.log("User created and directed to dashboard");
                    navigate('/dashboard/dashboard/dashboard');
                }
            });
        }
        catch(error) {
            console.log(error);
        }

        setInputValue({
            ...inputValue,
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
        console.log(isLoading);
        setIsLoading(false);
    };

    return(
        <motion.div 
            className="signup-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
        >
            <div className="signup-card">
                <div className="signup-card-content">
                    <img 
                        src={logo} 
                        alt="logo" 
                        className="logo" 
                        style={{ width: isTabletOrLaptop ? '18rem' : '14rem' }}
                    />
                    <div className="logo-title">
                        <h1>
                            Flow State
                        </h1>
                    </div>

                    <form className="signup-form" onSubmit={handleSubmit}>
                        <h1 className="signup-card-title">Sign Up</h1>
                        <input 
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Name" 
                            onChange={handleOnChange}
                            className="signup-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                            required
                        />
                        <input 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={handleOnChange}
                            className="signup-input"
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                            required
                        />
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            name="password"
                            value={password}
                            placeholder="Password" 
                            onChange={handleOnChange}
                            className="signup-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                            required
                        />
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password" 
                            onChange={handleOnChange}
                            className="signup-input" 
                            style={{ width: isTabletOrLaptop ? '30rem' : '80%' }}
                            required
                        />
                        <p style={{color:"red", fontSize:"10pt"}}>{error}</p>
                        <FontAwesomeIcon
                            icon={passwordVisible ? faEye : faEyeSlash} 
                            onClick={togglePasswordVisibility}
                            className="sign-eye-icon"
                        />

                        <button 
                            className="signup-button" 
                            style={{ width: isTabletOrLaptop ? '15rem' : '50%' }}
                            disabled={isLoading}
                        >
                            {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Sign Up'}
                        </button>

                        <Link to="/login" className="login-link">
                            Already have an account? Login
                        </Link>
                    </form>
                </div>
            </div>
        </motion.div>
    )
}

export default React.memo(SignUp)
