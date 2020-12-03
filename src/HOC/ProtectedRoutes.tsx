import { Fragment, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { Routes } from "@routes";
import firebase from "@fb/client";
import { LinearProgress } from "@material-ui/core";

export const ProtectedRoutesHOC = (props: PropsWithChildren<unknown>) => {
    const router = useRouter();
    const currentUser = firebase.auth().currentUser;

    if (!currentUser) {
        if (process.browser) {
            if (
                ![Routes.signin, Routes.signup].some((route) =>
                    router.route.match(route)
                )
            ) {
                router.replace(Routes.signin);
            }
        }

        return <LinearProgress color="primary" style={{ width: "100%" }} />;
    }

    return <Fragment>{props.children}</Fragment>;
};
