import Link from "@components/Link";
import { Typography } from "@material-ui/core";

const Copyright = () => {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://github.com/JustHollow">
                Pavel Deneschik
            </Link>{" "}
            {new Date().getFullYear()}
        </Typography>
    );
};

export default Copyright;
