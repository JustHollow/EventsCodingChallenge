import EventsDb, { EventItemFb } from "@fb/collections/events";
import firebase from "@fb/client";
import {
    Grid,
    Paper,
    TextField,
    makeStyles,
    Button,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    CircularProgress,
} from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Routes } from "@routes";
import clsx from "clsx";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { sportsSelector } from "@ducks/sports";
import EventTypesDb, { EventTypesItemFb } from "@fb/collections/eventTypes";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useTypedController } from "@hookform/strictly-typed";
import { isAdminSelector } from "@ducks/user";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
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
    form: {
        width: "100%",
        margin: theme.spacing(1),
    },
    mapWrapper: {
        margin: theme.spacing(2, 0),
    },
    map: {
        width: "100%",
        height: 300,
    },
    create: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2, 1),
    },
}));

type EventEditProps = { id: string };
const EventEdit = ({ id }: EventEditProps) => {
    const router = useRouter();
    const classes = useStyles();
    const SportsState = useSelector(sportsSelector);
    const IsAdmin = useSelector(isAdminSelector);
    const [
        EventTypes,
        isEventTypesLoading,
    ] = useCollectionData<EventTypesItemFb>(EventTypesDb);

    const [[Event] = [], isEventLoading] = useCollectionData<EventItemFb>(
        EventsDb.where("uid", "==", id)
    );
    const [map, setMap] = useState<google.maps.Map<Element>>(null);
    const [mapCenter, setMapCenter] = useState<google.maps.LatLng>(null);
    const [selectedDate, handleDateChange] = useState(dayjs());

    type FormValues = Omit<EventItemFb, "uid">;
    const {
        register,
        handleSubmit,
        errors,
        control,
        reset,
    } = useForm<FormValues>({
        defaultValues: Event,
    });
    const TypedController = useTypedController<FormValues>({ control });

    useEffect(() => {
        reset(Event);
    }, [Event]);

    const handleSubmitCb = async (formData: FormValues) => {
        const doc = EventsDb.doc();
        const docData: EventItemFb = {
            ...formData,
            active: true,
            start: selectedDate.toJSON(),
            location: new firebase.firestore.GeoPoint(
                mapCenter.lat(),
                mapCenter.lng()
            ),
            uid: doc.id,
        };

        await doc.set(docData);
        router.push(Routes.index);
    };

    const { isLoaded: isMapLoaded, loadError: mapLoadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    const onMapLoad = useCallback(function callback(
        map: google.maps.Map<Element>
    ) {
        if (!process.browser) return;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    map.setCenter(pos);
                },
                () => {
                    const bounds = new window.google.maps.LatLngBounds();
                    map.fitBounds(bounds);
                }
            );
        } else {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
        }
        setMap(map);
    },
    []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

    if (isEventLoading || isEventTypesLoading) {
        return <CircularProgress />;
    }

    if (!IsAdmin) {
        return <div>Access denied</div>;
    }

    return (
        <Grid component={Paper} elevation={6} square className={classes.root}>
            <div className={clsx(classes.centered, classes.paper)}>
                <Typography component="h1" variant="h5">
                    What an awesome event do you want?
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit(handleSubmitCb)}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Event name"
                        name="name"
                        inputRef={register({ required: true })}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Description"
                        name="description"
                        inputRef={register({ required: true })}
                        error={Boolean(errors.description)}
                        helperText={errors.description?.message}
                    />
                    <FormControl
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    >
                        <InputLabel id="eventType-label">Event type</InputLabel>
                        <TypedController
                            name="eventType"
                            defaultValue=""
                            rules={{ required: true }}
                            render={(props) => (
                                <Select
                                    required
                                    labelId="eventType-label"
                                    label="Event type"
                                    name="eventType"
                                    error={Boolean(errors.eventType)}
                                    {...props}
                                >
                                    {EventTypes?.map((type) => (
                                        <MenuItem
                                            key={type.uid}
                                            value={type.uid}
                                        >
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    >
                        <InputLabel id="sportId-label">Sport</InputLabel>
                        <TypedController
                            name="sportId"
                            defaultValue=""
                            rules={{ required: true }}
                            render={(props) => (
                                <Select
                                    required
                                    labelId="sportId-label"
                                    label="Sport"
                                    name="sportId"
                                    error={Boolean(errors.sportId)}
                                    {...props}
                                >
                                    {SportsState.items.map((sport) => (
                                        <MenuItem
                                            key={sport.uid}
                                            value={sport.uid}
                                        >
                                            {sport.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                    </FormControl>

                    <KeyboardDateTimePicker
                        disableToolbar
                        variant="inline"
                        margin="normal"
                        label="Date and time"
                        value={selectedDate}
                        onChange={handleDateChange}
                        fullWidth
                        KeyboardButtonProps={{
                            "aria-label": "change date",
                        }}
                        name="start"
                        inputRef={register({ required: true })}
                        helperText={errors.start?.message}
                        error={Boolean(errors.start)}
                    />
                    {isMapLoaded && !mapLoadError && (
                        <div className={classes.mapWrapper}>
                            <Typography component="h2">
                                Where will it be?
                            </Typography>
                            <GoogleMap
                                mapContainerClassName={classes.map}
                                zoom={12}
                                onLoad={onMapLoad}
                                onUnmount={onUnmount}
                                onCenterChanged={() =>
                                    setMapCenter(map.getCenter())
                                }
                            >
                                <Marker position={mapCenter} />
                            </GoogleMap>
                        </div>
                    )}
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        className={classes.create}
                        type="submit"
                    >
                        Save
                    </Button>
                </form>
            </div>
        </Grid>
    );
};

export default EventEdit;
