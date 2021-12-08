import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

import { store } from "./store";

import "@fontsource/mali/latin-300.css";
import "@fontsource/mali/latin-500.css";
import "@fontsource/mali/latin-700.css";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
