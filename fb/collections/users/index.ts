import firebase from "@fb/client";

export interface UserItemFb {
    displayName: string;
    email: string;
    name: string;
    phoneNumber: string;
    role: string;
    surname: string;
    uid: string;
}

const UsersDb = firebase.firestore().collection("Users");

export default UsersDb;
