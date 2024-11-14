import { useState, useEffect } from 'react';
import dayNightImage from '../../media/phase.v1.png';

export function DayNightImage() {
    const [rotation, setRotation] = useState(0);
    
    const updateRotation = () => {
        const hour = new Date().getHours();
        const hoursSinceNoon = (hour >= 12) ? hour - 12 : hour + 12;
        const newRotation = (hoursSinceNoon / 24) * 360;
        setRotation(newRotation);
    };
    
    useEffect(() => {
        updateRotation();
        const interval = setInterval(updateRotation, 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <img
            src={dayNightImage}
            alt="Day and Night Background"
            className="day-night-image"
            style={{ transform: `rotate(${rotation}deg)` }}
        />
    );
}