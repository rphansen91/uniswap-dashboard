import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import GitHubIcon from "@material-ui/icons/GitHub";
import MenuIcon from "@material-ui/icons/Menu";
import React, { FC, ReactNode } from "react";
import { AccountBlocky } from "../../providers/Web3/Account";
import { useNavigationDrawerContext } from "../Drawers/Navigation";
import { HodlStreamIcon } from "../Icons/HodlStream";
import { useTheme } from "@material-ui/core/styles";

export const MainNavBar: FC<{
  action?: ReactNode;
}> = ({ children, action }) => {
  const theme = useTheme()
  const setOpen = useNavigationDrawerContext()[1];
  return (
    <Box position="sticky" top={0} zIndex={1} bgcolor={theme.palette.background.default} style={{
      borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
      paddingBottom: 1
    }}>
      <Toolbar>
        <Hidden mdUp>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        {children}
        <Box flexGrow={1} />
        {action}
        <Hidden mdUp>
          <AccountBlocky />
        </Hidden>
      </Toolbar>
    </Box>
  );
};

export const SourceCodeActionIcon = () => (
  <Tooltip title={<Typography>View Source Code</Typography>}>
    <IconButton
      color="inherit"
      component={Link}
      href="https://github.com/rphansen91/uniswap-dashboard"
      target="_blank"
      rel="noreferrer noopener"
    >
      <GitHubIcon />
    </IconButton>
  </Tooltip>
);
