import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
// import { TokensTable } from "../../components/Tokens/Table";
import { TokensList } from "../../components/Tokens/List";
import { UniswapApolloProvider } from "../../providers/Uniswap/client";
import { UniswapLiquidityProviderHistory } from "../Uniswap";
import { ConnectAccount } from "../../providers/Web3/Connect";
import { useWeb3Addresses } from "../../providers/Web3";
import { Typography } from "@material-ui/core";

const TokenCards = lazy(() => import("../../components/Tokens/Card"));
const TransactionsList = lazy(
  () => import("../../components/Transactions/List")
);
const Uniswap = lazy(() => import("../Uniswap"));

export const Home = () => {
  const [account] = useWeb3Addresses();
  return (
    <Grid container>
      <Grid item xs={12} md={8}>
        <Box style={{ minHeight: "100vh" }}>
          <Suspense fallback={<LinearProgress />}>
            <Switch>
              <Route path="/" exact render={() => <TokenCards />} />
              <Route
                path="/tx"
                render={() => <TransactionsList card={true} />}
              />
              <Route
                path="/uniswap"
                render={() => (
                  <UniswapApolloProvider>
                    <UniswapLiquidityProviderHistory />
                  </UniswapApolloProvider>
                )}
              />
            </Switch>
          </Suspense>
        </Box>
      </Grid>
      <Grid item xs={12} md={4} square elevation={0} component={Paper}>
        {account ? (
          <TokensList />
        ) : (
          <Box p={2}>
            <Typography>Add Address or Connect Metamask</Typography>
            <ConnectAccount />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
