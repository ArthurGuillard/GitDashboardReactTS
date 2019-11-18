import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import FolderIcon from '@material-ui/icons/Folder';
import Tooltip from "@material-ui/core/Tooltip";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import {FileCopy} from "@material-ui/icons";
import {Repository} from "../reducer/searchDataReducer";

export const GHRUserDataCard = ({userName, avatarUrl, repositoriesList} : {userName : string, avatarUrl : string, repositoriesList : Repository[]}) => {
  const handleAvatarClick = (link : string) => () => {
    window.open(link, "_blank");
  };

  const handleClickCopyToClipboard = (whatToCopy : string) => () => {
      navigator.clipboard.writeText(whatToCopy);
  };
  return (
    <>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt={`avatar-${userName}`} src={avatarUrl}/>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography variant="h5" noWrap>{userName} repositories:</Typography>
        </Grid>
      </Grid>
      <List>
        {repositoriesList && repositoriesList.map(repo => (
          <ListItem key={repo.fullName}>
            <Tooltip title={`open link in new tab: ${repo.htmlUrl}`} placement="top">
              <ListItemAvatar>
                  <Avatar onClick={handleAvatarClick(repo.htmlUrl)}>
                    <FolderIcon/>
                  </Avatar>
              </ListItemAvatar>
            </Tooltip>
            <ListItemText
              primary={repo.fullName}
              secondary={repo.description}
            />
            <ListItemSecondaryAction>
              <Tooltip title="copy clone url to clipboard" placement="top">
                <IconButton edge="end" aria-label="copy clone url to clipboard"
                            onClick={handleClickCopyToClipboard(repo.cloneUrl)}>
                  <FileCopy/>
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};