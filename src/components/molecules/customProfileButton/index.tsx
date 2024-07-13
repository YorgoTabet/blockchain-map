import React, { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import { getUserName } from "services/firebase";
import { onConnected } from "utils/auth";

interface ProfileButtonProps {
    publicKey: PublicKey;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ publicKey }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        if (open) {
            (async () => {
                try {
                    const storedName = await getUserName(publicKey);
                    if (storedName) {
                        setName(storedName);
                    }
                } catch (error) {
                    console.error("Error fetching user name:", error);
                }
            })();
        }
    }, [open, publicKey]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        onConnected({ publicKey, name });
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                <AccountBox />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Wallet Address"
                        type="text"
                        fullWidth
                        value={publicKey.toBase58()}
                        InputProps={{
                            readOnly: true
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <Typography>Cancel</Typography>
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        <Typography>Save</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProfileButton;
