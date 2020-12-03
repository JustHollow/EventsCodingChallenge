import { CircularProgress, Grid, makeStyles } from "@material-ui/core";
import SportItem from "./SportItem";
import { useCollectionData } from "react-firebase-hooks/firestore";
import SportsDb, { SportItemFb } from "@fb/collections/sports";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
    },
}));

const Sports = () => {
    const classes = useStyles();
    const [Sports, isSportsLoading] = useCollectionData<SportItemFb>(SportsDb);
    return (
        <Grid container spacing={3} className={classes.root}>
            {isSportsLoading ? (
                <CircularProgress />
            ) : (
                Sports.map((sport) => (
                    <SportItem key={sport.uid} item={sport} />
                ))
            )}
        </Grid>
    );
};

export default Sports;
