import Link from "@components/Link";
import { EventsStateItem } from "@ducks/events";
import {
    eventsSubscriptionsSelector,
    getAllSubscriptionsEvents,
} from "@ducks/subscriptions/events";
import { userSelector } from "@ducks/user";
import EventsSubscriptionsDb, {
    EventsSubscriptionsItemFb,
} from "@fb/collections/eventsSubscription";
import useTypedDispatch from "@hooks/useTypedDispatch";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";
import { Routes } from "@routes";
import { memo, useState } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    papper: {
        height: theme.spacing(12),
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
    },
    content: {
        display: "flex",
        overflow: "auto",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        placeContent: "center",
        placeItems: "center",
    },
    subscribe: {},
}));

type EventsItemProps = { item: EventsStateItem };
const EventItem = ({ item }: EventsItemProps) => {
    const classes = useStyles();
    const dispatch = useTypedDispatch();
    const UserState = useSelector(userSelector);
    const EventsSubscritionsState = useSelector(eventsSubscriptionsSelector);
    const [loading, setLoading] = useState(false);

    const isSubscribed = EventsSubscritionsState.items.some(
        (sub) => sub.eventId === item.uid
    );

    const handleSubscription = async () => {
        setLoading(true);
        if (isSubscribed) {
            const subscribedItems = await EventsSubscriptionsDb.where(
                "userId",
                "==",
                UserState.uid
            )
                .where("eventId", "==", item.uid)
                .get();

            const promises: Promise<void>[] = [];
            subscribedItems.forEach((item) => {
                promises.push(EventsSubscriptionsDb.doc(item.id).delete());
            });
            await Promise.all(promises);
        } else {
            const newDoc = EventsSubscriptionsDb.doc();

            const data: EventsSubscriptionsItemFb = {
                eventId: item.uid,
                userId: UserState.uid,
            };

            await newDoc.set(data);
        }
        await dispatch(getAllSubscriptionsEvents());
        setLoading(false);
    };

    return (
        <Grid item xs={6} md={4} lg={3}>
            <Paper className={classes.papper}>
                <Link
                    href={`${Routes.events.base}/${item.uid}`}
                    className={classes.content}
                >
                    <main>{item.name}</main>
                </Link>
                <Button
                    variant="contained"
                    color={isSubscribed ? "default" : "primary"}
                    className={classes.subscribe}
                    fullWidth
                    onClick={handleSubscription}
                    disabled={loading}
                >
                    {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </Button>
            </Paper>
        </Grid>
    );
};

export default memo(EventItem);
