import { render } from "preact";
import App from "./App.jsx";

import "./reset.css";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  render(<App />, rootElement);
}
