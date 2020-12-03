import Link from "@components/Link";
import { isAdminSelector } from "@ducks/user";
import EventsDb, { EventItemFb } from "@fb/collections/events";
import {
    Grid,
    Paper,
    makeStyles,
    Typography,
    CircularProgress,
    Button,
} from "@material-ui/core";
import { Description, EmojiEvents, Place } from "@material-ui/icons";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Routes } from "@routes";
import clsx from "clsx";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        display: "flex",
    },
    centered: {
        display: "flex",
        placeContent: "center",
    },
    paper: {
        padding: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
    },
    mapWrapper: {
        margin: theme.spacing(2),
    },
    map: {
        width: "100%",
        height: 300,
    },
    admin: {
        display: "flex",
    },
    adminButtons: {
        height: "100%",
        "* > button": {
            height: "100%",
        },
    },
}));

type EventDetailProps = { id: string };
const EventDetail = ({ id }: EventDetailProps) => {
    const classes = useStyles();
    const IsAdmin = useSelector(isAdminSelector);
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
            map.getBounds();
        },
        [event]
    );

    const handleDelete = async () => {
        await EventsDb.doc(id).delete();
    };

    if (!event) return <CircularProgress />;

    return (
        <Grid component={Paper} elevation={6} square className={classes.root}>
            <Grid item md={6} className={clsx(classes.centered, classes.paper)}>
                <Typography component="h1" variant="h5">
                    <EmojiEvents />
                    {event.name}
                </Typography>
                <Typography variant="body2">
                    <Description />
                    {event.description}
                </Typography>
                <Typography variant="body2">
                    <Place />

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
            {IsAdmin && (
                <Grid item className={classes.admin}>
                    {/* @ts-expect-error  someone deleted component prop from Button typings */}
                    <Button
                        color="primary"
                        variant="contained"
                        component={Link}
                        href={`${Routes.events.edit}/${event.uid}`}
                        className={classes.adminButtons}
                    >
                        Edit
                    </Button>
                    <Button
                        color="secondary"
                        variant="contained"
                        className={classes.adminButtons}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Grid>
            )}
        </Grid>
    );
};

export default EventDetail;
