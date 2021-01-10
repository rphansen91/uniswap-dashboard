import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from "@material-ui/core/SwipeableDrawer";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Toolbar from "@material-ui/core/Toolbar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { HodlStreamIcon } from "../Icons/HodlStream";
import { NavLink } from "react-router-dom";
import CoinsIcon from "../../components/Icons/Coins";
import ReceiptIcon from "@material-ui/icons/Receipt";
import OpacityIcon from "@material-ui/icons/Opacity";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

type Anchor = "top" | "left" | "bottom" | "right";
const anchor = "left";
interface DrawerProps {
  open: boolean;
  setOpen: (v: boolean) => any;
  variant?: SwipeableDrawerProps["variant"];
}

export function Drawer({ open, setOpen, variant }: DrawerProps) {
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

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
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
  );

  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      variant={variant}
      color="main"
    >
      {list(anchor)}
    </SwipeableDrawer>
  );
}
