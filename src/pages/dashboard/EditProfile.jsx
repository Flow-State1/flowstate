import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "react-responsive";
import { faCamera, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import "../styles.css";
import { AppContext } from "../../context/AppContext";

const EditProfile = () => {
  //Profile image
  const [profileImage, setProfileImage] = useState("");

  const {
    isTabletOrLaptop,
    HandleSaveChanges,
    handleInputChange,
    email,
    name,
    updateInput,
    selectedFile,
    setSelectedFile,
    handleFileChange,
    profilePictureURL,
    setProfilePictureURL,
    UserId,
    setUserId,
  } = useContext(AppContext);

  const fileInputRef = useRef(null);

  //Convert selected image to base64
  const convertToBase64 = (e) => {
    console.log(e);
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async () => {
      console.log(reader.result); //image string
      let result = reader.result;

      //Converting to blob
      let base64Data = result.split(",");
      let base64 = base64Data[1];
      var binary = atob(base64);
      var blob = new Blob([binary], { type: "image/jpeg"});
      var url = URL.createObjectURL(blob);
      let backBlob = await fetch(url).then(r => r.blob());
      setProfileImage(result);
      console.log("IMAGE URL: " + url);
      console.log("IMAGEBLOB:", backBlob);
    };
    reader.onerror = (error) => {
      console.log("Error: " + error);
    };
  };

  //Upload image to the DB
  const uploadImage = async () => {

    await fetch("http://localhost:3001/images/", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ base64: profileImage }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === "sent") {
          alert("Uploaded");
        } else if (resData.status === "failed") {
          alert("Failed to upload");
        }
      });

    console.log("Profile IMage: ", profileImage);
  };

  // const blobToBase64 = (b) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL({b});
  //   return new Promise(resolve => {
  //     reader.onloadend = () => {
  //       resolve(reader.result);
  //     };
  //   });
  // };

  // blobToBase64(profileImage).then(res => {
  //   // do what you wanna do
  //   console.log(res); // res is base64 now
  // });

  useEffect(() => {
    console.log(UserId);
    const profilePictureURL = `/uploads/profile-pictures/${UserId}`;
    console.log(profilePictureURL);
    fetch(`/uploads/profile-pictures/${UserId}`)
      .then((response) => response.blob())
      .then((data) => {
        setProfilePictureURL(URL.createObjectURL(data));
      })
      .catch((error) => {
        console.error("Error fetching photo:", error);
      });
  }, [UserId]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-content-header">
            <h2>Edit Profile</h2>
          </div>

          <div className="profile-content-body">
            <div className="profile-content-body-card">
              <div className="profile-content-body-card-head">
                <div className="profile-profile-avatar">
                  {profilePictureURL ? (
                    <img
                      src={profileImage}
                      alt="Profile picture"
                      style={{
                        width: "12rem",
                        height: "12rem",
                        borderRadius: "50%",
                        objectFit: "cover",
                        position: "relative",
                        top: "75%",
                      }}
                    />
                  ) : (
                    <img
                      src={profileImage}
                      alt=""
                      style={{
                        width: "12rem",
                        height: "12rem",
                        borderRadius: "50%",
                        objectFit: "cover",
                        position: "relative",
                        top: "75%",
                      }}
                    />
                  )}
                  <div className="profile-profile-avatar-camera">
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={convertToBase64}
                      ref={fileInputRef}
                    />
                    <FontAwesomeIcon
                      icon={faCamera}
                      className="camera-icon"
                      onClick={() => fileInputRef.current.click()}
                    />
                  </div>
                </div>

                <div className="profile-edit-details">
                  <form
                    className="profile-edit-details-form"
                    onSubmit={HandleSaveChanges}
                  >
                    <input
                      className="profile-edit-details-form-input"
                      name="name"
                      type="text"
                      placeholder="name"
                      onChange={handleInputChange}
                      // value={updateInput.name}
                    />
                    <input
                      className="profile-edit-details-form-input"
                      name="email"
                      type="email"
                      placeholder="email"
                      onChange={handleInputChange}
                      // value={updateInput.email}
                    />
                    <button
                      className="profile-edit-details-form-button"
                      style={{ width: isTabletOrLaptop ? "15rem" : "50%" }}
                      onClick={uploadImage}
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(EditProfile);
