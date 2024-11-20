import PropTypes from "prop-types";
import { weatherInfoProps } from "../../types/propTypes";
import '../../styles/TemperatureChart.css'

const TemperatureChart = ({ hourlyData }) => {
  const validHourlyData = hourlyData.filter(
    (hour) => hour && typeof hour.temp === "number" && !isNaN(hour.temp)
  );

  if (validHourlyData.length === 0) {
    return (
      <div className="temperature-chart">
        <div className="chart-container">
          <p>No temperature data available for this period</p>
        </div>
      </div>
    );
  }

  const temperatures = validHourlyData.map((hour) => hour.temp);
  const minTemp = Math.min(...temperatures);
  const maxTemp = Math.max(...temperatures);
  
  // Function to determine optimal scale divisions
  const getOptimalScale = (min, max) => {
    const range = max - min;
    let step;
    
    if (range <= 2) {
      step = 0.5;
    } else if (range <= 5) {
      step = 1;
    } else {
      step = 2;
    }
    
    // Adjust min and max to get clean values
    const adjustedMin = Math.floor(min / step) * step;
    const adjustedMax = Math.ceil(max / step) * step;
    
    // Generate scale values
    const values = [];
    for (let temp = adjustedMax; temp >= adjustedMin; temp -= step) {
      values.push(Number(temp.toFixed(1))); // Ensure clean decimal values
    }
    
    return {
      min: adjustedMin,
      max: adjustedMax,
      values: values,
      range: adjustedMax - adjustedMin
    };
  };

  const scale = getOptimalScale(minTemp, maxTemp);
  
  const points = hourlyData.map((hour, index) => {
    const x = (index / (hourlyData.length - 1)) * 85 + 4;
    const y = 95 - ((hour.temp - scale.min) / scale.range) * 80;
    return `${x},${y}`;
  });

  const fillPoints = [
    "0,100",
    ...points.map((point) => {
      const [x, y] = point.split(',');
      return `${(x * 0.97)}%,${y}%`;
    }),
    "97,100"
  ].join(" ");

  const timeLabels = validHourlyData.map((hour) => {
    const date = new Date(hour.dt * 1000);
    return date.getHours();
  });

  const firstHour = timeLabels[0];
  const lastHour = timeLabels[timeLabels.length - 1];

  return (
    <div className="temperature-chart">
      <div className="chart-container">
        <svg className="chart-svg" preserveAspectRatio="xMinYMin meet">
          {/* Grid lines */}
          <g>
            {scale.values.map((temp, i) => (
              <line
                key={i}
                x1="30"
                y1={`${(i * 80 / (scale.values.length - 1)) + 10}%`}
                x2="100%"
                y2={`${(i * 80 / (scale.values.length - 1)) + 10}%`}
                stroke="#00e0ff"
                strokeWidth="0.7"
              />
            ))}
          </g>

          {/* Temperature labels */}
          <g transform="translate(25, 0)">
            {scale.values.map((temp, i) => (
              <text
                key={i}
                x="0"
                y={`${(i * 80 / (scale.values.length - 1)) + 10}%`}
                className="scale-text-white"
                dominantBaseline="middle"
                textAnchor="end"
              >
                {temp}°
              </text>
            ))}
          </g>

          <g transform="translate(30, 10)">
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgb(239, 68, 68)"
                  stopOpacity="0.2"
                />
                <stop
                  offset="100%"
                  stopColor="rgb(239, 68, 68)"
                  stopOpacity="0.05"
                />
              </linearGradient>
            </defs>

            <polygon
              points={fillPoints}
              fill="url(#gradient)"
            />

            <polyline
              points={points.map((point) => {
                const [x, y] = point.split(',');
                return `${(x * 0.97)}%,${y}%`;
              }).join(' ')}
              fill="none"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((point, i) => {
              const [x, y] = point.split(',');
              const temp = hourlyData[i]?.temp || scale.min;
              const relativeTemp = (temp - scale.min) / scale.range;
              const clampedRelativeTemp = Math.min(Math.max(relativeTemp, 0), 1);
              const color = `rgb(
                ${Math.round(255 * clampedRelativeTemp)}, 
                0, 
                ${Math.round(255 * (1 - clampedRelativeTemp))}
              )`;

              return (
                <circle
                  key={i}
                  cx={`${(parseFloat(x) * 0.97)}%`}
                  cy={`${y}%`}
                  r="3" 
                  fill="white"
                  stroke={color}
                  strokeWidth="1"
                />
              );
            })}
          </g>
        </svg>
      </div>

      <div className="time-labels">
        <span>{firstHour}:00</span>
        <span>{Math.round((lastHour - firstHour) * 0.25) + firstHour}:00</span>
        <span>{Math.round((lastHour - firstHour) * 0.5) + firstHour}:00</span>
        <span>{Math.round((lastHour - firstHour) * 0.75) + firstHour}:00</span>
        <span>{lastHour}:00</span>
      </div>
    </div>
  );
};

export default TemperatureChart;

TemperatureChart.propTypes = {
  hourlyData: PropTypes.arrayOf(PropTypes.shape(weatherInfoProps)).isRequired,
};