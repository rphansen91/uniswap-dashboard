import React, { FC } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card, { CardProps } from "@material-ui/core/Card";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
  })
);

export const DefaultColorCard: FC<CardProps> = ({ children }) => {
  const classes = useStyles();
  return <Card classes={{ root: classes.root }}>{children}</Card>;
};
