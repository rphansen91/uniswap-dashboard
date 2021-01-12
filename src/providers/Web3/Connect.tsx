import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import React, {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import {
  web3,
  enableEthereum,
  useWeb3SetStoredAddress,
} from "../../providers/Web3";
import { useToastContext } from "../../components/Toast";

export const ConnectAccountDialogContext = createContext<
  null | [boolean, Dispatch<SetStateAction<boolean>>]
>(null);
export const useConnectAccountDialogContext = () => {
  const ctx = useContext(ConnectAccountDialogContext);
  if (!ctx) throw new Error(`ConnectAccountDialogProvider not found in tree`);
  return ctx;
};

export const ConnectAccountDialog = () => {
  const [open, setOpen] = useConnectAccountDialogContext()
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <CardHeader
        title="Add Address or Connect Metamask"
        action={
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        }
      />
      <Divider />
      <DialogContent>
        <ConnectAccount />
      </DialogContent>
    </Dialog>
  );
};

export const ConnectAccount = () => {
  const setOpen = useConnectAccountDialogContext()[1]
  const { setAlert } = useToastContext()
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
      .then(() => setOpen?.(false))
      .catch((e: any) => {
        console.error('Handle', e)
        setAlert({ severity: 'error', content: e.message })
      });
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
