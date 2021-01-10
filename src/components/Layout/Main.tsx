import React, { FC, useState } from "react";
import { PrimarySearchAppBar } from "../Navbar";
import { Drawer } from "../Drawer";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export const MainLayout: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Drawer
        open={open}
        setOpen={setOpen}
        variant={matches ? "permanent" : "temporary"}
      />
      <Box style={{ marginLeft: matches ? 250 : 0 }}>
        <PrimarySearchAppBar onClick={matches ? undefined : () => setOpen(true)} />
        <Divider />
        {children}
      </Box>
    </>
  );
};
