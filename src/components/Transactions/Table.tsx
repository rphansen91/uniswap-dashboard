import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import LinearProgress from "@material-ui/core/LinearProgress";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import { AddressAvatar } from "../Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import React from "react";
import { useWeb3AddressTransactions, ITransaction } from "../../providers/Web3";

export const TransactionsTable = () => {
  const { data, loading, error } = useWeb3AddressTransactions();
  return (
    <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>From</Typography>
          </TableCell>
          <TableCell>
            <Typography>To</Typography>
          </TableCell>
          <TableCell align="right">
            <Typography>Value</Typography>
          </TableCell>
        </TableRow>
        {loading ? <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={3}>
            <LinearProgress />
          </TableCell>
        </TableRow>: null}
      </TableHead>
      <TableBody>
        {(data || []).map((tx) => (
          <TransactionRow key={tx.hash} tx={tx} />
        ))}
      </TableBody>
    </Table>
    </Paper>
  );
};

const TransactionRow = ({ tx }: { tx: ITransaction }) => {
  return (
    <TableRow hover>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Box mr={1}>
            <Tooltip title={<Typography>{tx.from}</Typography>}>
              <Avatar>
                <AddressAvatar diameter={34} address={tx.from} />
              </Avatar>
            </Tooltip>
          </Box>
          <Hidden mdDown>
            <Typography>{tx.from}</Typography>
          </Hidden>
        </Box>
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Box mr={1}>
            <Tooltip title={<Typography>{tx.to}</Typography>}>
              <Avatar>
                <AddressAvatar diameter={34} address={tx.to} />
              </Avatar>
            </Tooltip>
          </Box>
          <Hidden smDown>
            <Typography>{tx.to}</Typography>
          </Hidden>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Typography>{tx.value} ETH</Typography>
      </TableCell>
    </TableRow>
  );
};
