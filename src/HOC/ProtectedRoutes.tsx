import { Fragment, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { Routes } from "@routes";
import firebase from "@fb/client";
import { LinearProgress } from "@material-ui/core";

export const ProtectedRoutesHOC = (props: PropsWithChildren<unknown>) => {
    const router = useRouter();
    const currentUser = firebase.auth().currentUser;

    const allowedRoutes = [Routes.signin, Routes.signup];

    const userOnAllowedPage = allowedRoutes.some((route) =>
        router.route.match(route)
    );

    if (!currentUser && !userOnAllowedPage) {
        if (process.browser) {
            router.replace(Routes.signin);
        }

        return <LinearProgress color="primary" style={{ width: "100%" }} />;
    }

    return <Fragment>{props.children}</Fragment>;
};
