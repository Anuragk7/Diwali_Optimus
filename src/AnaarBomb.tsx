import React from "react";

// Define the types for props
interface RectangleAreaProps {
  isBurning: boolean;
}

const Cracker: React.FC<RectangleAreaProps> = ({ isBurning }) => {
  return (
    <div
      id="cracker"
      // className="absolute left-1/2 transform -translate-x-1/2 bottom-0 rotate-90" 
      className={`w-48 h-32  bg-black absolute top-3/4 left-1/2 transform -translate-x-1/2`}
      style={{
        backgroundImage: "firecracker-9079453_1280.png", // Replace with your image URL
      }}
      
    >

      {/* <p >{isBurning ? "Burning!" : "Drag the matchstick here quickly"}</p> */}
      <img src="firecracker-9079453_1280.png"
        alt="Cracker"
        className="h-32 w-48"
        
      /> 
    </div>
  );
};

export default Cracker;
