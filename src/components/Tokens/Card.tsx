import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Link } from "react-router-dom";
import { IToken, useWeb3AddressInfo } from "../../providers/Web3";
import { TokenAvatar } from "../Avatar";
import { TokenListItemSecondaryAction } from "./List";

export const TokenCards = () => {
  const { data, loading, error } = useWeb3AddressInfo();

  if (loading) return <LinearProgress />;
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {(data?.tokens ?? []).map((token) => (
          <Grid key={token.tokenInfo.address} xs={12} item>
            <TokenCard token={token} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export const TokenCard = ({ token }: { token: IToken }) => {
  return (
    <ButtonBase style={{ width: "100%" }} component={Link} to={`/token/${token.tokenInfo.address.toLowerCase()}`}>
      <Card style={{ width: "100%" }}>
        <ListItem>
          <ListItemAvatar>
            <TokenAvatar address={token.tokenInfo.address} size={60} />
          </ListItemAvatar>
          <ListItemText
            primary={token.tokenInfo.symbol}
            secondary={token.tokenInfo.name}
            primaryTypographyProps={{ noWrap: true, style: { paddingLeft: 8 } }}
            secondaryTypographyProps={{
              noWrap: true,
              style: { paddingLeft: 8 },
            }}
          />
          <Box pl={1}>
            <TokenListItemSecondaryAction token={token} />
          </Box>
        </ListItem>
        {/* <CardContent></CardContent> */}
      </Card>
    </ButtonBase>
  );
};

export default TokenCards;
