import { Box, Toolbar } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import React from "react";

// TODO: ADD NAVIGATION HERE
export const AppWrapper: React.FC = () => {
    return (
        <Box
            sx={{
                m: 0,
                p: 0,
                display: "flex",
                flexDirection: "column",
                height: "100vh"
            }}>
            <Toolbar
                style={{
                    height: "fit-content",
                    backgroundColor: "black",
                    zIndex: 1000
                }}>
                Puffsterz
            </Toolbar>
            <Box
                style={{
                    flexGrow: 1,
                    width: "100%",
                    margin: 0,
                    padding: 0,
                    border: "1px solid red"
                }}>
                <Outlet />
            </Box>
        </Box>
    );
};
