import { pluginManager } from "../../app/pluginManager";
import { Video } from "./types";

pluginManager.register({
    id: "videoProvider",
    route: "/videoProvider",
    component: () => null,
    tile: "Video Provider",
    color1: "#f3f3f3",
    color2: "#007a04ff",
    spin: 90,
    permissions: ["videos.read", "videos.write"],
    provides: [
        {
            entity: "videos",
            initial: [] as Video[],
            commands: {
                add: (state, payload: any) => {
                    console.log("Add video");
                },
                remove: (state, payload: any) => {
                    console.log("Remove video");
                },
                like: (state, payload: any) => {
                    console.log("Liking video");
                },
            },
        },
    ],
});