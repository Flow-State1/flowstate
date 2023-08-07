import React, { useState } from 'react';
import './ToggleSwitch.css'; // Create a separate CSS file for styling

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="toggle-switch" onClick={()=>{fetch('http://localhost:3001/public/swich',{
      method:'POST',
      header:{"Content-type":"application/json"}

    }).then(respond=>console.log(respond)).catch((error)=>{console.log('id:Swich_End_Point,${error}');})}}>
    
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;
