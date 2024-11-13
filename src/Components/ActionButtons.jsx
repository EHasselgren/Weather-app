import { Button } from "react-bootstrap";

export const ActionButtons = () => (
  <div className="button-group">
        <Button variant="primary" onClick={() => window.location.reload()}>
      Uppdatera
    </Button>
    <Button
      variant="light"
      onClick={() => window.open("https://www.smhi.se/", "_blank")}
    >
      SMHI
    </Button>
    <Button
      variant="info"
      onClick={() => alert("Weather data from SMHI API")}
    >
      Info
    </Button>
  </div>
);