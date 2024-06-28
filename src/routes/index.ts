import { mapRoute } from "./map/index";
import { rootRoute } from "./root";
import { createRouter } from "@tanstack/react-router";

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const routeTree = rootRoute.addChildren([mapRoute]);
export const router = createRouter({ routeTree });
