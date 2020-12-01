import { eventsSelector } from "@ducks/events";
import { Grid, makeStyles } from "@material-ui/core";
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

    return (
        <Grid container spacing={3} className={classes.root}>
            {EventsState.items.map((event) => {
                return <EventItem key={event.uid} item={event} />;
            })}
        </Grid>
    );
};

export default Events;
