import { createRootRoute } from "@tanstack/react-router";
import { AppWrapper } from "components/templates/AppWrapper";

export const rootRoute = createRootRoute({
    component: AppWrapper
});
