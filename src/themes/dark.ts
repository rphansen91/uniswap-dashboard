import { createMuiTheme } from "@material-ui/core/styles";

export const dark = createMuiTheme({
  palette: {
    type: "dark",
    background: {
      // default: '#c5c3c6',
      paper: '#46494c'
    },
    primary: {
      main: '#1985a1'
    },
    secondary: {
      main: '#4c5c68'
    }
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});
