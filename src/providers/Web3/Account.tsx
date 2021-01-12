import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import { useConnectAccountDialogContext } from "./Connect";
import React, { useMemo, useState } from "react";
import {
  getNetworkColor,
  useWeb3Addresses,
  useWeb3Chain,
  useWeb3Network,
} from "./";
import { AddressAvatar } from "../../components/Avatar";

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

export const AccountField = () => {
  const [account] = useWeb3Addresses();
  const [open, setOpen] = useConnectAccountDialogContext();
  const value = useMemo(() => {
    if (!account) return "";
    return account.slice(0, 8).concat("...").concat(account.slice(-8));
  }, [account]);
  return (
    <ButtonBase onClick={() => setOpen(true)} style={{ flex: 1 }}>
      <TextField
        variant="outlined"
        value={value}
        size="small"
        fullWidth
        disabled
      />
    </ButtonBase>
  );
};

export const AccountBlocky = () => {
  const chain = useWeb3Chain();
  const network = useWeb3Network();
  const [account] = useWeb3Addresses();
  const classes = useNetworkStyle({ chain });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useConnectAccountDialogContext();
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    // if (account) {
    //   setAnchorEl(event.currentTarget);
    // } else {
    setOpen(true);
    // }
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
        onClose={() => setAnchorEl(null)}
        onChange={() => setOpen(true)}
      />
    </>
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
