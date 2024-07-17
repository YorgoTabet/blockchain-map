import { RouterProvider } from "@tanstack/react-router";
import "./App.css";
import { router } from "routes";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "theme/theme";
import { UserDetailsContextProvider } from "context/userContext";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <UserDetailsContextProvider>
                <CssBaseline />
                <RouterProvider router={router} />
            </UserDetailsContextProvider>
        </ThemeProvider>
    );
}

export default App;
