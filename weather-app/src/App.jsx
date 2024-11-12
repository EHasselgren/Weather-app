import "./App.css";
import './styles/weatherCard.css';
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherCard from "./Components/weatherCard";

function App() {
  return (
    <div className="center-content">
      <WeatherCard />
    </div>
  );
}

export default App;
