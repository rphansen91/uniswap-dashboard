import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { AddressAvatar, TokenAvatar } from "../Avatar";
import Paper from "@material-ui/core/Paper";
import {
  loadUniswapPairInfo,
  IUniswapInfo,
  isUniswapSymbol,
} from "../../providers/Uniswap";
import React, { useEffect, useState } from "react";
import {
  useWeb3AddressInfo,
  weiBalance,
  usdBalance,
  IToken,
  useWeb3Addresses,
} from "../../providers/Web3";

export const TokensTable = () => {
  const { data, loading, error } = useWeb3AddressInfo();
  return (
    <Paper>
    <Box maxWidth="100%" overflow="auto">
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>Symbol</Typography>
          </TableCell>
          <TableCell align="right">
            <Typography>Token</Typography>
          </TableCell>
          <TableCell align="right">
            <Typography>Balance</Typography>
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
        {(data?.tokens ?? []).map((token) => (
          <TokenRow key={token.tokenInfo.address} token={token} />
        ))}
      </TableBody>
    </Table>
    </Box>
    </Paper>
  );
};

const TokenRow = ({ token }: { token: IToken }) => {
  const [from] = useWeb3Addresses();
  const [pairInfo, setPairInfo] = useState<IUniswapInfo | null>(null);

  useEffect(() => {
    if (isUniswapSymbol(token.tokenInfo.symbol)) {
      loadUniswapPairInfo(token.tokenInfo.address, from)
        .then((info) => setPairInfo(info))
        .catch((e) => console.error(`${token.tokenInfo.symbol} Error`, e));
    }
  }, [token, from]);

  return (
    <TableRow hover>
      <TableCell>
        <Box display="flex" alignItems="center">
          <Box mr={1}>
            <Avatar
              src={`${
                process.env.PUBLIC_URL
              }/assets/tokens/${token.tokenInfo.address.toLowerCase()}.png`}
            >
              <AddressAvatar diameter={34} address={token.tokenInfo.address} />
            </Avatar>
          </Box>
          <Typography>{token.tokenInfo.symbol}</Typography>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Typography>{token.tokenInfo.name}</Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>{weiBalance(token)}</Typography>
      </TableCell>
      <TableCell align="right">
        {isUniswapSymbol(token.tokenInfo.symbol) ? (
          pairInfo ? (
            <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="flex-end">
              <Box mb={1} display="flex" alignItems="center" justifyContent="flex-end">
                <Typography style={{ marginRight: 4 }}>{(pairInfo.balance / pairInfo.totalSupply * pairInfo.reserve0).toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                  minimumFractionDigits: 4
                })}</Typography>
                <TokenAvatar address={pairInfo.token0} />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <Typography style={{ marginRight: 4 }}>{(pairInfo.balance / pairInfo.totalSupply * pairInfo.reserve1).toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                  minimumFractionDigits: 4
                })}</Typography>
                <TokenAvatar address={pairInfo.token1} />
              </Box>
            </Box>
          ) : null
        ) : (
          <Typography>{usdBalance(token)}</Typography>
        )}
      </TableCell>
    </TableRow>
  );
};
