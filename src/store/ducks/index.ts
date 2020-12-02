import { combineReducers } from "redux";
import user from "./user";
import events from "./events";
import subscriptions from "./subscriptions";
import sports from "./sports";

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({ user, events, subscriptions, sports });

export default rootReducer;
