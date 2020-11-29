import firebase from "@fb/client";

export interface EventsSubscriptionsItemFb {
    userId: string;
    eventId: string;
}

const EventsSubscriptionsFb = firebase
    .firestore()
    .collection("EventsSubscriptions");

export default EventsSubscriptionsFb;
