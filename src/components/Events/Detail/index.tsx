import EventsDb, { EventItemFb } from "@fb/collections/events";
import {
    Grid,
    Paper,
    makeStyles,
    Typography,
    CircularProgress,
} from "@material-ui/core";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import clsx from "clsx";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        display: "flex",
    },
    centered: {
        display: "flex",
        placeItems: "center",
        placeContent: "center",
    },
    paper: {
        padding: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
    },
    mapWrapper: {
        margin: theme.spacing(2, 0),
    },
    map: {
        width: "100%",
        height: 300,
    },
}));

type EventDetailProps = { id: string };
const EventDetail = ({ id }: EventDetailProps) => {
    const classes = useStyles();
    const [event, setEvent] = useState<EventItemFb>(null);

    useEffect(() => {
        (async () => {
            const eventDoc = await EventsDb.doc(id).get();
            setEvent(eventDoc.data() as EventItemFb);
        })();
    }, [id]);

    const { isLoaded: isMapLoaded, loadError: mapLoadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    const onMapLoad = useCallback(
        function callback(map: google.maps.Map<Element>) {
            if (!process.browser) return;

            map.setCenter({
                lat: event.location.latitude,
                lng: event.location.longitude,
            });
        },
        [event]
    );

    if (!event) return <CircularProgress />;

    return (
        <Grid component={Paper} elevation={6} square className={classes.root}>
            <Grid item md={6} className={clsx(classes.centered, classes.paper)}>
                <Typography component="h1" variant="h5">
                    {event.name}
                </Typography>
                <Typography variant="body2">{event.description}</Typography>
                <Typography variant="body2">
                    {dayjs(event.start).toString()}
                </Typography>
            </Grid>
            <Grid item md={6} className={classes.mapWrapper}>
                {isMapLoaded && !mapLoadError && (
                    <GoogleMap
                        mapContainerClassName={classes.map}
                        zoom={16}
                        onLoad={onMapLoad}
                    >
                        <Marker
                            position={{
                                lat: event.location.latitude,
                                lng: event.location.longitude,
                            }}
                        />
                    </GoogleMap>
                )}
            </Grid>
        </Grid>
    );
};

export default EventDetail;
