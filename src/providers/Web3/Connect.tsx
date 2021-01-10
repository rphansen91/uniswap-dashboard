import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import {
  web3,
  enableEthereum,
  useWeb3SetStoredAddress,
} from "../../providers/Web3";

export const ConnectAccountDialog = ({
  open,
  onClose,
  onError,
}: {
  open: boolean;
  onClose: () => any;
  onError: (error: string) => any;
}) => {
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
        <ConnectAccount onClose={onClose} onError={onError} />
      </DialogContent>
    </Dialog>
  );
};

export const ConnectAccount = ({
    onClose,
    onError,
  }: {
    onClose?: () => any;
    onError?: (error: string) => any;
  }) => {
  const setStoredAddress = useWeb3SetStoredAddress();
  const [value, setValue] = useState("");
  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    if (value) {
      setStoredAddress(value);
    }
  };
  const handleConnectEthereum = () => {
    enableEthereum()
      .then(() => web3.eth.getAccounts())
      .then(([address]) => setStoredAddress(address))
      .then(() => onClose?.())
      .catch((e: any) => onError?.(e.message));
  };
  return (
    <>
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
      <Box mb={2}>
        <Button
          fullWidth
          onClick={handleConnectEthereum}
          variant="contained"
          color="secondary"
        >
          Connect With Metamask
        </Button>
      </Box>
    </>
  );
};
