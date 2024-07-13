import { getUserLocation } from "./location";
import { PublicKey } from "@solana/web3.js";
import { Location } from "model/location";
import { callLambdaFunction } from "services/user";

export interface userDetails {
    publicKey: PublicKey | null;
    name: string;
}

export const onConnected = async ({ publicKey, name }: userDetails) => {
    const location = await getUserLocation();

    callLambdaFunction(publicKey?.toString(), name, location as Location);
};
