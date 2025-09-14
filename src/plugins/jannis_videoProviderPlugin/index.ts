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
            initial: [
                {title: "Meoooooow", likes: 163, additional_information: "This cat meows :)", url: "https://www.youtube.com/shorts/8jM4XT-5CUA?feature=share"},
                {title: "Meow Song", likes: 42, additional_information: "Cat is singing a song :D", url: "https://www.youtube.com/watch?v=AtPrjYp75uA&list=RDAtPrjYp75uA&start_radio=1"}
            ] as Video[],
            commands: {
                add: (state, payload: any) => {
                    console.log("Add video");
                },
                remove: (state, payload: any) => {
                    console.log("Remove video");
                },
                like: (state, payload: any) => {
                    const videoList = Array.isArray(state) ? state as Video[] : [];
                    const urlToLike = String(payload.url);
                    
                    //Like video
                    videoList.map(video => {
                        if (video.url == urlToLike) {
                            video.likes++;
                        }
                    });

                    return videoList;
                },
            },
        },
    ],
});