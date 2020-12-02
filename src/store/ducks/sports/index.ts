import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@ducks";
import { AppThunkAction } from "@store";
import SportsDb, { SportItemFb } from "@fb/collections/sports";

//Selectors
export const sportsSelector = (state: RootState) => state.sports;

//Reducer
export type SportsStateItem = SportItemFb;
export type SportsState = { items: SportsStateItem[]; loaded: boolean };

const initialState: SportsState = { items: [], loaded: false };

const SportsSlice = createSlice({
    name: "sports",
    initialState,
    reducers: {
        setSportsItems: (
            state,
            action: PayloadAction<SportsState["items"]>
        ) => {
            state.items = action.payload;
        },
    },
});

export const SportsActions = SportsSlice.actions;
export default SportsSlice.reducer;

export const getAllSports: AppThunkAction = () => async (dispatch) => {
    const sports = await SportsDb.get();

    const sportsDocs = sports.docs.map<SportsStateItem>(
        (doc) => doc.data() as SportsStateItem
    );

    dispatch(SportsActions.setSportsItems(sportsDocs));
};
