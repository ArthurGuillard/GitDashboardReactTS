import {Configuration} from "./Config";
import moment from "moment";
import {SearchHistory} from "./context/SearchHistoryContext";
import {SearchDataEntry} from "./reducer/searchDataReducer";

export type Timestamp = number;

export class Utils {
  static addSearchDataToHistory = (newSearchData : SearchDataEntry, history : SearchHistory) : void => {
    if (history.length >= Configuration.localStorage.SEARCH_HISTORY_MAX_ELEMENT) {
      history.pop();
    }
    history.unshift(newSearchData);
    localStorage.setItem(Configuration.localStorage.SEARCH_HISTORY_KEY, JSON.stringify(history));
  };

  static getSearchHistoryFromLocalStorage = () : SearchHistory => {
    const history = localStorage.getItem(Configuration.localStorage.SEARCH_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  };

  static timestampToFormattedDate = (timestamp : Timestamp) : string => {
    return moment(timestamp).format('DD/MM/YYYY HH:mm:ss');
  };
}
