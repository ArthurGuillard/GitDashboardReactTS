import React from "react";
import Paper from "@material-ui/core/Paper";
import {GHRUserDataMiniCard} from "./GHRUserDataMiniCard";
import {makeStyles} from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import {SearchHistory} from "../context/SearchHistoryContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: '30em',
    maxHeight: '40em',
    padding: '1em',
    overflow: 'auto'
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

export const GHRSearchHistory = ({open, anchorEl, history} : { open : boolean, anchorEl : any, history : SearchHistory}) => {
  const classes = useStyles();
  return (
    <Popper open={open} anchorEl={anchorEl.current} placement="bottom-end" transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className={classes.root}>
            {
              history && history.length > 0 ?
                history.map((element) => (
                  <GHRUserDataMiniCard
                    key={element.timestamp}
                    userName={element.userName}
                    timestamp={element.timestamp}
                    avatarUrl={element.avatarUrl}
                    repositories={element.repositoriesList} />
                )) :
                <Typography className={classes.typography}>{'No history yet...'}</Typography>
            }
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};