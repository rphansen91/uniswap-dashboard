import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { ITransaction, useWeb3AddressTransactions } from "../../providers/Web3";
import { AddressAvatar } from "../Avatar";

export const TransactionsList = ({ card }: { card?: boolean }) => {
  const { data, loading, error } = useWeb3AddressTransactions();
  const list = (
    <List>
      {(data || []).map((tx) => (
        <Box key={tx.hash}>
          <TransactionListItem tx={tx} />
          <Divider />
        </Box>
      ))}
    </List>
  );
  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : card ? (
        <Box p={2} pb={5}>
          <Paper>{list}</Paper>
        </Box>
      ) : (
        list
      )}
    </>
  );
};

const TransactionListItem = ({ tx }: { tx: ITransaction }) => {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Tooltip title={<Typography>{tx.from}</Typography>}>
          <Avatar>
            <AddressAvatar diameter={34} address={tx.from} />
          </Avatar>
        </Tooltip>
      </ListItemAvatar>
      <ListItemAvatar>
        <Tooltip title={<Typography>{tx.from}</Typography>}>
          <Avatar>
            <AddressAvatar diameter={34} address={tx.to} />
          </Avatar>
        </Tooltip>
      </ListItemAvatar>
      <ListItemText
        primary={tx.from}
        secondary={tx.to}
        primaryTypographyProps={{ noWrap: true }}
        secondaryTypographyProps={{ noWrap: true }}
      />
      <ListItemSecondaryAction>
        <Typography>{tx.value} ETH</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TransactionsList;
