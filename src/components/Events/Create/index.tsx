import { EventItemFb } from "@fb/collections/events";
import {
    Grid,
    Paper,
    TextField,
    makeStyles,
    Button,
    Typography,
} from "@material-ui/core";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

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
    map: {
        width: "100%",
        height: 300,
    },
    create: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2, 1),
    },
}));

const EventCreate = () => {
    const classes = useStyles();

    type FormValues = Omit<EventItemFb, "uid">;
    const { register, handleSubmit, errors } = useForm<FormValues>();

    const handleSubmitCb = (formData: FormValues) => {
        console.log(formData);
    };

    const [, setMap] = useState<google.maps.Map<Element>>(null);

    const onMapLoad = useCallback(function callback(
        map: google.maps.Map<Element>
    ) {
        if (!process.browser) return;

        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
    },
    []);

    const onUnmount = useCallback(function callback() {
        setMap(null);
    }, []);

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
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Where"
                        name="description"
                        inputRef={register({ required: true })}
                        error={Boolean(errors.description)}
                        helperText={errors.description?.message}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Start date"
                        name="start"
                        inputRef={register({ required: true })}
                        error={Boolean(errors.start)}
                        helperText={errors.start?.message}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="End date"
                        name="end"
                        inputRef={register({ required: true })}
                        error={Boolean(errors.end)}
                        helperText={errors.end?.message}
                        autoFocus
                    />
                    <LoadScriptNext
                        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
                    >
                        <GoogleMap
                            mapContainerClassName={classes.map}
                            zoom={10}
                            onLoad={onMapLoad}
                            onUnmount={onUnmount}
                        />
                    </LoadScriptNext>
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        className={classes.create}
                    >
                        Create
                    </Button>
                </form>
            </div>
        </Grid>
    );
};

export default EventCreate;
