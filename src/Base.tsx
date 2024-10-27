import React, { useState } from "react";
import DraggableMatchstick from "./DraggableMatchstick";
import RectangleArea from "./ReactangleArea";
import { FireworksHandlers } from '@fireworks-js/react'; // Import type
import Cracker from "./AnaarBomb";

// Define the types for the coordinate and native coordinate
interface BaseProps {
  fireworksRef: React.RefObject<FireworksHandlers>; // Define the type for fireworksRef
}

const Base: React.FC<BaseProps> = ({ fireworksRef }) => {
  const [isBurning, setIsBurning] = useState<boolean>(false);
  const [coord, setCoord] = useState({ x: 100, y: 100 });
  const [nativeCoord, setNativeCoord] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);

  return (
    <div
      className=" bg-black"
      onMouseMove={(e) => {
        if (dragging) {
          e.stopPropagation();
          setCoord({ x: e.clientX - nativeCoord.x, y: e.clientY - nativeCoord.y });
        }
      }}
    >
      <RectangleArea isBurning={isBurning} />
      <Cracker isBurning={isBurning} />
      <DraggableMatchstick
        isBurning={isBurning}
        setIsBurning={setIsBurning}
        setCoord={setCoord}
        coord={coord}
        setNativeCoord={setNativeCoord}
        dragging={dragging}
        setDragging={setDragging}
        fireworksRef={fireworksRef} // Pass the ref down to DraggableMatchstick
        
      />
    </div>
  );
};

export default Base;
