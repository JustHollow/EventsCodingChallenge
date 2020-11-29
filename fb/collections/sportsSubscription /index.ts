import firebase from "@fb/client";

export interface SportsSubscriptionsItemFb {
    userId: string;
    sportId: string;
}

const SportsSubscriptionsFb = firebase
    .firestore()
    .collection("SportsSubscriptions");

export default SportsSubscriptionsFb;
