import React, { createContext, useReducer, Context } from "react";
import { Utils } from "../Utils";
import { SearchDataEntry } from "../reducer/searchDataReducer";

export type SearchHistoryReducerActionEnum = number;

export type SearchHistory = Array<SearchDataEntry>;
export type SearchHistoryState = { history: SearchHistory };
export interface SearchHistoryContextType {
  state: SearchHistoryState;
  dispatch: any;
}

export const SEARCH_HISTORY_REDUCER_ACTION_RESET: SearchHistoryReducerActionEnum = 0;
export const SEARCH_HISTORY_REDUCER_ACTION_PUSH: SearchHistoryReducerActionEnum = 1;

const initialState = (): SearchHistoryState => ({
  history: Utils.getSearchHistoryFromLocalStorage()
});

const SearchHistoryContext: Context<SearchHistoryContextType> =
    createContext<SearchHistoryContextType>({ dispatch: {}, state: initialState() });
const searchHistoryReducer = (
  state: SearchHistoryState = initialState(),
  {
    actionType,
    payload
  }: { actionType: SearchHistoryReducerActionEnum; payload: SearchDataEntry }
): SearchHistoryState => {
  switch (actionType) {
    case SEARCH_HISTORY_REDUCER_ACTION_RESET:
      return initialState();
    case SEARCH_HISTORY_REDUCER_ACTION_PUSH:
      Utils.addSearchDataToHistory(payload, state.history);
      return { ...state };
    default:
      return state;
  }
};

const SearchHistoryContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(searchHistoryReducer, initialState());
  const value: SearchHistoryContextType = { state, dispatch };

  return (
    <SearchHistoryContext.Provider value={value}>
      {children}
    </SearchHistoryContext.Provider>
  );
};

export { SearchHistoryContext, SearchHistoryContextProvider };