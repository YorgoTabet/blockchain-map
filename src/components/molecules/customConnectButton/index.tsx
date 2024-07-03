// src/components/molecules/CustomConnectButton.tsx
import React, { useCallback, useEffect, useMemo } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Box, Button, Typography } from "@mui/material";
import { LogoutOutlined, WalletRounded } from "@mui/icons-material";

const CustomConnectButton: React.FC = () => {
    const { setVisible } = useWalletModal();
    const { connected, wallet, disconnect, connecting, publicKey, connect, disconnecting } =
        useWallet();

    const ButtonText = useMemo(() => {
        if (connected) return `${wallet?.adapter?.name} connected`;
        if (connecting) return "connecting";
        if (disconnecting) "disconnecting";
    }, [connected, connecting, disconnecting, wallet?.adapter?.name]);

    const handleClick = useCallback(() => {
        if (!connected) {
            setVisible(true);
        }
    }, [connected, setVisible]);
    console.log(wallet, "wallet info");
    useEffect(() => {
        console.log(publicKey);
    });

    useEffect(() => {
        if (wallet?.readyState === "Installed" && !connected) connect();
    }, [connect, connected, publicKey, wallet?.readyState]);

    const showText = connected || connecting;
    return (
        <Box>
            <Button
                disabled={connected}
                variant="contained"
                color="primary"
                onClick={handleClick}
                style={{ gap: "12px" }}>
                <WalletRounded />
                {showText && (
                    <Typography fontSize={12} fontFamily="monospace">
                        {ButtonText}
                    </Typography>
                )}
            </Button>
            {connected && (
                <Button color="primary" variant="contained" onClick={() => disconnect()}>
                    <LogoutOutlined />
                </Button>
            )}
        </Box>
    );
};

export default CustomConnectButton;
