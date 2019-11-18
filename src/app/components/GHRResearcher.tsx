import React, {useContext, useReducer, useState} from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {Field, Form} from "react-final-form";
import classNames from "clsx";
import {useDispatch} from "react-redux";
import {SearchDataEntry, searchDataReducer, USER_REDUCER_ACTION_SET_LAST_SEARCH} from "../reducer/searchDataReducer";
import {
  SEARCH_HISTORY_REDUCER_ACTION_PUSH,
  SearchHistoryContext
} from "../context/SearchHistoryContext";

export type GitHubResponse = Array<any>;

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent:'center',
    flexWrap: 'wrap',
  },
  textField: {
    width: 200,
  },
  marginLeft: {
    marginLeft: theme.spacing(5)
  },
  marginTop: {
    marginTop: theme.spacing(3.2)
  },
  margin: {
    margin: theme.spacing(5),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  }
}));

const buildLastSearchPayload = (gitHubResponse : GitHubResponse) : SearchDataEntry => {
  const repositoriesList = gitHubResponse.reduce((acc, curr) => {
    return [...acc, {
      fullName: curr.full_name,
      description: curr.description,
      cloneUrl: curr.clone_url,
      htmlUrl: curr.html_url}];
  }, []);

  // We can directly do gitHubResponse[0] without checking length
  // because we would have get a 404 earlier if the response was empty
  return {
    userName: gitHubResponse[0].owner.login,
    avatarUrl: gitHubResponse[0].owner.avatar_url,
    timestamp: Date.now(),
    repositoriesList: repositoriesList
  };
};

export const GHRResearcher = () => {
  const classes = useStyles();
  const [httpError, setHttpError] = useState({error: false, message:""});
  const dispatchCurrentSearch = useDispatch();
  const { dispatch: dispatchSearchHistory } = useContext(SearchHistoryContext);

  const addToHistory = (newData : SearchDataEntry) => dispatchSearchHistory({actionType:SEARCH_HISTORY_REDUCER_ACTION_PUSH, payload: newData});

  const required = (value : string) => (value ? undefined : "Username is missing");
  const maxSize = (value : string) => (value.length < 30 ? undefined : "Username is too long (> 30 characters)");
  const composeValidators = (...validators : any[]) => (value : any) => validators.reduce((error, validator) => error || validator(value), undefined);

  const handleSubmit = async ({usernameField} : {usernameField: string}) => {
    const response = await fetch(`https://api.github.com/users/${usernameField}/repos`, {method: 'GET'}).then(
      (response) => {
        if (httpError) {
          setHttpError({error: false, message: ""});
        }
        return response.json();
      }).catch(async (error) => {
      console.error(error);
      setHttpError({error: true, message: error.title});
    });
    const currentSearch = buildLastSearchPayload(response);
    dispatchCurrentSearch({
      type: USER_REDUCER_ACTION_SET_LAST_SEARCH,
      payload: currentSearch
    });
    addToHistory(currentSearch);
  };

  const disableResearchButton = (submitting : boolean, metaError : string) => {
    return !!(submitting || metaError);
  };

  return (
      <Paper className={classes.container}>
        <Form onSubmit={handleSubmit}>
          {({handleSubmit, submitting}) => (
            <form onSubmit={handleSubmit}>
                <Field name="usernameField" validate={composeValidators(required, maxSize)}>
                  {({input, meta}) => (
                    <>
                      <TextField
                        error={(meta.error && meta.touched) || httpError.error}
                        helperText={(meta.error && meta.touched) || httpError.error ? meta.error || httpError.message : ''}
                        id="standard-search"
                        label="GitHub username"
                        type="search"
                        className={classNames(classes.textField, classes.marginLeft, classes.marginTop)}
                        margin="normal"
                        inputProps={input}
                      />
                      <Button
                        type="submit"
                        variant="outlined"
                        size="medium"
                        color="primary"
                        className={classes.margin}
                        disabled={disableResearchButton(submitting, meta.error)}
                      >
                        Search
                      </Button>
                    </>
                  )}
                </Field>
            </form>
          )}
        </Form>
      </Paper>
  );
};