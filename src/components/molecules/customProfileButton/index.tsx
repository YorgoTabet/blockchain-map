import React, { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import { storeUserLocation, getUserName } from "services/firebase";

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
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                try {
                    await storeUserLocation({ lat, lng }, publicKey, name);
                    console.log("Data saved successfully");
                } catch (error) {
                    console.error("Error saving data:", error);
                }
                handleClose();
            },
            (error) => {
                console.error("Error getting location:", error);
                handleClose();
            }
        );
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Open Profile
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
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ProfileButton;
