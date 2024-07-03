// src/utils/location.ts
import { PublicKey } from "@solana/web3.js";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

import { Location } from "../model/location";
import { fireStoreDb } from "utils/firebase";

export const storeUserLocation = async (loc: Location, key: PublicKey | null) => {
    if (!key) {
        console.error("PublicKey is null");
        return;
    }

    const userKey = key.toString();
    const locationData = {
        lat: loc.lat,
        lng: loc.lng,
        timestamp: new Date()
    };

    try {
        await setDoc(doc(fireStoreDb, "userLocations", userKey), locationData);
        console.log(`Location stored for user ${userKey}:`, locationData);
    } catch (error) {
        console.error("Error storing user location:", error);
    }
};

export const getUserLocations = async (): Promise<{ [key: string]: Location }> => {
    const locations: { [key: string]: Location } = {};
    try {
        const querySnapshot = await getDocs(collection(fireStoreDb, "userLocations"));
        querySnapshot.forEach((doc) => {
            locations[doc.id] = doc.data() as Location;
        });
    } catch (error) {
        console.error("Error getting user locations:", error);
    }
    return locations;
};
