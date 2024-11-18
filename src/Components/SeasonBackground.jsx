// SeasonBackground.jsx
import React, { useEffect, useState } from 'react';
import '../styles/Seasonbackground.css';

const SeasonBackground = () => {
  const [season, setSeason] = useState('');

  useEffect(() => {
    const getSeason = () => {
      const month = new Date().getMonth() + 1; // Months are 0-indexed
      if (month >= 3 && month <= 5) return 'spring';
      if (month >= 6 && month <= 8) return 'summer';
      if (month >= 9 && month <= 11) return 'autumn';
      return 'winter';
    };
    setSeason(getSeason());
  }, []);

  return (
    <div className={`background ${season}`}>
      {season === 'summer' && (
        <>
          <div className="butterfly butterfly1"></div>
          <div className="butterfly butterfly2"></div>
          <div className="butterfly butterfly3"></div>
        </>
      )}
      {season === 'spring' && (
        <>
          <div className="flower flower1"></div>
          <div className="flower flower2"></div>
          <div className="flower flower3"></div>
        </>
      )}
      {season === 'autumn' && (
  <>
    <div className="leaf leaf1"></div>
    <div className="leaf leaf2"></div>
    <div className="leaf leaf3"></div>
    <div className="leaf leaf4"></div>
  </>
)}
{season === 'winter' && (
  <>
    <div className="snowflake snowflake1"></div>
    <div className="snowflake snowflake2"></div>
    <div className="snowflake snowflake3"></div>
    <div className="snowflake snowflake4"></div>
  </>
)}
    </div>
  );
};

export default SeasonBackground;
