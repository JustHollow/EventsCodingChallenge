import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { PropsWithChildren, useState } from "react";
import Link from "@components/Link";
import { Routes } from "@routes";
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import EventIcon from "@material-ui/icons/EventAvailable";
import EventTypeIcon from "@material-ui/icons/EventNote";
import SportsIcon from "@material-ui/icons/Sports";

const drawerWidth = "20vw";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth})`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
}));

type LayoutProps = PropsWithChildren<{
    title?: React.ReactNode;
    headerNavigationLeft?: React.ReactNode;
    headerNavigationRight?: React.ReactNode;
}>;
const Layout = (props: LayoutProps) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        {props.title}
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(
                        classes.drawerPaper,
                        !open && classes.drawerPaperClose
                    ),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button component={Link} href={Routes.index}>
                        <Tooltip
                            title={open ? "" : "Events"}
                            aria-label="events"
                        >
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Events" />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        href={Routes.events.create}
                    >
                        <Tooltip
                            title={open ? "" : "Create Event"}
                            aria-label="create event"
                        >
                            <ListItemIcon>
                                <EventIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Create Event" />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        href={Routes.events.type.create}
                    >
                        <Tooltip
                            title={open ? "" : "Create Event Type"}
                            aria-label="create event type"
                        >
                            <ListItemIcon>
                                <EventTypeIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Create Event Type" />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        href={Routes.sports.create}
                    >
                        <Tooltip
                            title={open ? "" : "Create Sport"}
                            aria-label="create sport"
                        >
                            <ListItemIcon>
                                <SportsIcon />
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary="Create Sport" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {props.children}
                </Container>
            </main>
        </div>
    );
};

export default Layout;
