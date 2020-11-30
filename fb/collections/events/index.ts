import firebase from "@fb/client";

export interface EventItemFb {
    uid: string;
    name: string;
    active: boolean;
    eventType: string;
    description: string;
    start: string;
    location: firebase.firestore.GeoPoint;
    sportId: string;
}

const EventsDb = firebase.firestore().collection("Events");

export default EventsDb;
