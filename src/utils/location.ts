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
