import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@ducks";
import { AppThunkAction } from "@store";
import { fbSignInUser } from "@firebase/auth";

//Selectors
export const userSelector = (state: RootState) => state.user;

//Reducer
export type UserState = {
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    providerId: string;
    uid: string;
};

const initialState: UserState = {
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL: "",
    providerId: "",
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
    console.log(userResp, userResp.additionalUserInfo.profile);
    dispatch(userActions.setUser(userResp.user.providerData[0]));
};

// export const signUpUser = ({
//     email,
//     gender,
//     dob,
//     name,
//     password,
// }: IUserSignUp) => {
//     return async (dispatch) =>
//         fbSignUpUser(email, password).then((user) => {
//             const ref = firebase.database().ref().child("user");
//             ref.child(user.user.uid).set({ email, gender, dob, name });
//             //  dispatch(setUser({ email, gender, dob, name }, false));
//         });
//     // .catch(err => {
//     //   //
//     // });
// };
