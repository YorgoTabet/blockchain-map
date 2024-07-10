import Box from "@mui/material/Box";
import { Location } from "model/location";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { getUserLocations } from "services/firebase";

interface LocationWithUsername extends Location {
    name: string;
}

export const Map = () => {
    const [locations, setLocations] = useState<{ [key: string]: LocationWithUsername }>({});
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
                attributionControl={false}
                style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png" />
                {Object.entries(locations).map(([key, loc]) => (
                    <Marker key={key} position={[loc.lat, loc.lng]}>
                        <Tooltip>{loc.name}</Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </Box>
    );
};
