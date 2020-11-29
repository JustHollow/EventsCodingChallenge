import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@ducks";
import { AppThunkAction } from "@store";
import Router from "next/router";
import { Routes } from "@routes";
import EventsDb, { EventItemFb } from "@fb/collections/events";

//Selectors
export const eventsSelector = (state: RootState) => state.events;

//Reducer
export type EventsStateItem = EventItemFb;
export type EventsState = { items: EventsStateItem[]; loaded: boolean };

const initialState: EventsState = { items: [], loaded: false };

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setEventsItems: (
            state,
            action: PayloadAction<EventsState["items"]>
        ) => {
            state.items = action.payload;
        },
    },
});

export const eventsActions = eventsSlice.actions;
export default eventsSlice.reducer;

export const getAllEvents: AppThunkAction = () => async (dispatch) => {
    const events = await EventsDb.get();

    const eventsDocs = events.docs.map<EventsStateItem>(
        (doc) => doc.data() as EventsStateItem
    );

    dispatch(eventsActions.setEventsItems(eventsDocs));

    Router.push(Routes.index);
};
