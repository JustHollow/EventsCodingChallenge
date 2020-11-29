import { useEffect, useRef, Fragment, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { ProtectedRoutes, Routes } from "@routes";
import { useSelector } from "react-redux";
import { userSelector } from "@ducks/user";

export const ProtectedRoutesHOC = (props: PropsWithChildren<unknown>) => {
    const router = useRouter();
    const lastRoute = useRef<string>(null);
    const UserState = useSelector(userSelector);

    useEffect(() => {
        lastRoute.current = router.route;

        const isProtected = ProtectedRoutes.some((route) =>
            route.match(router.route)
        );

        if (!UserState.uid && isProtected) {
            router.push(Routes.signin);
        }
    }, [router]);

    return <Fragment>{props.children}</Fragment>;
};
