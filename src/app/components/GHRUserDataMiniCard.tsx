import React from "react";
import Card from "@material-ui/core/Card";
import {CardContent, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Timestamp, Utils} from "../Utils";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {Repository} from "../reducer/searchDataReducer";

const useStyles = makeStyles(() => ({
  card: {
    marginTop: '15px'
  },
  repositories: {
    marginTop: '5px'
  }
}));

export const GHRUserDataMiniCard = ({userName, timestamp, avatarUrl, repositories} : {userName: string, timestamp : Timestamp, avatarUrl : string, repositories : Repository[]}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container direction="column">
          <Grid container direction="row">
            <Grid item container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt={`avatar-${userName}`} src={avatarUrl}/>
                </Grid>
                <Grid item container direction="column">
                  <Typography variant="h6">{userName}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    <b>search date:</b> {Utils.timestampToFormattedDate(timestamp)}
                  </Typography>
                </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.repositories} item>
            {repositories && repositories.length > 0 ?
              repositories.map(repo => (
                <Typography variant="body2" key={timestamp + repo.fullName}>{repo.htmlUrl}</Typography>
              )) : 'No repositories found for the user...'}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};