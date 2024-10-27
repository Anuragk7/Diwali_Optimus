import React from "react";

// Define the types for props
interface RectangleAreaProps {
  isBurning: boolean;
}

const RectangleArea: React.FC<RectangleAreaProps> = ({ isBurning }) => {
  return (
    <div
      id="rectangle-area"
      className={`w-48 h-32  flex items-center justify-center bg-black `}
      style={{
        backgroundImage: "matchbox.png", // Replace with your image URL
      }}
      
    >

      {/* <p >{isBurning ? "Burning!" : "Drag the matchstick here quickly"}</p> */}
      <img src = 'matchbox.png'
      style={{
        transform: 'rotate(90deg)', // Rotate 90 degrees to the right
        width: 'auto', // Adjust width and height as needed
        height: 'auto',
      }}
      ></img>
    </div>
  );
};

export default RectangleArea;
