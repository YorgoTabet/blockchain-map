import React, { useState, useEffect, useContext } from "react";
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
    Box,
    Snackbar
} from "@mui/material";
import { AccountBox } from "@mui/icons-material";
import { getUserName, getUserLocations } from "services/firebase";
import { onConnected } from "utils/auth";
import { fetchCountryCity } from "utils/location";
import { UserDetailsContext } from "context/userContext";

interface ProfileButtonProps {
    publicKey: PublicKey;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ publicKey }) => {
    const { userNfts } = useContext(UserDetailsContext);

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [country, setCountry] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        if (open) {
            (async () => {
                try {
                    const storedName = await getUserName(publicKey);
                    if (storedName) {
                        setName(storedName);
                    }

                    const userLocations = await getUserLocations();
                    const userLocation = userLocations[publicKey.toString()];
                    if (userLocation) {
                        setLocation({ lat: userLocation.lat, lng: userLocation.lng });

                        const { country, city } = await fetchCountryCity(
                            userLocation.lat,
                            userLocation.lng
                        );
                        setCountry(country);
                        setCity(city);
                        setAvatarUrl(userLocation.avatar);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleSave = async () => {
        if (publicKey && name) {
            await onConnected({ publicKey, name, avatar: avatarUrl ?? "" });
            setSnackbarOpen(true);
            setOpen(false);
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
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Avatar src={avatarUrl ?? ""} sx={{ width: 120, height: 120 }} />
                    </Box>
                    <Typography variant="subtitle1">Choose your PFP below:</Typography>
                    <Box
                        sx={{
                            display: "flex",
                            overflowX: "auto",
                            marginY: 5,
                            border: "1px solid black",
                            borderRadius: "15px",
                            padding: "15px",
                            justifyContent: "center"
                        }}>
                        {userNfts.map((el) => (
                            <Box
                                key={el}
                                onClick={() => setAvatarUrl(el)}
                                sx={{
                                    borderRadius: "50%",
                                    zIndex: 10,
                                    marginRight: 1
                                }}>
                                <Avatar src={el} sx={{ width: 60, height: 60, zIndex: 9 }} />
                            </Box>
                        ))}
                    </Box>
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
                    {location && (
                        <TextField
                            margin="dense"
                            label="Location"
                            type="text"
                            fullWidth
                            value={`\nCountry: ${country}, City: ${city}`}
                            InputProps={{
                                readOnly: true
                            }}
                        />
                    )}
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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Profile saved successfully"
                action={
                    <Button color="inherit" size="small" onClick={handleSnackbarClose}>
                        Close
                    </Button>
                }
            />
        </>
    );
};

export default ProfileButton;
