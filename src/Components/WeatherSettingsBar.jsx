import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const WeatherSettingsBar = () => {
  const defaultLocations = [
    { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
    { name: "Göteborg", lat: 57.7089, lon: 11.9746 },
    { name: "Malmö", lat: 55.605, lon: 13.0038 },
  ];

  const [settings, setSettings] = useState({
    showTemperature: true,
    showWind: true,
    showCondition: true,
    selectedLocation: defaultLocations[0],
  });

  const toggleSetting = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleLocationChange = (e) => {
    const location = defaultLocations.find(
      (loc) => loc.name === e.target.value
    );
    setSettings((prev) => ({
      ...prev,
      selectedLocation: location,
    }));
  };

  return (
    <Container className="my-3">
      <div className="bg-light p-3 rounded shadow-sm">
        <Row className="align-items-center">
          <Col xs={12} md={9}>
            <div className="d-flex gap-2 flex-wrap">
              <Button
                variant={
                  settings.showTemperature ? "primary" : "outline-secondary"
                }
                onClick={() => toggleSetting("showTemperature")}
                className="d-flex align-items-center"
              >
                <FontAwesomeIcon
                  icon={settings.showTemperature ? faCheck : faTimes}
                  className="me-2"
                />
                Temperatur
              </Button>

              <Button
                variant={settings.showWind ? "primary" : "outline-secondary"}
                onClick={() => toggleSetting("showWind")}
                className="d-flex align-items-center"
              >
                <FontAwesomeIcon
                  icon={settings.showWind ? faCheck : faTimes}
                  className="me-2"
                />
                Vind
              </Button>

              <Button
                variant={
                  settings.showCondition ? "primary" : "outline-secondary"
                }
                onClick={() => toggleSetting("showCondition")}
                className="d-flex align-items-center"
              >
                <FontAwesomeIcon
                  icon={settings.showCondition ? faCheck : faTimes}
                  className="me-2"
                />
                Väderförhållande
              </Button>
            </div>
          </Col>

          <Col xs={12} md={3} className="mt-3 mt-md-0">
            <Form.Select
              value={settings.selectedLocation.name}
              onChange={handleLocationChange}
              aria-label="Välj plats"
            >
              {defaultLocations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default WeatherSettingsBar;
