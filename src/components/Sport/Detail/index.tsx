import SportsDb, { SportItemFb } from "@fb/collections/sports";
import {
    Grid,
    Paper,
    makeStyles,
    Typography,
    CircularProgress,
} from "@material-ui/core";
import clsx from "clsx";
import { useEffect, useState } from "react";

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
}));

type SportDetailProps = { id: string };
const SportDetail = ({ id }: SportDetailProps) => {
    const classes = useStyles();
    const [Sport, setSport] = useState<SportItemFb>(null);

    useEffect(() => {
        (async () => {
            const SportDoc = await SportsDb.doc(id).get();
            setSport(SportDoc.data() as SportItemFb);
        })();
    }, [id]);

    if (!Sport) return <CircularProgress />;

    return (
        <Grid component={Paper} elevation={6} square className={classes.root}>
            <Grid
                item
                md={12}
                className={clsx(classes.centered, classes.paper)}
            >
                <Typography component="h1" variant="h5">
                    {Sport.name}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default SportDetail;
