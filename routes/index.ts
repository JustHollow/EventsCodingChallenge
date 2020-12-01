export const Routes = {
    signin: "signin",
    signup: "signup",
    index: "/",
    events: {
        index: "events",
        create: "events/create",
    },
};

export const ProtectedRoutes = [Routes.index];
