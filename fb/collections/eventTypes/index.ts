import firebase from "@fb/client";

export interface EventTypesItemFb {
    uid: string;
    name: string;
    description: string;
}

const EventTypesDb = firebase.firestore().collection("EventTypes");

export default EventTypesDb;
