import {combineReducers, createStore} from "redux";
import {searchDataReducer} from "../reducer/searchDataReducer";

const rootReducer = combineReducers({
  searchData: searchDataReducer
});

export const store = createStore(rootReducer);
