import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import CardContent from "@material-ui/core/CardContent";
import {
  IToken,
  useWeb3Addresses,
  useWeb3AddressInfo,
  weiBalance,
  usdBalance,
} from "../../providers/Web3";
import ListItemText from "@material-ui/core/ListItemText";
import LinearProgress from "@material-ui/core/LinearProgress";
import { TokenAvatar } from "../Avatar";

export const TokenCards = () => {
  const { data, loading, error } = useWeb3AddressInfo();

  if (loading) return <LinearProgress />;
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {(data?.tokens ?? []).map((token) => (
          <Grid key={token.tokenInfo.address} md={4} sm={12} item>
            <TokenCard token={token} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export const TokenCard = ({ token }: { token: IToken }) => {
  return (
    <Card>
      <ListItem>
        <ListItemAvatar>
          <TokenAvatar address={token.tokenInfo.address} size={60} />
        </ListItemAvatar>
        <ListItemText
          primary={token.tokenInfo.symbol}
          secondary={token.tokenInfo.name}
          primaryTypographyProps={{ noWrap: true, style: { paddingLeft: 8 } }}
          secondaryTypographyProps={{ noWrap: true, style: { paddingLeft: 8 } }}
        />
      </ListItem>
      <CardContent></CardContent>
    </Card>
  );
};

export default TokenCards;
