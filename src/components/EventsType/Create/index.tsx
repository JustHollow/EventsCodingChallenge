import EventTypessDb, { EventTypesItemFb } from "@fb/collections/eventTypes";
import {
    Grid,
    Paper,
    TextField,
    makeStyles,
    Button,
    Typography,
} from "@material-ui/core";
import { Routes } from "@routes";
import clsx from "clsx";
import { useRouter } from "next/router";
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
    create: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2, 1),
    },
}));

const EventsTypeCreate = () => {
    const router = useRouter();
    const classes = useStyles();

    type FormValues = Omit<EventTypesItemFb, "uid">;
    const { register, handleSubmit, errors } = useForm<FormValues>();

    const handleSubmitCb = async (formData: FormValues) => {
        const doc = EventTypessDb.doc();
        const docData: EventTypesItemFb = {
            ...formData,
            uid: doc.id,
        };

        await doc.set(docData);
        router.push(Routes.index);
    };

    return (
        <Grid component={Paper} elevation={6} square className={classes.root}>
            <div className={clsx(classes.centered, classes.paper)}>
                <Typography component="h1" variant="h5">
                    What an event type do you want?
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
                        label="Event type"
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

                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        className={classes.create}
                        type="submit"
                    >
                        Create
                    </Button>
                </form>
            </div>
        </Grid>
    );
};

export default EventsTypeCreate;
