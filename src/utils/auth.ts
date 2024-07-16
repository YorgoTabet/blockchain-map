import { getUserLocation } from "./location";
import { PublicKey } from "@solana/web3.js";
import { Location } from "model/location";
import { callLambdaFunction } from "services/user";

export interface userDetails {
    publicKey: PublicKey | null;
    name: string;
    avatar: File | null;
}

export const onConnected = async ({ publicKey, name, avatar }: userDetails) => {
    const location = await getUserLocation();
    callLambdaFunction(publicKey?.toString(), name, location as Location, avatar);
};
