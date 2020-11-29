import { combineReducers } from "redux";
import user from "./user";
import events from "./events";

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({ user, events });

export default rootReducer;
