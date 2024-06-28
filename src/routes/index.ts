import { mapRoute } from "./map/index";
import { rootRoute } from "./root";
import { createRouter } from "@tanstack/react-router";

const routeTree = rootRoute.addChildren([mapRoute]);
export const router = createRouter({ routeTree });
