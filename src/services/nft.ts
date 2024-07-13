const apiKey = "7bd8f65c-8ead-4d23-b4ce-8eb375aef5f5";

import { Helius } from "helius-sdk";

const helius = new Helius(apiKey);
export const getNftsForOwner = async (key: string, page: number) =>
    await helius.rpc.getAssetsByOwner({
        ownerAddress: key,
        page
    });
