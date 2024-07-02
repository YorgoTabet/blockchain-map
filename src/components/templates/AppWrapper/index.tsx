// src/components/AppWrapper.tsx
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "@tanstack/react-router";
import React from "react";
import WalletContextProvider from "components/organisms/Wallet/WalletProvider";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";

export const AppWrapper: React.FC = () => {
    return (
        <WalletContextProvider>
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
                        zIndex: 1000,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 16px"
                    }}>
                    <div>Puffsterz</div>
                    <WalletMultiButton />
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
        </WalletContextProvider>
    );
};
