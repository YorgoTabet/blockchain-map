import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import { getUserLocations } from "services/firebase";
import { fetchCountryCity } from "utils/location";
import { Avatar } from "@mui/material";

interface LocationWithUsername {
    name: string;
    lat: number;
    lng: number;
    city?: string;
    country?: string;
    avatar?: string;
}

export const Map = () => {
    const [locations, setLocations] = useState<{ [key: string]: LocationWithUsername }>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const locs = await getUserLocations();
                const updatedLocs = await Promise.all(
                    Object.entries(locs).map(async ([, loc]) => {
                        const { city, country } = await getLocationInfo(loc.lat, loc.lng);
                        return { ...loc, city, country, avatar: loc.avatar };
                    })
                );
                setLocations(Object.fromEntries(updatedLocs.map((loc) => [loc.name, loc])));
            } catch (err) {
                setError("Failed to fetch locations");
            }
        };

        fetchLocations();
    }, []);

    console.log("error loading locations", error);

    const getLocationInfo = async (
        lat: number,
        lng: number
    ): Promise<{ city: string; country: string }> => {
        try {
            const { city, country } = await fetchCountryCity(lat, lng);
            return { city, country };
        } catch (error) {
            console.error("Failed to fetch city and country:", error);
            return { city: "Unknown", country: "Unknown" };
        }
    };

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
                        <Popup>
                            <div style={{ minWidth: "200px", minHeight: "150px" }}>
                                <Avatar
                                    src={loc.avatar ?? ""}
                                    sx={{ width: 60, height: 60, marginBottom: 2 }}
                                />
                                <h3>{loc.name}</h3>
                                <p>Country: {loc.country || "Loading..."}</p>
                                <p>City: {loc.city || "Loading..."}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Box>
    );
};
