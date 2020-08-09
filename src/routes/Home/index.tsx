import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import React, { FC, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { UniswapApolloProvider } from "../../providers/Uniswap/client";
import { MainLayout } from "../../components/Layout/Main";
import { TokensTable } from "../../components/Tokens/Table";
import { TransactionsTable } from "../../components/Transactions/Table";
import Slide from "@material-ui/core/Slide";
import CoinsIcon from "../../components/Icons/Coins";
import ReceiptIcon from "@material-ui/icons/Receipt";
import OpacityIcon from "@material-ui/icons/Opacity";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { UniswapLiquidityProviderHistory } from "../Uniswap"

const useStyles = makeStyles((theme: Theme) => createStyles({
  tabRoot: {
    minHeight: "inherit",
  },
  tab: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  padding: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
  }
}));

export const Home = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  return (
    <MainLayout>
      <Box pt={1} pb={5}>
        <Grid container>
          <Grid item xs={12}>
            <Box mb={1} className={classes.padding}>
              <Tabs
                value={tab}
                onChange={(ev, value) => setTab(value)}
                aria-label="Uniswap Dashboard Tabs"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab
                  label={<Typography style={{ marginBottom: 4 }}>Tokens</Typography>}
                  icon={<CoinsIcon style={{ marginRight: 6, marginBottom: 4 }} />}
                  classes={{ root: classes.tabRoot, wrapper: classes.tab }}
                />
                <Tab
                  label={<Typography style={{ marginBottom: 4 }}>Transactions</Typography>}
                  icon={<ReceiptIcon style={{ marginRight: 6, marginBottom: 4 }} />}
                  classes={{ root: classes.tabRoot, wrapper: classes.tab }}
                />
                <Tab
                  label={<Typography style={{ marginBottom: 4 }}>Liquidity</Typography>}
                  icon={<OpacityIcon style={{ marginRight: 6, marginBottom: 4 }} />}
                  classes={{ root: classes.tabRoot, wrapper: classes.tab }}
                />
              </Tabs>
              <Divider />
            </Box>
            <TabPanel activeTab={tab} index={0}>
              {tab === 0 ? (
                <Box className={classes.padding}>
                  <TokensTable />
                </Box>
              ) : null}
            </TabPanel>
            <TabPanel activeTab={tab} index={1}>
              {tab === 1 ? (
                <Box className={classes.padding}>
                  <TransactionsTable />
                </Box>
              ) : null}
            </TabPanel>
            <TabPanel activeTab={tab} index={2}>
              {tab === 2 ? (
                <Box px={3}>
                  <UniswapApolloProvider>
                    <UniswapLiquidityProviderHistory />
                  </UniswapApolloProvider>
                </Box>
              ) : null}
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </MainLayout>
  );
};

const TabPanel: FC<{ activeTab: number, index: number }> = ({ activeTab, index, children }) => {
  return (
    <Slide in={activeTab === index} direction={activeTab < index ? "left" : "right"}>
      <Box
        position={activeTab === index ? "relative" : "absolute"}
        style={{ opacity: activeTab === index ? 1 : 0 }}
      >
        {children}
      </Box>
    </Slide>
  );
};

export default Home;
