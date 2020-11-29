import firebase from "@fb/client";

const UserDb = firebase.firestore().collection("Users");

export default UserDb;
