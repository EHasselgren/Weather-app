import { Nav } from "react-bootstrap";
import { weatherNavProps } from "../types/propTypes";
import "../styles/WeatherNav.css";

export const WeatherNav = ({ activeKey, onSelect }) => {
  return (
    <Nav
      variant="tabs"
      className="mb-3 nav-fill custom-tabs"
      activeKey={activeKey}
      onSelect={onSelect}
    >
      <Nav.Item className="flex-grow-1">
        <Nav.Link eventKey="current" className="text-center px-0">
          Vädret nu
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="flex-grow-1">
        <Nav.Link eventKey="forecast" className="text-center px-0">
          Prognos
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

WeatherNav.propTypes = weatherNavProps;

export default WeatherNav;
