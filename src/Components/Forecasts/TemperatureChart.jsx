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
        <h2>Temperature Variation</h2>
        <div className="chart-container">
          <p>No temperature data available for this period</p>
        </div>
      </div>
    );
  }

  // Get exact min and max temperatures for point mapping
  const temperatures = validHourlyData.map((hour) => hour.temp);
  const exactMinTemp = Math.min(...temperatures);
  const exactMaxTemp = Math.max(...temperatures);
  
  // Create rounded scale values for display
  const floorTemp = Math.floor(exactMinTemp);
  const ceilTemp = Math.ceil(exactMaxTemp);
  
  // Create simple scale with whole numbers
  const scaleValues = [];
  for (let temp = ceilTemp; temp >= floorTemp; temp--) {
    scaleValues.push(temp);
  }
  
  // Map points using exact temperature values
  const points = validHourlyData.map((hour, index) => {
    const x = (index / (validHourlyData.length - 1)) * 85 + 4;
    
    // Use exact min/max for point positioning
    const tempPercentage = (exactMaxTemp - hour.temp) / (exactMaxTemp - exactMinTemp);
    const y = 10 + (tempPercentage * 80);
    
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

  const timeLabels = validHourlyData.map(hour => {
    const date = new Date(hour.dt * 1000);
    return `${date.getHours()}:00`;
  });

  return (
    <div className="temperature-chart">
      <div className="chart-container">
        <svg className="chart-svg" preserveAspectRatio="xMinYMin meet">
          {/* Temperature values with reduced left margin */}
          <g transform="translate(10, 10)">
            {scaleValues.map((temp, i) => (
              <text
                key={i}
                x="0"
                y={`${(i * 80 / (scaleValues.length - 1))}%`}
                className="scale-text-white"
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {temp}°
              </text>
            ))}
          </g>

          {/* Grid lines with adjusted starting position */}
          <g transform="translate(30, 0)">
            {scaleValues.map((temp, i) => (
              <line
                key={i}
                x1="0"
                y1={`${(i * 80 / (scaleValues.length - 1)) + 10}%`}
                x2="100%"
                y2={`${(i * 80 / (scaleValues.length - 1)) + 10}%`}
                stroke="#00e0ff"
                strokeWidth="0.7"
              />
            ))}
          </g>

          <g transform="translate(15, 0)">
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
              const temp = validHourlyData[i]?.temp || exactMinTemp;
              const relativeTemp = (temp - exactMinTemp) / (exactMaxTemp - exactMinTemp);
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

        <div className="time-labels">
          {timeLabels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemperatureChart;

TemperatureChart.propTypes = {
  hourlyData: PropTypes.arrayOf(PropTypes.shape(weatherInfoProps)).isRequired,
};