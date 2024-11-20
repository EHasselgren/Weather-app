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

  const temperatures = validHourlyData.map((hour) => hour.temp);
  const minTemp = Math.floor(Math.min(...temperatures));
  const maxTemp = Math.ceil(Math.max(...temperatures));
  const range = maxTemp - minTemp || 1;

  
  
  const points = hourlyData.map((hour, index) => {
    // Changed from (index / 23) to (index / (hourlyData.length - 1))
    const x = (index / (hourlyData.length - 1)) * 85 + 4;
    const y = 95 - ((hour.temp - minTemp) / range) * 100;
    return `${x},${y}`;
  });

  const fillPoints = `0,100 ${points.join(" ")} 97,100`;

  const timeLabels = validHourlyData.map((hour) => {
    const date = new Date(hour.dt * 1000);
    return date.getHours();
  });

  const firstHour = timeLabels[0];
  const lastHour = timeLabels[timeLabels.length - 1];

  return (
    <div className="temperature-chart">
      <h2>Temperaturvariation</h2>
      <div className="chart-container">
        <svg className="chart-svg" preserveAspectRatio="xMinYMin meet"">
          <g>
            {Array.from({ length: 6 }, (_, i) => (
              <line
                key={i}
                x1="30"
                y1={`${i * 20}%`}
                x2="100%"
                y2={`${i * 20}%`}
                stroke="#00e0ff"
                strokeWidth="0.7"
              />
            ))}
          </g>

          <g transform="translate(25, 10)">
            {Array.from({ length: 6 }, (_, i) => {
              const temp = maxTemp - i * (range / 5);
              return (
                <text
                  key={i}
                  x="0"
                  y={`${i * 20}%`}
                  className="scale-text-white"
                  dominantBaseline="middle"
                >
                  {Math.round(temp)}°
                </text>
              );
            })}
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

            <polygon points={fillPoints} fill="url(#gradient)" />

            <polyline
              points={points.join(" ")}
              fill="none"
              stroke="rgb(59, 130, 246)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((point, i) => {
              const [x, y] = point.split(",");
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="3"
                  fill="white"
                  stroke="rgb(239, 68, 68)"
                  strokeWidth="2"
                  className="hover:r-4 transition-all duration-200"
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
