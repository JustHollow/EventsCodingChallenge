import { combineReducers } from "redux";
import user from "./user";

export type RootState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({ user });

export default rootReducer;
