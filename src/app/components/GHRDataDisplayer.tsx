import React from "react";
import {makeStyles} from "@material-ui/core";
import {GHRUserDataCard} from "./GHRUserDataCard";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {useSelector} from "react-redux";

const useStyles = makeStyles(() => ({
  card: {
    minWidth: 275,
  }
}));

export const GHRDataDisplayer = () => {
  const classes = useStyles();
  const searchData = useSelector((state : any) => state.searchData.lastSearch);

  return (
    <>
    {searchData &&
      <Card className={classes.card}>
        <CardContent>
          <GHRUserDataCard key={searchData.userName}
                       userName={searchData.userName}
                       avatarUrl={searchData.avatarUrl}
                       repositoriesList={searchData.repositoriesList}
          />
        </CardContent>
      </Card>
    }
    </>
  );
};