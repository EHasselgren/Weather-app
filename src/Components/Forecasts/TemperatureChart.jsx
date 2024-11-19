import PropTypes from "prop-types";
import { weatherInfoProps } from "../../types/propTypes";

const TemperatureChart = ({ hourlyData }) => {
  const temperatures = hourlyData.map(hour => hour.temp);
  const minTemp = Math.floor(Math.min(...temperatures));
  const maxTemp = Math.ceil(Math.max(...temperatures));
  const range = maxTemp - minTemp;

  const points = hourlyData.map((hour, index) => {
    // Changed from (index / 23) to (index / (hourlyData.length - 1))
    const x = (index / (hourlyData.length - 1)) * 100;
    const y = 100 - ((hour.temp - minTemp) / range) * 100;
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

  return (
    <div className="temperature-chart">
      <h2>Temperature Variation</h2>
      <div className="chart-container">
        <svg className="chart-svg" preserveAspectRatio="none">
          {/* Grid lines */}
          <g>
            {Array.from({ length: 6 }, (_, i) => (
              <line
                key={i}
                x1="30"
                y1={`${i * 20}%`}
                x2="100%"
                y2={`${i * 20}%`}
                stroke="#ccc"
                strokeWidth="1"
              />
            ))}
          </g>

          {/* Temperature scale */}
          <g transform="translate(25, 10)">
            {Array.from({ length: 6 }, (_, i) => {
              const temp = maxTemp - (i * (range / 5));
              return (
                <text
                  key={i}
                  x="0"
                  y={`${(i * 20)}%`}
                  className="scale-text-white"
                  dominantBaseline="middle"
                >
                  {Math.round(temp)}°
                </text>
              );
            })}
          </g>

          {/* Temperature curve with gradient fill */}
          <g transform="translate(30, 10)">
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Gradient fill */}
            <polygon
              points={fillPoints}
              fill="url(#gradient)"
            />

            {/* Temperature line */}
            <polyline
              points={points.map((point) => {
                const [x, y] = point.split(',');
                return `${(x * 0.97)}%,${y}%`;
              }).join(' ')}
              fill="none"
              stroke="rgb(239, 68, 68)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {points.map((point, i) => {
              const [x, y] = point.split(',');
              return (
                <circle
                  key={i}
                  cx={`${(parseFloat(x) * 0.97)}%`}
                  cy={`${y}%`}
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
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </div>
    </div>
  );
};

export default TemperatureChart;

TemperatureChart.propTypes = {
  hourlyData: PropTypes.arrayOf(PropTypes.shape(weatherInfoProps)).isRequired,
};
