import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import GitHubIcon from "@material-ui/icons/GitHub";
import Alert from "@material-ui/lab/Alert";
import { HodlStreamIcon } from "../Icons/HodlStream";
import React, { useRef, useState } from "react";
import {
  enableEthereum,
  getNetworkColor,
  useWeb3Addresses,
  useWeb3Chain,
  useWeb3Network,
  useWeb3ResetStoredAddress,
  useWeb3SetStoredAddress,
  web3,
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
      <HodlStreamIcon style={{ height: 24, width: 24, marginRight: 8, borderRadius: 4 }} />
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
          <Tooltip title={<Typography>View Source Code</Typography>}>
            <IconButton
              color="inherit"
              component={Link}
              href="https://github.com/rphansen91/uniswap-dashboard"
              target="_blank"
              rel="noreferrer noopener"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
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
  const setStoredAddress = useWeb3SetStoredAddress();
  const resetStoredAddress = useWeb3ResetStoredAddress();
  const error = useRef("");
  const [connectAccount, setConnectAccount] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (account) {
      setAnchorEl(event.currentTarget);
    } else {
      setConnectAccount(true);
    }
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  const handleCloseAccount = () => {
    setConnectAccount(false);
  };
  const handleSetStoredAddress = (value: string) => {
    setStoredAddress(value);
  };
  const handleConnectEthereum = () => {
    enableEthereum()
      .then(() => web3.eth.getAccounts())
      .then(([address]) => resetStoredAddress(address))
      .catch((e: any) => {
        error.current = e.message;
        setErrorOpen(true);
      });
  };
  const render = account ? (
    <Tooltip title={<Typography>{`Connected to ${network}`}</Typography>}>
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
      <AccountMenu
        anchorEl={anchorEl}
        onClose={handleProfileMenuClose}
        onChange={() => setConnectAccount(true)}
      />
      <ConnectAccountDialog
        open={connectAccount}
        onClose={handleCloseAccount}
        onConnect={handleConnectEthereum}
        onSubmit={handleSetStoredAddress}
      />
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

const ConnectAccountDialog = ({
  open,
  onClose,
  onConnect,
  onSubmit,
}: {
  open: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => any;
  onConnect: (event: React.MouseEvent<HTMLElement>) => any;
  onSubmit: (value: string) => any;
}) => {
  const [value, setValue] = useState("");
  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    if (value) {
      onSubmit(value);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <CardHeader
        title="Add Address or Connect Metamask"
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
      />
      <Divider />
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Enter ETH Address"
              value={value}
              onChange={(ev) => setValue(ev.target.value)}
              fullWidth
              margin="normal"
            />
          </Box>
          <Box mb={2}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
        {onConnect ? (
          <Box mb={2}>
            <Button
              fullWidth
              onClick={onConnect}
              variant="contained"
              color="secondary"
            >
              Connect With Metamask
            </Button>
          </Box>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

const AccountMenu = ({
  anchorEl,
  onClose,
  onChange,
}: {
  anchorEl: null | HTMLElement;
  onClose: (event: React.MouseEvent<HTMLElement>) => any;
  onChange: (event: React.MouseEvent<HTMLElement>) => any;
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
      <MenuItem
        onClick={(ev) => {
          onChange(ev);
          onClose(ev);
        }}
      >
        Change Account
      </MenuItem>
    </Menu>
  );
};

const AccountAddress = () => {
  const [account] = useWeb3Addresses();
  if (!account) return null;
  return <>{account}</>;
};
