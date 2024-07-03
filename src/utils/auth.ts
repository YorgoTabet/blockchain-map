import { storeUserLocation } from "services/firebase";
import { getUserLocation } from "./location";
import { PublicKey } from "@solana/web3.js";
import { Location } from "model/location";

export interface userDetails {
    publicKey: PublicKey | null;
}

export const onConnected = async ({ publicKey }: userDetails) => {
    const location = await getUserLocation();

    storeUserLocation(location as Location, publicKey);
};
