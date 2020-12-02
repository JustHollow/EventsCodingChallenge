import { Fragment, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { ProtectedRoutes, Routes } from "@routes";
import firebase from "@fb/client";
import { LinearProgress } from "@material-ui/core";

export const ProtectedRoutesHOC = (props: PropsWithChildren<unknown>) => {
    const router = useRouter();
    const currentUser = firebase.auth().currentUser;

    if (process.browser) {
        const isProtected = ProtectedRoutes.some((route) =>
            route.match(router.route)
        );

        if (!currentUser && isProtected) {
            router.push(Routes.signin);
            return <LinearProgress color="primary" style={{ width: "100%" }} />;
        }
    }

    return <Fragment>{props.children}</Fragment>;
};
