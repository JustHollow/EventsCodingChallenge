import firebase from "@fb/client";

export interface SportItemFb {
    uid: string;
    name: string;
}

const SportsDb = firebase.firestore().collection("Sports");

export default SportsDb;
