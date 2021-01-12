import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer, {
  SwipeableDrawerProps,
} from "@material-ui/core/SwipeableDrawer";
import Toolbar from "@material-ui/core/Toolbar";
import React, { createContext, useContext, Dispatch, SetStateAction } from "react";
import { AccountBlocky, AccountField } from "../../providers/Web3/Account";
import { TokensList } from "../Tokens/List";

export const AccountDrawerContext = createContext<null|[boolean, Dispatch<SetStateAction<boolean>>]>(null)
export const useAccountDrawerContext = () => {
  const ctx = useContext(AccountDrawerContext)
  if (!ctx) throw new Error(`AccountDrawerProvider not found in tree`)
  return ctx
}


const useStyles = makeStyles(theme => ({
  bar: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    justifyContent: "flex-end"
  },
  list: {
    width: 350,
  },
}));

const anchor = "right";
interface DrawerProps {
  variant?: SwipeableDrawerProps["variant"];
}

export function AccountDrawer({ variant }: DrawerProps) {
  const [open, setOpen] = useAccountDrawerContext()
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
        <Toolbar className={classes.bar}>
          <AccountField />
          <AccountBlocky />
        </Toolbar>
        <Divider />
        <TokensList />
      </div>
    </SwipeableDrawer>
  );
}
