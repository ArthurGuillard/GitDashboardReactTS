import React, {useContext, useRef, useState} from "react";
import {makeStyles} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import {SearchHistoryContext, SearchHistoryContextType} from "../context/SearchHistoryContext";
import {GHRSearchHistory} from "./GHRSearchHistory";
import {History} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    }
}}));

export const GHRAppBar = () => {
  const anchorElHistory = useRef(null);
  const [openSearchHistory, setOpenSearchHistory] = useState(false);
  const {state : searchHistoryState} = useContext<SearchHistoryContextType>(SearchHistoryContext);
  const classes = useStyles();

  const handleHistoryClick = () => {
    setOpenSearchHistory(!openSearchHistory);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            GitHub Dashboard
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton buttonRef={anchorElHistory} aria-label="number of github searches" color="inherit">
              <Badge badgeContent={searchHistoryState.history.length} color="secondary">
                <History onClick={handleHistoryClick}/>
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
        <GHRSearchHistory  open={openSearchHistory} anchorEl={anchorElHistory} history={searchHistoryState.history}/>
      </AppBar>
    </div>
  );
};