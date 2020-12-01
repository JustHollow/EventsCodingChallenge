import { useEffect, useState } from "react";
import firebase from "fb/client";

const auth = firebase.auth();

type UseFbAuthProps = { successCb?: (user: firebase.User) => void };
export const useFbAuth = (
    props?: UseFbAuthProps
): [user: firebase.User, loading: boolean, error: firebase.auth.Error] => {
    const [user, setUser] = useState<firebase.User>(null);
    const [error, setError] = useState<firebase.auth.Error>();
    const [loading, setLoading] = useState(user === null);

    useEffect(() => {
        const listener = auth.onAuthStateChanged(
            (user) => {
                setUser(user);
                props?.successCb && props.successCb(user);
                setLoading(false);
            },
            (error) => {
                setError(error);
                setLoading(false);
                console.error(error);
            },
            () => {
                setLoading(false);
            }
        );
        return () => {
            listener();
        };
    }, []);

    return [user, loading, error];
};
