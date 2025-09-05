import { pluginManager } from "../../app/pluginManager";
import { VideoViewerPage } from "./Page";

pluginManager.register({
    id: "videoViewer",
    route: "/videoViewer",
    component: VideoViewerPage,
    tile: "Video Viewer",
    color1: "#cfceceff",
    color2: "#007a04ff",
    spin: 90,
    permissions: ["videos.read", "videos.write"],
});