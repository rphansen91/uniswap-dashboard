import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import MomentUtils from "@date-io/moment";
import { ThemeProvider } from "./themes";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./providers/Web3";
import "./index.css";
import {
  estimateBlocksTilNextMasternodeRewards,
  getBalances,
  mapValues,
} from "./providers/Energi/api";
import { ToastProvider } from "./components/Toast";

const address = "0x6ca67362d28eeb8d1d845d26daad1db5a598d82a";

// estimateBlocksTilNextMasternodeRewards(address)
// .then(values => mapValues(values, (estimate) => ({
//   ...estimate,
//   estimatedTime: estimate.estimatedTime.toLocaleString(),
//   estimatedTimeUntil: estimate.estimatedTime.fromNow(),
// })))
// .then((estimates) => console.table(estimates))

// getBalances(address).then(balances => console.table(balances))

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ToastProvider>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToastProvider>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
