import {
    Action,
    configureStore,
    getDefaultMiddleware,
    ThunkAction,
} from "@reduxjs/toolkit";
import { useMemo } from "react";
import rootReducer, { RootState } from "./ducks";

const createStore = (preloadedState = {}) => {
    const store = configureStore({
        preloadedState,
        reducer: rootReducer,
        middleware: getDefaultMiddleware(),
        devTools: true,
    });

    return store;
};

export type ReduxStore = ReturnType<typeof createStore>;
export type StoreDispatch = ReduxStore["dispatch"];
export type AppThunkAction<ArgumentType = undefined, ReturnType = void> = (
    ...arg: ArgumentType[]
) => ThunkAction<Promise<ReturnType>, RootState, null, Action<string>>;

export const getStore = (preloadedState = {}): ReduxStore => {
    // Always make a new store if server, otherwise state is shared between requests
    if (!process.browser) {
        return createStore(preloadedState);
    }

    // Create store if unavailable on the client and set it on the window object
    if (!window.__NEXT_REDUX_STORE__) {
        window.__NEXT_REDUX_STORE__ = createStore(preloadedState);
    }
    return window.__NEXT_REDUX_STORE__;
};

export function useStore(initialState = {}) {
    const store = useMemo(() => createStore(initialState), [initialState]);
    return store;
}
