// src/components/AppWrapper.tsx
import { Toolbar, Box, AppBar, Typography } from "@mui/material";

import { Outlet } from "@tanstack/react-router";
import React from "react";
import WalletContextProvider from "components/organisms/Wallet/WalletProvider";

import CustomConnectButton from "components/molecules/customConnectButton";

export const AppWrapper: React.FC = () => {
    return (
        <WalletContextProvider>
            <Box
                style={{
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh"
                }}>
                <AppBar position="static">
                    <Toolbar
                        disableGutters
                        style={{
                            height: "fit-content",
                            backgroundColor: "black",
                            zIndex: 1000,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "0 16px"
                        }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none"
                            }}>
                            Puffsterz
                            <Typography
                                variant="caption"
                                noWrap
                                component="span"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontSize: 10,
                                    color: "inherit",
                                    textDecoration: "none"
                                }}>
                                World Map
                            </Typography>
                        </Typography>

                        <CustomConnectButton />
                    </Toolbar>
                </AppBar>
                <Box
                    style={{
                        flexGrow: 1,
                        width: "100%",
                        margin: 0,
                        padding: 0
                    }}>
                    <Outlet />
                </Box>
            </Box>
        </WalletContextProvider>
    );
};
