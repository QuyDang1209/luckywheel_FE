import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StateProvider } from "./util/Hook/StoreHook";
import MainApp from "./MainApp";

const MOUNT_NODE = document.getElementById("root");
const render = () => {
  ReactDOM.render(
    <StateProvider>
      <StrictMode>
        <MainApp />
      </StrictMode>
    </StateProvider>,
    MOUNT_NODE
  );
};

render();

reportWebVitals();
