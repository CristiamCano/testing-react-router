import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/to-do-list", "./routes/to-do-list.tsx") //Add a route (path, file)
] satisfies RouteConfig;
