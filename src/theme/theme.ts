// theme.js
import { createTheme } from "@mui/material/styles";
import {
    PRIMARY_COLOR,
    SECONDARY_COLOR,
    BACKGROUND_COLOR,
    TEXT_PRIMARY_COLOR,
    TEXT_SECONDARY_COLOR,
    ERROR_COLOR,
    WARNING_COLOR,
    INFO_COLOR,
    SUCCESS_COLOR
} from "constants/theme";

const theme = createTheme({
    palette: {
        primary: {
            main: PRIMARY_COLOR
        },
        secondary: {
            main: SECONDARY_COLOR
        },
        background: {
            default: BACKGROUND_COLOR,
            paper: BACKGROUND_COLOR
        },
        text: {
            primary: TEXT_PRIMARY_COLOR,
            secondary: TEXT_SECONDARY_COLOR
        },
        error: {
            main: ERROR_COLOR
        },
        warning: {
            main: WARNING_COLOR
        },
        info: {
            main: INFO_COLOR
        },
        success: {
            main: SUCCESS_COLOR
        }
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        h1: {
            color: TEXT_PRIMARY_COLOR
        },
        h2: {
            color: TEXT_PRIMARY_COLOR
        },
        h3: {
            color: TEXT_PRIMARY_COLOR
        },
        h4: {
            color: TEXT_PRIMARY_COLOR
        },
        h5: {
            color: TEXT_PRIMARY_COLOR
        },
        h6: {
            color: TEXT_PRIMARY_COLOR
        },
        body1: {
            color: TEXT_SECONDARY_COLOR
        },
        body2: {
            color: TEXT_SECONDARY_COLOR
        }
    }
});

export default theme;
