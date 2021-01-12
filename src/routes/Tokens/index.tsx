import React from "react";
import { Switch, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { TokenCards } from "../../components/Tokens/Card"
import { TokenDetail } from "../../components/Tokens/Detail"
import { MainNavBar } from "../../components/Navbar";

export const Tokens = () => {
  return (
    <Box>
      <MainNavBar>
        <Typography variant="h4">Token</Typography>
      </MainNavBar>
      <Divider />
      <TokenCards />
      <Switch>
        <Route path="/token/:address" component={TokenDetail} />
      </Switch>
    </Box>
  );
};

export default Tokens;
