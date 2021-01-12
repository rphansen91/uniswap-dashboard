import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { MainNavBar, SourceCodeActionIcon } from "../../components/Navbar";

export const About = () => {
  return (
    <Box>
      <MainNavBar action={<SourceCodeActionIcon />}>
        <Typography variant="h4">About</Typography>
      </MainNavBar>
      <Divider />
    </Box>
  );
};

export default About;
