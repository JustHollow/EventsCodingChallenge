import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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
import { signInUser, userSelector } from "@ducks/user";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

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
    const UserState = useSelector(userSelector);
    if (UserState.uid) router.push("/");

    const classes = useStyles();
    const { register, handleSubmit, errors } = useForm<{
        email: string;
        password: string;
    }>({ defaultValues: { email: "demo@demo.com", password: "demodemo" } });
    const dispatch = useTypedDispatch();

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
                            onSubmit={handleSubmit(({ email, password }) => {
                                dispatch(signInUser({ email, password }));
                            })}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
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
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputRef={register({ required: true })}
                                error={Boolean(errors.email)}
                                helperText={errors.email?.message}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="remember"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
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
