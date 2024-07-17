export const getUserLocation = async () => {
    const permission = await navigator.permissions.query({ name: "geolocation" });
    if (permission.state === "denied") {
        window.alert("You need to grant permission to link your location");
        return;
    }

    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    reject(new Error("Not supported: \n" + error.message));
                }
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
};
export const fetchCountryCity = async (
    lat: number,
    lng: number
): Promise<{ country: string; city: string }> => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.address) {
            const country = data.address.country || "";
            const city = data.address.city || data.address.town || data.address.village || "";

            return { country, city };
        } else {
            throw new Error("No results found");
        }
    } catch (error) {
        console.error("Error fetching country and city:", error);
        throw new Error("Failed to fetch country and city");
    }
};
