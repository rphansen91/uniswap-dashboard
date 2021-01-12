import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import OpacityIcon from "@material-ui/icons/Opacity";
import ReceiptIcon from "@material-ui/icons/Receipt";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { AccountBlocky } from "../../providers/Web3/Account";
import CoinsIcon from "../Icons/Coins";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export function BottomNav() {
  const classes = useStyles();
  const { push } = useHistory();
  const { pathname } = useLocation();

  const values: { [path: string]: number } = {
    "/": 0,
    "/tx": 1,
    "/uniswap": 2,
  };
  const links = [
    { to: "/", label: "Tokens", icon: <CoinsIcon /> },
    { to: "/tx", label: "Transactions", icon: <ReceiptIcon /> },
    { to: "/uniswap", label: "Liquidity", icon: <OpacityIcon /> },
  ];

  return (
    <>
      <BottomNavigation
        value={values[pathname] ?? 0}
        className={classes.root}
        onChange={(event, newValue) => {
          push(links[newValue].to);
        }}
        showLabels
      >
        <Box style={{ transform: `scale(1.5) translateY(-40%)` }}>
          <AccountBlocky />
        </Box>
        {/* {links.map(({ label, icon }) => (
          <BottomNavigationAction label={label} icon={icon} />
        ))} */}
      </BottomNavigation>
      <Toolbar />
    </>
  );
}
