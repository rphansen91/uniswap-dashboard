import React, { FC, useState } from "react";
import {
  NavigationDrawer,
  NavigationDrawerContext,
} from "../Drawers/Navigation";
import { AccountDrawer, AccountDrawerContext } from "../Drawers/Account";
import {
  ConnectAccountDialog,
  ConnectAccountDialogContext,
} from "../../providers/Web3/Connect";
import Box from "@material-ui/core/Box";
import { useToastContext, ErrorBoundary } from "../Toast";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const MainLayout: FC = ({ children }) => {
  const theme = useTheme();
  const connect = useState(false);
  const navigation = useState(false);
  const account = useState(false);
  const { setAlert } = useToastContext();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <ConnectAccountDialogContext.Provider value={connect}>
      <NavigationDrawerContext.Provider value={navigation}>
        <AccountDrawerContext.Provider value={account}>
          <NavigationDrawer variant={matches ? "permanent" : "temporary"} />
          <Box
            position="relative"
            style={{
              marginLeft: matches ? 250 : 0,
              marginRight: matches ? 350 : 0,
            }}
          >
            <ErrorBoundary
              fallback={() => null}
              onError={(e) =>
                setAlert({
                  severity: "error",
                  content: e.message,
                })
              }
            >
              {children}
            </ErrorBoundary>
            {/* <BottomNav /> */}
            {/* {matches ? null : <BottomNav />} */}
          </Box>
          <AccountDrawer variant={matches ? "permanent" : "temporary"} />
          <ConnectAccountDialog />
        </AccountDrawerContext.Provider>
      </NavigationDrawerContext.Provider>
    </ConnectAccountDialogContext.Provider>
  );
};
