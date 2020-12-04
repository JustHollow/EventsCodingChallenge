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
import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { Description, EmojiEvents, Place } from "@material-ui/icons";
import { Routes } from "@routes";
import clsx from "clsx";
import dayjs from "dayjs";
import { memo, useState } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    papper: {
        height: theme.spacing(20),
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
        margin: theme.spacing(1),
    },
    content: {
        padding: theme.spacing(2, 4),
        display: "flex",
        overflow: "auto",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        placeContent: "center",
    },
    notActive: {
        background: theme.palette.grey[300],
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

    const isActive = item.active && dayjs(item.start).isAfter(dayjs());

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
            <Paper
                className={clsx(classes.papper, !isActive && classes.notActive)}
            >
                <Link
                    href={`${Routes.events.base}/${item.uid}`}
                    className={classes.content}
                >
                    <Typography>
                        <EmojiEvents />
                        {item.name}
                    </Typography>
                    <Typography>
                        <Description />
                        {item.description}
                    </Typography>
                    <Typography>
                        <Place />
                        {dayjs(item.start).toString()}
                    </Typography>
                </Link>
                {isActive && (
                    <Button
                        variant="contained"
                        color={isSubscribed ? "default" : "primary"}
                        className={classes.subscribe}
                        fullWidth
                        onClick={handleSubscription}
                        disabled={loading}
                    >
                        {isSubscribed
                            ? "I've changed my mind"
                            : "Want to visit"}
                    </Button>
                )}
            </Paper>
        </Grid>
    );
};

export default memo(EventItem);
