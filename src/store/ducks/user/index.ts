import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@ducks";
import { AppThunkAction } from "@store";
import { fbSignInUser, fbSignUpUser } from "@fb/auth";
import UsersDb, { UserItemFb } from "@fb/collections/users";

//Selectors
export const userSelector = (state: RootState) => state.user;

//Reducer
export type UserBase = Omit<UserItemFb, "role">;

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
    const userResp = await fbSignInUser(email, password);

    const user = await UsersDb.doc(userResp.user.uid).get();
    const userData = user.data() as UserState;

    if (userData) {
        dispatch(userActions.setUser(userData));
    }
};

export const signUpUser: AppThunkAction<UserBase & { password: string }> = ({
    displayName,
    email,
    name,
    password,
    phoneNumber,
    surname,
}) => async (dispatch) => {
    const user = await fbSignUpUser(email, password);

    await UsersDb.doc(user.user.uid).set({
        displayName,
        email,
        name,
        phoneNumber,
        surname,
        uid: user.user.uid,
        role: "common",
    });

    dispatch(
        userActions.setUser({
            ...user.user.providerData[0],
            displayName,
            email,
            name,
            phoneNumber,
            surname,
        })
    );
};
