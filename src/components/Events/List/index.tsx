import { eventsSelector, getAllEvents } from "@ducks/events";
import useTypedDispatch from "@hooks/useTypedDispatch";
import { Grid, makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import EventItem from "./EventItem";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
    },
}));

const Events = () => {
    const classes = useStyles();
    const EventsState = useSelector(eventsSelector);
    const dispatch = useTypedDispatch();

    useEffect(() => {
        if (!EventsState.loaded) {
            dispatch(getAllEvents());
        }
    }, [EventsState.loaded]);

    return (
        <Grid container spacing={3} className={classes.root}>
            {EventsState.items.map((event) => {
                return <EventItem key={event.uid} item={event} />;
            })}
        </Grid>
    );
};

export default Events;
