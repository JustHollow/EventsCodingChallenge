import { useEffect, useState } from "react";
import firebase from "@firebase/client";

const auth = firebase.auth();

type UseFbAuthProps = { successCb?: (user: firebase.User) => void };
export const useFbAuth = (props: UseFbAuthProps) => {
    const [user, setUser] = useState<firebase.User>(null);
    const [error, setError] = useState<firebase.auth.Error>();
    const [loading, setLoading] = useState(user === null);

    useEffect(() => {
        const listener = auth.onAuthStateChanged(
            (user) => {
                setUser(user);
                props.successCb && props.successCb(user);
            },
            (error) => {
                setError(error);
                console.error(error);
            }
        );
        setLoading(user === null && !error);
        return () => {
            listener();
        };
    }, [auth]);

    return [user, loading, error];
};
