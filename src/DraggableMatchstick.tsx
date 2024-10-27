import React, { useState, useRef, useEffect } from "react";
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'
// Define the types for props
interface DraggableMatchstickProps {
  isBurning: boolean;
  setIsBurning: (isBurning: boolean) => void;
  setCoord: (coord: { x: number; y: number }) => void;
  coord: { x: number; y: number };
  setNativeCoord: (coord: { x: number; y: number }) => void;
  setDragging: (dragging: boolean) => void;
  dragging: boolean;
  fireworksRef: React.RefObject<FireworksHandlers>; 
}

const DraggableMatchstick: React.FC<DraggableMatchstickProps> = ({
  isBurning,
  setIsBurning,
  setCoord,
  coord,
  setNativeCoord,
  setDragging,
  dragging,
  fireworksRef,
}) => {
  const [position, setPosition] = useState<{ x: number; y: number }>(coord);
  const [prevTime, setPrevTime] = useState<number | null>(null);
  const [prevPosition, setPrevPosition] = useState<{ x: number; y: number }>({ x: 100, y: 100 });
  const [stickHeight, setStickHeight] = useState<number>(150);
  const matchstickRef = useRef<HTMLDivElement | null>(null);
  const coordRef = useRef(coord);

  useEffect(() => {
    coordRef.current = coord; // Update the ref whenever coord changes
  }, [coord]);

  // Speed threshold for igniting the matchstick
  const speedThreshold = 0.5; // Adjust this value to control sensitivity

  const handleMouseDown = (e: React.MouseEvent) => {
    setNativeCoord({ x: e.clientX - coord.x, y: e.clientY - coord.y });
    setDragging(true);
    e.preventDefault();
  };

  const stickHeightReduce = () => {
    setCoord({ x: coordRef.current.x, y: coordRef.current.y + 1 });
    setStickHeight((prevHeight) => prevHeight - 1);
  };

  useEffect(() => {
    if (!dragging) return;

    const currentTime = Date.now();
    const timeDiff = currentTime - (prevTime || currentTime); // Avoid null

    const newPosition = coord;
    setPosition(newPosition);

    // Calculate distance and speed
    const distance = Math.sqrt(
      Math.pow(newPosition.x - prevPosition.x, 2) +
      Math.pow(newPosition.y - prevPosition.y, 2)
    );

    const speed = distance / timeDiff;

    // Update previous position and time
    setPrevPosition(newPosition);
    setPrevTime(currentTime);

    // Check if matchstick head overlaps rectangle and if speed is enough
    const rect = document.getElementById("rectangle-area");
    const cracker = document.getElementById("cracker");
    const matchstick = matchstickRef.current;

    if (rect && matchstick && !isBurning) {
      const rectBounds = rect.getBoundingClientRect();
      const matchstickBounds = matchstick.getBoundingClientRect();

      const isOverlapping =
        matchstickBounds.left < rectBounds.right &&
        matchstickBounds.right > rectBounds.left &&
        matchstickBounds.top < rectBounds.bottom &&
        matchstickBounds.bottom > rectBounds.top;

      if (isOverlapping && speed > speedThreshold) {
        setIsBurning(true); // Set burning state if speed threshold is met

        const intervalId = setInterval(() => {
          stickHeightReduce();
        }, 100);

        // Clear interval when unmounted or if burning state changes
        return () => clearInterval(intervalId);
      }
    }
    if (rect && matchstick && !isBurning) {
        const rectBounds = rect.getBoundingClientRect();
        const matchstickBounds = matchstick.getBoundingClientRect();
  
        const isOverlapping =
          matchstickBounds.left < rectBounds.right &&
          matchstickBounds.right > rectBounds.left &&
          matchstickBounds.top < rectBounds.bottom &&
          matchstickBounds.bottom > rectBounds.top;
  
        if (isOverlapping && speed > speedThreshold) {
          //setIsBurning(true); // Set burning state if speed threshold is met
            
          const intervalId = setInterval(() => {
            stickHeightReduce();
          }, 100);
  
          // Clear interval when unmounted or if burning state changes
          return () => clearInterval(intervalId);
        }
      }
      if (cracker && matchstick && isBurning) {
        const rectBounds = cracker.getBoundingClientRect();
        const matchstickBounds = matchstick.getBoundingClientRect();
  
        const isOverlapping =
          matchstickBounds.left < rectBounds.right &&
          matchstickBounds.right > rectBounds.left &&
          matchstickBounds.top < rectBounds.bottom &&
          matchstickBounds.bottom > rectBounds.top;
  
        if (isOverlapping && speed > speedThreshold) {
          //setIsBurning(true); // Set burning state if speed threshold is met
          fireworksRef.current?.start();
          const intervalId = setInterval(() => {
            stickHeightReduce();
          }, 100);
  
          // Clear interval when unmounted or if burning state changes
          return () => clearInterval(intervalId);
        }
      }
  }, [coord, dragging, isBurning, prevTime, prevPosition, setIsBurning]);

  const handleMouseUp = () => {
    setDragging(false);
  };

  if (stickHeight <= 0) return null;

  return (
    <div
      className="relative"
      style={{
        position: "absolute",
        left: coord.x,
        top: coord.y,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={matchstickRef}
    >
      <div
        className={`w-6 h-6 rounded-full bg-red-600 ${isBurning ? "burning" : ""}`
    }
      ></div>
      <div className={`w-2 bg-yellow-700 mt-1 mx-auto`} style={{ height: `${stickHeight}px` }}></div>

      <style>{`
        .burning {
          animation: burn 0.5s ease-in-out infinite alternate;
          box-shadow: 0 0 10px rgba(255, 165, 0, 0.8),
                      0 0 20px rgba(255, 69, 0, 0.6),
                      0 0 30px rgba(255, 0, 0, 0.4);
        }
        @keyframes burn {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default DraggableMatchstick;