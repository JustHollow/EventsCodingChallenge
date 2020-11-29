import firebase from "@fb/client";

export interface SportItemDb {
    uid: string;
    name: string;
}

const SportsDb = firebase.firestore().collection("Sports");

export default SportsDb;
