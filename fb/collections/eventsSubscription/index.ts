import firebase from "@fb/client";

export interface EventsSubscriptionsItemFb {
    userId: string;
    eventId: string;
}

const EventsSubscriptionsDb = firebase
    .firestore()
    .collection("EventsSubscriptions");

export default EventsSubscriptionsDb;
