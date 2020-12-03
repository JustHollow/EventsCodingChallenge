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
        edit: "/events/edit",
        type: {
            base: "/events/type",
            create: "/events/type/create",
        },
    },
};

export const ProtectedRoutes: string[] = [
    Routes.index,
    Routes.events.base,
    Routes.sports.base,
];
