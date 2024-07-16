import React, { useState, useEffect } from "react";
import { PublicKey } from "@solana/web3.js";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Avatar,
    Box
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
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

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
        if (publicKey && name) {
            await onConnected({ publicKey, name, avatar });
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setAvatar(file);
            setAvatarUrl(URL.createObjectURL(file));
        }
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                <AccountBox />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Profile</DialogTitle>
                <DialogContent>
                    {avatarUrl && (
                        <Box display="flex" justifyContent="center" mb={2}>
                            <Avatar src={avatarUrl} sx={{ width: 120, height: 120 }} />
                        </Box>
                    )}
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
                    <input
                        style={{ display: "none" }}
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                    <label htmlFor="avatar-upload">
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            style={{ marginTop: "10px" }}>
                            Choose your avatar
                        </Button>
                    </label>
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
