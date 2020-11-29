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
import { Fragment, useCallback, useEffect } from "react";
import { useFbAuth } from "@hooks/useFbAuth";
import { userActions, UserState } from "@ducks/user";
import UsersDb from "fb/collections/users";
import { ProtectedRoutesHOC } from "@src/HOC/ProtectedRoutes";

type MyAppInitProps = { storeState: RootState };
type MyAppProps = AppProps & MyAppInitProps;

const MyApp: NextPage<MyAppProps, MyAppInitProps> = (props: MyAppProps) => {
    const { Component, pageProps } = props;
    const store = getStore(props.storeState);

    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }, []);

    useFbAuth({
        successCb: useCallback(
            (user) =>
                UsersDb.doc(user.uid)
                    .get()
                    .then((userDoc) => {
                        const userData = userDoc.data() as UserState;
                        store.dispatch(userActions.setUser(userData));
                    }),
            []
        ),
    });

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
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />

                <Provider store={store}>
                    <ProtectedRoutesHOC>
                        <Component {...pageProps} />
                    </ProtectedRoutesHOC>
                </Provider>
            </ThemeProvider>
        </Fragment>
    );
};

MyApp.getInitialProps = async () => {
    return { storeState: getStore().getState() };
};

export default MyApp;
