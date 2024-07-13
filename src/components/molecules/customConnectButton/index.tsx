import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Box, Button, Typography } from "@mui/material";
import { LogoutOutlined, WalletRounded } from "@mui/icons-material";
import { onConnected } from "utils/auth";
import { getNftsForOwner } from "services/nft";
import ProfileButton from "components/molecules/customProfileButton";

const PUFFSTERZ_COLLECTION_ADDRESS = "FQUab6C1H9jprxf2uJCX67p5LgY8T1Wo9NQfdW1uKQL7";

interface Group {
    group_value: string;
}

interface GetAssetResponse {
    grouping?: Group[];
}

const CustomConnectButton: React.FC = () => {
    const { setVisible } = useWalletModal();
    const { connected, wallet, disconnect, connecting, publicKey, connect, disconnecting } =
        useWallet();
    const [ownsPuffsterz, setOwnsPuffsterz] = useState<boolean>(false);

    const ButtonText = useMemo(() => {
        if (connected) return `${wallet?.adapter?.name} connected`;
        if (connecting) return "connecting";
        if (disconnecting) return "disconnecting";
        return "Connect Wallet";
    }, [connected, connecting, disconnecting, wallet?.adapter?.name]);

    const handleClick = useCallback(() => {
        if (!connected) {
            setVisible(true);
        }
    }, [connected, setVisible]);

    useEffect(() => {
        if (wallet?.readyState === "Installed" && !connected) connect();
    }, [connect, connected, wallet?.readyState]);

    useEffect(() => {
        if (connected) onConnected({ publicKey: publicKey });
    }, [connected, publicKey]);

    useEffect(() => {
        const checkNftOwnership = async () => {
            if (publicKey) {
                try {
                    const nfts = await getNftsForOwner(publicKey.toBase58(), 1);
                    const ownsPuffsterz = nfts.items.some((nft: GetAssetResponse) =>
                        nft.grouping?.some(
                            (group: Group) => group.group_value === PUFFSTERZ_COLLECTION_ADDRESS
                        )
                    );
                    setOwnsPuffsterz(ownsPuffsterz);
                } catch (error) {
                    console.error("Error fetching NFTs: ", error);
                }
            }
        };

        if (connected) checkNftOwnership();
    }, [connected, publicKey]);

    const showText = connected || connecting;
    return (
        <Box display="flex" alignItems="center" gap={2}>
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
                <>
                    <Button color="primary" variant="contained" onClick={() => disconnect()}>
                        <LogoutOutlined />
                    </Button>
                    {ownsPuffsterz && (
                        <Box ml={2}>
                            <ProfileButton publicKey={publicKey!} />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default CustomConnectButton;
