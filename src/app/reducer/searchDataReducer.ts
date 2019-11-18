import { Timestamp } from "../Utils";

export const USER_REDUCER_ACTION_RESET : SearchDataActionEnum = 0;
export const USER_REDUCER_ACTION_SET_LAST_SEARCH : SearchDataActionEnum = 1;

export type SearchDataActionEnum = number;
export type SearchDataEntry = {
  userName: string;
  avatarUrl: string;
  timestamp: Timestamp;
  repositoriesList: Repository[];
};
export type Repository = {
  fullName: string;
  description: string;
  cloneUrl: string;
  htmlUrl: string;
};
export type SearchData = {
  lastSearch: SearchDataEntry | null;
};

const initialState = (): SearchData => ({
  lastSearch: null
});

export const searchDataReducer = (
  state = initialState(),
  { type, payload } : { type : SearchDataActionEnum, payload : SearchDataEntry }
) => {
  switch (type) {
    case USER_REDUCER_ACTION_RESET:
      return initialState();
    case USER_REDUCER_ACTION_SET_LAST_SEARCH:
      return { ...state, lastSearch: payload };
    default:
      return state;
  }
};
