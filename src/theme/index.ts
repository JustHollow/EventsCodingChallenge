import { colors, createMuiTheme } from "@material-ui/core";

const MUITheme = createMuiTheme({
    palette: {
        primary: {
            main: colors.blue.A700,
        },
        secondary: {
            main: colors.amber.A700,
        },
    },
});

export default MUITheme;
