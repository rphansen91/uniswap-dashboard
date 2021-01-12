import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from "@material-ui/core/SwipeableDrawer";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import OpacityIcon from "@material-ui/icons/Opacity";
import ReceiptIcon from "@material-ui/icons/Receipt";
import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import CoinsIcon from "../Icons/Coins";
import { HodlStreamIcon } from "../Icons/HodlStream";

export const NavigationDrawerContext = createContext<null|[boolean, Dispatch<SetStateAction<boolean>>]>(null)
export const useNavigationDrawerContext = () => {
  const ctx = useContext(NavigationDrawerContext)
  if (!ctx) throw new Error(`NavigationDrawerProvider not found in tree`)
  return ctx
}

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const anchor = "left";
interface DrawerProps {
  variant?: SwipeableDrawerProps["variant"];
}

export function NavigationDrawer({ variant }: DrawerProps) {
  const [open, setOpen] = useNavigationDrawerContext()
  const classes = useStyles();

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      variant={variant}
      color="main"
    >
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Toolbar>
          <HodlStreamIcon
            style={{ height: 24, width: 24, marginRight: 8, borderRadius: 4 }}
          />
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem component={NavLink} to="/" exact button>
            <ListItemIcon>
              <CoinsIcon style={{ marginRight: 6, marginBottom: 4 }} />
            </ListItemIcon>
            <ListItemText primary="Tokens" />
          </ListItem>
          <ListItem component={NavLink} to="/tx" button>
            <ListItemIcon>
              <ReceiptIcon style={{ marginRight: 6, marginBottom: 4 }} />
            </ListItemIcon>
            <ListItemText primary="Transactions" />
          </ListItem>
          <ListItem component={NavLink} to="/uniswap" button>
            <ListItemIcon>
              <OpacityIcon style={{ marginRight: 6, marginBottom: 4 }} />
            </ListItemIcon>
            <ListItemText primary="Liquidity" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem component={NavLink} to="/about" button>
            <ListItemIcon>
              <InboxIcon style={{ marginRight: 6, marginBottom: 4 }} />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <Tooltip title={<Typography>View Source Code</Typography>}>
            <ListItem
              component={Link}
              button
              href="https://github.com/rphansen91/uniswap-dashboard"
              target="_blank"
              rel="noreferrer noopener"
              color="inherit"
            >
              <ListItemIcon>
                <GitHubIcon style={{ marginRight: 6, marginBottom: 4 }} />
              </ListItemIcon>
              <ListItemText primary="Source Code" />
            </ListItem>
          </Tooltip>
        </List>
      </div>
    </SwipeableDrawer>
  );
}
