import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@ducks";
import { AppThunkAction } from "@store";
import Router from "next/router";
import { Routes } from "@routes";
import EventsSubscriptionsDb, {
    EventsSubscriptionsItemFb,
} from "@fb/collections/eventsSubscription";

//Selectors
export const eventsSubscriptionsSelector = (state: RootState) =>
    state.subscriptions.events;

//Reducer
export type SubscriptionsEventsStateItem = EventsSubscriptionsItemFb;
export type SubscriptionsEventsState = {
    items: SubscriptionsEventsStateItem[];
    loaded: boolean;
};

const initialState: SubscriptionsEventsState = { items: [], loaded: false };

const subscriptionsEventsSlice = createSlice({
    name: "subsriptionsEvents",
    initialState,
    reducers: {
        setSubscriptionsEventsItems: (
            state,
            action: PayloadAction<SubscriptionsEventsState["items"]>
        ) => {
            state.items = action.payload;
        },
        setLoaded: (
            state,
            action: PayloadAction<SubscriptionsEventsState["loaded"]>
        ) => {
            state.loaded = action.payload;
        },
    },
});

export const eventsActions = subscriptionsEventsSlice.actions;
export default subscriptionsEventsSlice.reducer;

export const getAllSubscriptionsEvents: AppThunkAction = () => async (
    dispatch
) => {
    const subscriptions = await EventsSubscriptionsDb.get();

    const eventsDocs = subscriptions.docs.map(
        (doc) => doc.data() as SubscriptionsEventsStateItem
    );

    dispatch(eventsActions.setSubscriptionsEventsItems(eventsDocs));
    dispatch(eventsActions.setLoaded(true));

    Router.push(Routes.index);
};
