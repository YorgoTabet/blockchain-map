import { promises as fs } from "fs";
import fetch from "node-fetch";

const apiKey = "7bd8f65c-8ead-4d23-b4ce-8eb375aef5f5";
const url = `https://rpc.helius.xyz/?api-key=${apiKey}`;

const getAssetsByGroup = async () => {
    console.time("getAssetsByGroup");
    let page = 1;
    let assetList = [];

    try {
        while (page) {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: "my-id",
                    method: "getAssetsByGroup",
                    params: {
                        groupKey: "collection",
                        groupValue: "FQUab6C1H9jprxf2uJCX67p5LgY8T1Wo9NQfdW1uKQL7",
                        page: page,
                        limit: 1000
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const { result } = await response.json();

            assetList.push(...result.items);
            if (result.items.length < 1000) {
                page = false;
            } else {
                page++;
            }
        }

        const resultData = {
            totalResults: assetList.length,
            results: assetList
        };

        await fs.writeFile("results.json", JSON.stringify(resultData, null, 2));
        console.log("Results saved to results.json");
        console.timeEnd("getAssetsByGroup");
    } catch (error) {
        console.error("Error occurred:", error);
    }
};

getAssetsByGroup();
