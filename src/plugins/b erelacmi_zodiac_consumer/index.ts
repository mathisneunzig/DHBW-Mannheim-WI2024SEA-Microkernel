import { pluginManager } from "../../app/pluginManager";
import { ZodiacConsumerPage } from "./Page";

pluginManager.register({
    id: "erelacmi_zodiac_consumer",
    route: "/zodiac-consumer",
    component: ZodiacConsumerPage,
    tile: "My Zodiac 🔮",
    color1: "darkblue",
    color2: "lightblue", 
    spin: -45,
    permissions: ["users.read", "users.write"]
});