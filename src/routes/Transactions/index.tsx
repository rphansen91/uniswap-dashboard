import React from "react";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { TransactionsList } from "../../components/Transactions/List";
import { MainNavBar } from "../../components/Navbar";

export const Transactions = () => {
  return (
    <Box>
      <MainNavBar>
        <Typography variant="h4">Transactions</Typography>
      </MainNavBar>
      <Divider />
      <TransactionsList card={true} />
    </Box>
  );
};

export default Transactions;
