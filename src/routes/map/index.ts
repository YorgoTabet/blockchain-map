import { createRoute } from "@tanstack/react-router";
import { Map } from "components/organisms/Map";
import { rootRoute } from "routes/root";

export const mapRoute = createRoute({
    component: Map,
    path: "/",
    getParentRoute: () => rootRoute
});
