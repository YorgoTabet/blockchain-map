import axios from "axios";
import { Location } from "model/location";

interface LambdaResponse {
    data: { statusCode?: 403 | 200; body: string };
}

interface LambdaBody {
    message: string;
}

const API_URL = "https://eogj888dzi.execute-api.eu-central-1.amazonaws.com/prod";

const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export const callLambdaFunction = async (
    publicKey = "",
    name: string,
    loc: Location,
    avatar: File | null
) => {
    if (!publicKey) window.alert("Invalid wallet credentials");
    console.log("storing to lambda");
    try {
        const avatarBase64 = avatar ? await getBase64(avatar) : null;

        const { data }: LambdaResponse = await axios.post(API_URL, {
            body: JSON.stringify({
                publicKey: publicKey,
                name: name,
                loc: loc,
                avatar: avatarBase64
            })
        });
        if (data?.statusCode === 403)
            throw new Error((JSON.parse(data?.body) as LambdaBody).message);
    } catch (error) {
        window.alert(error);
    }
};
