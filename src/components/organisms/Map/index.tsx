import Box from "@mui/material/Box";
import { Location } from "model/location";
import { useEffect, useState } from "react";
import {
    MapContainer,
    Marker,
    //  Marker,
    //   Popup,
    TileLayer
} from "react-leaflet";
import { getUserLocations } from "services/firebase";

export const Map = () => {
    const [locations, setLocations] = useState<{ [key: string]: Location }>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const locs = await getUserLocations();
                setLocations(locs);
            } catch (err) {
                setError("Failed to fetch locations");
            }
        };

        fetchLocations();
    }, []);
    console.log("error loading locations", error);

    return (
        <Box height={"100%"} width={"100%"}>
            <MapContainer
                center={[51.505, -0.09]}
                zoom={3}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {Object.entries(locations).map(([key, loc]) => (
                    <Marker key={key} position={[loc.lat, loc.lng]} />
                ))}
            </MapContainer>
        </Box>
    );
};
