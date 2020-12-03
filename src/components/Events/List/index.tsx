import {
    CircularProgress,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import EventItem from "./EventItem";
import { useCollectionData } from "react-firebase-hooks/firestore";
import EventsDb, { EventItemFb } from "@fb/collections/events";
import SportsDb, { SportItemFb } from "@fb/collections/sports";
import SportsSubscriptionsDb, {
    SportsSubscriptionsItemFb,
} from "@fb/collections/sportsSubscription ";
import { useSelector } from "react-redux";
import { userSelector } from "@ducks/user";
import clsx from "clsx";
import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
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
        margin: theme.spacing(1),
    },
}));

const Events = () => {
    const classes = useStyles();
    const UserState = useSelector(userSelector);

    const [Events, isEventsLoading] = useCollectionData<EventItemFb>(EventsDb);

    const [
        SportSubscriptions,
        isSportSubscriptionsLoading,
    ] = useCollectionData<SportsSubscriptionsItemFb>(
        SportsSubscriptionsDb.where("userId", "==", UserState.uid)
    );
    const [Sports] = useCollectionData<SportItemFb>(SportsDb);

    const SubscribedSports = SportSubscriptions?.map((sub) =>
        Sports.find((sport) => sub.sportId === sport.uid)
    );

    return (
        <Grid item container className={classes.root}>
            {isEventsLoading || isSportSubscriptionsLoading ? (
                <CircularProgress />
            ) : (
                SubscribedSports.map((sport) => {
                    const currentSportEvents = Events.filter(
                        (event) => event.sportId === sport.uid
                    );
                    const today = dayjs();
                    const pastEvents = currentSportEvents.filter(
                        (event) =>
                            !event.active || dayjs(event.start).isBefore(today)
                    );
                    const futureEvents = currentSportEvents.filter(
                        (event) =>
                            event.active && dayjs(event.start).isAfter(today)
                    );
                    return (
                        <Grid
                            key={sport.uid}
                            item
                            className={clsx(classes.papper, classes.content)}
                        >
                            <Typography variant="h5">{sport.name}</Typography>

                            {futureEvents.length > 0 && (
                                <>
                                    <Typography variant="h6">
                                        Future events
                                    </Typography>
                                    <Grid className={classes.content}>
                                        {futureEvents.map((event) => (
                                            <EventItem
                                                key={event.uid}
                                                item={event}
                                            />
                                        ))}
                                    </Grid>
                                </>
                            )}

                            {pastEvents.length > 0 && (
                                <>
                                    <Typography variant="h6">
                                        Past events
                                    </Typography>
                                    <Grid className={classes.content}>
                                        {pastEvents.map((event) => (
                                            <EventItem
                                                key={event.uid}
                                                item={event}
                                            />
                                        ))}
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    );
                })
            )}
        </Grid>
    );
};

export default Events;
