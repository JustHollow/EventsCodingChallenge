import { combineReducers } from "redux";
import user from "./user";
import events from "./events";
import subscriptions from "./subscriptions";

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({ user, events, subscriptions });

export default rootReducer;
