import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Tooltip from "@material-ui/core/Tooltip";
import TwitterIcon from "@material-ui/icons/Twitter";
import WebIcon from "@material-ui/icons/Web";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import { fetchTokenInfoResource, IToken } from "../../providers/Web3";
import { TokenAvatar } from "../Avatar";
import { TokenListItemSecondaryAction } from "./List";
import { MainNavBar } from "../Navbar";
import { Typography } from "@material-ui/core";

export const TokenDetail = () => {
  const theme = useTheme();
  const match = useRouteMatch<{ address: string }>();
  const token = fetchTokenInfoResource.useResource(match.params.address);
  if (!token?.tokenInfo) throw new Error("Address not found");

  return (
    <Box
      bgcolor={theme.palette.background.default}
      style={{
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
      }}
    >
      <MainNavBar
        action={
          <>
            {token?.tokenInfo?.twitter ? (
              <Box ml={1}>
                <Tooltip title={<Typography>Website</Typography>}>
                  <IconButton
                    href={token?.tokenInfo?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                  >
                    <WebIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : null}
            {token?.tokenInfo?.twitter ? (
              <Box ml={1}>
                <Tooltip title={<Typography>Twitter</Typography>}>
                  <IconButton
                    href={token?.tokenInfo?.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    component="a"
                  >
                    <TwitterIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : null}
          </>
        }
      >
        <ListItemAvatar>
          <TokenAvatar address={token.tokenInfo.address} size={40} />
        </ListItemAvatar>
        <ListItemText
          primary={token?.tokenInfo?.symbol}
          secondary={token?.tokenInfo?.name}
          primaryTypographyProps={{ noWrap: true }}
          secondaryTypographyProps={{
            noWrap: true,
          }}
        />
      </MainNavBar>
      <CardContent></CardContent>
    </Box>
  );
};
