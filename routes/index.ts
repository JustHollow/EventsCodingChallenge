export const Routes = {
    signin: "/signin",
    signup: "/signup",
    index: "/",
    sports: {
        base: "/sport",
        create: "/sport/create",
    },
    events: {
        base: "/events",
        create: "/events/create",
    },
};

export const ProtectedRoutes = [Routes.index];
