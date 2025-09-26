import { pluginManager } from "../../app/pluginManager";
import { ZodiacProviderPage } from "./Page";

pluginManager.register({
    id: "erelacmi_zodiac_provider",
    route: "/zodiac-provider",
    component: ZodiacProviderPage,
    tile: "Zodiac Signs ♈",
    color1: "purple",
    color2: "pink",
    spin: 45,
    permissions: ["users.read", "users.write"]
});