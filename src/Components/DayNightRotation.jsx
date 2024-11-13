import { useState, useEffect } from 'react';
import dayNightImage from "../media/phase.v1.png";
import "../styles/DayNightBackground.css";

export const DayNightRotation = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const updateRotation = () => {
      const hour = new Date().getHours();
      const hoursSinceNoon = hour >= 12 ? hour - 12 : hour + 12;
      const newRotation = (hoursSinceNoon / 24) * 360;
      setRotation(newRotation);
    };

    updateRotation();
    const interval = setInterval(updateRotation, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={dayNightImage}
      alt="Day and Night Background"
      className="day-night-image"
      style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
    />
  );
};