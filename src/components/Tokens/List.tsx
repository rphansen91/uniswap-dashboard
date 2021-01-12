import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  isUniswapSymbol,
  IUniswapInfo,
  loadUniswapPairInfo,
} from "../../providers/Uniswap";
import {
  IToken,
  useWeb3Addresses,
  useWeb3AddressInfo,
  weiBalance,
  usdBalance,
} from "../../providers/Web3";
import { AddressAvatar, TokenAvatar } from "../Avatar";
import { n } from "../../utils/number";

export const TokensList = ({ card }: { card?: boolean }) => {
  const { data, loading, error } = useWeb3AddressInfo();
  const list = (
    <List>
      {(data?.tokens ?? []).map((token) => (
        <Box key={token.tokenInfo.address}>
          <TokenListItem token={token} />
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

const TokenListItem = ({ token }: { token: IToken }) => {
  return (
    <ListItem
      button
      component={Link}
      to={`/token/${token.tokenInfo.address.toLowerCase()}`}
    >
      <ListItemAvatar>
        <Avatar
          src={`${
            process.env.PUBLIC_URL
          }/assets/tokens/${token.tokenInfo.address.toLowerCase()}.png`}
        >
          <AddressAvatar diameter={34} address={token.tokenInfo.address} />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={token.tokenInfo.name}
        secondary={token.tokenInfo.symbol}
        primaryTypographyProps={{ noWrap: true }}
        secondaryTypographyProps={{ noWrap: true }}
      />
      <Box pl={1}>
        <TokenListItemSecondaryAction token={token} />
      </Box>
    </ListItem>
  );
};

export const TokenListItemSecondaryAction = ({ token }: { token: IToken }) => {
  const [from] = useWeb3Addresses();
  const [pairInfo, setPairInfo] = useState<IUniswapInfo | null>(null);

  useEffect(() => {
    if (isUniswapSymbol(token.tokenInfo.symbol)) {
      loadUniswapPairInfo(token.tokenInfo.address, from)
        .then((info) => setPairInfo(info))
        .catch((e) => console.error(`${token.tokenInfo.symbol} Error`, e));
    }
  }, [token, from]);

  return isUniswapSymbol(token.tokenInfo.symbol) ? (
    pairInfo ? (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
        <Box
          mb={1}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography style={{ marginRight: 4 }}>
            {n((pairInfo.balance / pairInfo.totalSupply) * pairInfo.reserve0)}
          </Typography>
          <TokenAvatar address={pairInfo.token0} />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Typography style={{ marginRight: 4 }}>
            {n((pairInfo.balance / pairInfo.totalSupply) * pairInfo.reserve1)}
          </Typography>
          <TokenAvatar address={pairInfo.token1} />
        </Box>
      </Box>
    ) : null
  ) : (
    <Box textAlign="right">
      <Typography>{n(weiBalance(token))}</Typography>
      <Typography>{usdBalance(token)}</Typography>
    </Box>
  );
};

export default TokensList;
