import { NextPage } from "next";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { getStore } from "@store";
import "@styles/global.scss";
import { RootState } from "@ducks";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "@src/theme";
import { Fragment, useEffect } from "react";
import { useFbAuth } from "@hooks/useFbAuth";
import { userActions, UserState } from "@ducks/user";
import UsersDb from "fb/collections/users";
import { ProtectedRoutesHOC } from "@src/HOC/ProtectedRoutes";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayJsUtils from "@date-io/dayjs";
import { getAllEvents } from "@ducks/events";
import { getAllSubscriptionsEvents } from "@ducks/subscriptions/events";
import { getAllSports } from "@ducks/sports";

type MyAppInitProps = { storeState: RootState };
type MyAppProps = AppProps & MyAppInitProps;

const MyApp: NextPage<MyAppProps, MyAppInitProps> = (props: MyAppProps) => {
    const { Component, pageProps } = props;
    const store = getStore(props.storeState);
    const dispatch = store.dispatch;

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    const [user] = useFbAuth();

    useEffect(() => {
        if (user) {
            (async () => {
                const userDoc = await UsersDb.doc(user.uid).get();
                const userData = userDoc.data() as UserState;
                dispatch(userActions.setUser(userData));
                Promise.all([
                    dispatch(getAllEvents()),
                    dispatch(getAllSubscriptionsEvents()),
                    dispatch(getAllSports()),
                ]);
            })();
        }
    }, [user]);

    return (
        <Fragment>
            <Head>
                <title>Events</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DayJsUtils}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />

                    <Provider store={store}>
                        <ProtectedRoutesHOC>
                            <Component {...pageProps} />
                        </ProtectedRoutesHOC>
                    </Provider>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </Fragment>
    );
};

MyApp.getInitialProps = async () => {
    return { storeState: getStore().getState() };
};

export default MyApp;
