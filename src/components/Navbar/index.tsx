import { Avatar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Alert, { AlertProps } from "@material-ui/lab/Alert";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import UniswapIcon from "../../components/Icons/Uniswap";
import Snackbar from "@material-ui/core/Snackbar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import React, { useMemo, useState, useRef } from "react";
import {
  enableEthereum,
  getNetworkColor,
  useWeb3Addresses,
  useWeb3Chain,
  useWeb3Network,
} from "../../providers/Web3";
import { AddressAvatar } from "../Avatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      marginTop: 4,
      // display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

export function PrimarySearchAppBar({
  onClick,
}: {
  onClick?: (ev: any) => any;
}) {
  const classes = useStyles();

  return (
    <Toolbar>
      {/* <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={onClick}
      >
      </IconButton> */}
      <UniswapIcon style={{ height: 48, width: 48 }} />
      <Typography className={classes.title} variant="h6" noWrap>
        Uniswap Dashboard
      </Typography>
      {/* <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div> */}
      <div className={classes.grow} />
      <div className={classes.sectionDesktop}>
        <div>
        {/* <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton> */}
        <AccountBlocky />
        </div>
      </div>
      <div className={classes.sectionMobile}>
        <AccountBlocky />
      </div>
    </Toolbar>
  );
}

const useNetworkStyle = makeStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: ({ chain }: any) => getNetworkColor(chain),
      borderRadius: 8,
      height: 16,
      width: 16,
      border: `2px solid #757575`,
    },
  })
);

const AccountBlocky = () => {
  const chain = useWeb3Chain();
  const network = useWeb3Network();
  const [account] = useWeb3Addresses();
  const classes = useNetworkStyle({ chain });
  const error = useRef("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (account) {
      setAnchorEl(event.currentTarget);
    } else {
      enableEthereum().catch((e: any) => {
        error.current = e.message
        setErrorOpen(true)
      });
    }
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const render = account ? (
    <Tooltip title={`Connected to ${network}`}>
      <Badge
        overlap="circle"
        invisible={!network}
        classes={{ badge: classes.badge }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        variant="dot"
      >
        <Avatar>
          <AddressAvatar diameter={34} address={account} />
        </Avatar>
      </Badge>
    </Tooltip>
  ) : (
    <Tooltip title="Connect to Web3">
      <Avatar>
        <AddIcon />
      </Avatar>
    </Tooltip>
  );
  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        {render}
      </IconButton>
      <AccountMenu anchorEl={anchorEl} onClose={handleProfileMenuClose} />
      <Snackbar
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        autoHideDuration={6000}
      >
        <Alert severity="error">{error.current}</Alert>
      </Snackbar>
    </>
  );
};

const AccountMenu = ({
  anchorEl,
  onClose,
}: {
  anchorEl: null | HTMLElement;
  onClose: (event: React.MouseEvent<HTMLElement>) => any;
}) => {
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={onClose}
    >
      <MenuItem onClick={onClose}>
        <AccountAddress />
      </MenuItem>
      <MenuItem onClick={onClose}>My account</MenuItem>
    </Menu>
  );
};

const AccountAddress = () => {
  const [account] = useWeb3Addresses();
  if (!account) return null;
  return <>{account}</>;
};
