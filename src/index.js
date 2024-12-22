import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";

const engine = new Styletron();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <div>
        <App />
      </div>
    </StyletronProvider>
  </React.StrictMode>
);
