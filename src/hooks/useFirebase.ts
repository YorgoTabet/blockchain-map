import { firebaseApp } from "utils/firebase";

export const useFirebase = () => {
    return { app: firebaseApp };
};
