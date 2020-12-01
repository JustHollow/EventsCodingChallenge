import firebase from "@fb/client";

export interface SportsSubscriptionsItemFb {
    userId: string;
    sportId: string;
}

const SportsSubscriptionsDb = firebase
    .firestore()
    .collection("SportsSubscriptions");

export default SportsSubscriptionsDb;
