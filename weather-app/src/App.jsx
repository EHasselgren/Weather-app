import "./App.css";
import WeatherCard from "./Components/weatherCard";
import './styles/weatherCard.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
    <div className="center-content">
       < WeatherCard />
    </div>
    </div>
    
  );
}

export default App;
