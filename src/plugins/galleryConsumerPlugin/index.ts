import { pluginManager } from "../../app/pluginManager";
import { GalleryConsumerPage } from "./page.tsx";


pluginManager.register({
  id: "galleryConsumer",
  route: "/gallery",
  component: GalleryConsumerPage,
  tile: "Gallery",
  color1: "rgba(255, 220, 242, 1)",
  color2: "rgba(219, 52, 158, 1)",
  spin: 90,
  permissions: ["gallery.read", "gallery.write"],
  dependsOn: [{ entity: "gallery", permissions: ["gallery.read", "gallery.write"] }]
});