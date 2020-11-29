import { EventsStateItem } from "@ducks/events";
import { Button, Grid, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    papper: {
        height: theme.spacing(12),
        display: "flex",
        flexDirection: "column",
    },
    content: {
        display: "flex",
        overflow: "auto",
        height: "100%",
        flexDirection: "column",
        placeContent: "center",
        placeItems: "center",
    },
    subscribe: { alignSelf: "flex-end" },
}));

type EventsItemProps = { item: EventsStateItem };
const EventItem = ({ item }: EventsItemProps) => {
    const classes = useStyles();

    return (
        <Grid item xs={6} md={4} lg={3}>
            <Paper className={classes.papper}>
                <main className={classes.content}>{item.name}</main>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.subscribe}
                    fullWidth
                >
                    Subscribe
                </Button>
            </Paper>
        </Grid>
    );
};

export default EventItem;
