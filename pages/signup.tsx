import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "@components/Copyright";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import useTypedDispatch from "@hooks/useTypedDispatch";
import { signUpUser, UserBase } from "@ducks/user";
import { useRouter } from "next/router";
import { Routes } from "@routes";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    centered: {
        display: "flex",
        placeItems: "center",
        placeContent: "center",
    },
    image: {
        backgroundImage:
            "url(https://source.unsplash.com/1920x1080/?running,sports,fitness)",
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    gridItem: {
        backdropFilter: "grayscale(1)",
        background: "rgba(255,255,255,0.98)",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const router = useRouter();
    const dispatch = useTypedDispatch();

    const classes = useStyles();

    type FormValues = UserBase & {
        password: string;
    };
    const { register, handleSubmit, errors } = useForm<FormValues>();

    const handleSubmitCb = async (formData: FormValues) => {
        await dispatch(signUpUser(formData));
        router.push(Routes.index);
    };

    return (
        <Grid container component="main" className={classes.root}>
            <Grid
                item
                xs={12}
                className={clsx(classes.centered, classes.image)}
            >
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    className={classes.gridItem}
                >
                    <div className={clsx(classes.centered, classes.paper)}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit(handleSubmitCb)}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                id="displayName"
                                name="displayName"
                                autoComplete="displayName"
                                inputRef={register({ required: true })}
                                error={Boolean(errors.displayName)}
                                helperText={errors.displayName?.message}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Email Address"
                                id="email"
                                name="email"
                                autoComplete="email"
                                inputRef={register({ required: true })}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={register({ required: true })}
                                error={Boolean(errors.password)}
                                helperText={errors.password?.message}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Name"
                                name="name"
                                id="name"
                                autoComplete="fname"
                                inputRef={register({ required: true })}
                                error={Boolean(errors.name)}
                                helperText={errors.name?.message}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Surname"
                                name="surname"
                                type="surname"
                                id="surname"
                                autoComplete="lname"
                                inputRef={register({ required: true })}
                                error={Boolean(errors.surname)}
                                helperText={errors.surname?.message}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Phone"
                                name="phoneNumber"
                                id="phoneNumber"
                                autoComplete="phone"
                                inputRef={register({ required: true })}
                                error={Boolean(errors.phoneNumber)}
                                helperText={errors.phoneNumber?.message}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href={Routes.signin} variant="body2">
                                        {"Have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}
