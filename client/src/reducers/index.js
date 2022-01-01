import { combineReducers } from "redux";
import change from "./tasks";
import changeBoardState from "./boards";
import boardData from "./boardData";

const rootReducer = combineReducers({ change, changeBoardState, boardData });

export default rootReducer;
