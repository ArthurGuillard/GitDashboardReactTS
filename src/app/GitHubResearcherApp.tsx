import React from "react";
import {GHRAppBar} from "./components/GHRAppBar";
import {Container} from "@material-ui/core";
import {GHRResearcher} from "./components/GHRResearcher";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {GHRDataDisplayer} from "./components/GHRDataDisplayer";
import {Provider} from "react-redux";
import {store} from "./store/store";
import Grid from "@material-ui/core/Grid";
import {SearchHistoryContextProvider} from "./context/SearchHistoryContext";

const useStyles = makeStyles(theme => ({
  app: {
    minHeight: '100vh',
  },
  appContent: {
    marginTop: theme.spacing(5),
    display: 'flex',
    justifyContent:'center',
    alignItems:'center'
  }
}));

export const GitHubResearcherApp = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>
    <div className={classes.app}>
    <SearchHistoryContextProvider>
      <GHRAppBar/>
      <Container className={classes.appContent}>
        <Grid container spacing={3}>
          <Grid item xs={3}/>
          <Grid item xs={6}>
            <GHRResearcher/>
          </Grid>
          <Grid item xs={3}/>
          <Grid item xs={3}/>
          <Grid item xs={6}>
            <GHRDataDisplayer/>
          </Grid>
          <Grid item xs={3}/>
        </Grid>
      </Container>
    </SearchHistoryContextProvider>
    </div>
    </Provider>
  );
};