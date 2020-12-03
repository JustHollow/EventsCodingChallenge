import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { userSelector } from "@ducks/user";
import SportsSubscriptionsDb, {
    SportsSubscriptionsItemFb,
} from "@fb/collections/sportsSubscription ";
import { SportItemFb } from "@fb/collections/sports";

const useStyles = makeStyles((theme) => ({
    papper: {
        height: theme.spacing(12),
        display: "flex",
        flexDirection: "column",
        placeItems: "center",
    },
    content: {
        display: "flex",
        overflow: "auto",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        placeContent: "center",
        placeItems: "center",
    },
    subscribe: {},
}));

type SportsItemProps = { item: SportItemFb };
const SportItem = ({ item }: SportsItemProps) => {
    const classes = useStyles();
    const UserState = useSelector(userSelector);

    const [
        UserSportSubscriptions,
        UserSportSubscriptionsIsLoading,
    ] = useCollectionData<SportsSubscriptionsItemFb>(
        SportsSubscriptionsDb.where("userId", "==", UserState.uid)
    );

    const [loading, setLoading] = useState(false);

    const isSubscribed = UserSportSubscriptions?.some(
        (sub) => sub.sportId === item.uid
    );

    const handleSubscription = async () => {
        setLoading(true);
        if (isSubscribed) {
            const subscribedItems = await SportsSubscriptionsDb.where(
                "userId",
                "==",
                UserState.uid
            )
                .where("sportId", "==", item.uid)
                .get();

            const promises: Promise<void>[] = [];
            subscribedItems.forEach((item) => {
                promises.push(SportsSubscriptionsDb.doc(item.id).delete());
            });
            await Promise.all(promises);
        } else {
            const newDoc = SportsSubscriptionsDb.doc();

            const data: SportsSubscriptionsItemFb = {
                uid: newDoc.id,
                sportId: item.uid,
                userId: UserState.uid,
            };

            await newDoc.set(data);
        }
        setLoading(false);
    };

    return (
        <Grid item xs={6} md={4} lg={3}>
            <Paper className={classes.papper}>
                <Typography variant="h4" className={classes.content}>
                    {item.name}
                </Typography>
                <Button
                    variant="contained"
                    color={isSubscribed ? "default" : "primary"}
                    className={classes.subscribe}
                    fullWidth
                    onClick={handleSubscription}
                    disabled={loading || UserSportSubscriptionsIsLoading}
                >
                    {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </Button>
            </Paper>
        </Grid>
    );
};

export default memo(SportItem);
