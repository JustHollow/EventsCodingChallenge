import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@ducks";
import { AppThunkAction } from "@store";
import { fbSignInUser, fbSignUpUser } from "@fb/auth";
import UserDb from "@fb/collections/users";
import Router from "next/router";
import { Routes } from "@routes";

//Selectors
export const userSelector = (state: RootState) => state.user;

//Reducer
export type UserBase = {
    displayName: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
};

export interface UserState extends UserBase {
    photoURL: string;
    uid: string;
}

const initialState: UserState = {
    displayName: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    uid: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setOneOfState<T extends keyof UserState>(
            state: UserState,
            action: PayloadAction<{ type: T; newState: UserState[T] }>
        ) {
            state[action.payload.type] = action.payload.newState;
        },
        setUser: (state, action: PayloadAction<UserState>) => action.payload,
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

export const signInUser: AppThunkAction<{
    email: string;
    password: string;
}> = ({ email, password }) => async (dispatch) => {
    // sign in user here
    const userResp = await fbSignInUser(email, password);

    const user = await UserDb.doc(userResp.user.uid).get();
    const userData = user.data() as UserState;

    if (userData) {
        dispatch(userActions.setUser(userData));
    }

    Router.push(Routes.index);
};

export const signUpUser: AppThunkAction<UserBase & { password: string }> = (
    formData
) => async (dispatch) => {
    const user = await fbSignUpUser(formData.email, formData.password);

    await UserDb.doc(user.user.uid).set({
        ...formData,
        uid: user.user.uid,
        role: "common",
    });

    dispatch(
        userActions.setUser({ ...user.user.providerData[0], ...formData })
    );

    Router.push(Routes.index);
};
