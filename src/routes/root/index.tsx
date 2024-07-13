import { createRootRoute } from "@tanstack/react-router";
import { AppWrapper } from "components/templates/AppWrapper";
import "@solana/wallet-adapter-react-ui/styles.css"; // Ensure this import is present

export const rootRoute = createRootRoute({
    component: AppWrapper
});
