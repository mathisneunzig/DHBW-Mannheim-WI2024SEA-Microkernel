import { pluginManager } from "../../app/pluginManager";
import { WishlistViewerPage } from "./page";

pluginManager.register({
  id: "wishlistViewer",
  route: "/wishlist",
  component: WishlistViewerPage,
  tile: "Wishlist",
  color1: "#33aa33",
  color2: "#88dd88",
  spin: 150,
  permissions: ["wishlist.read", "wishlist.write"],
  dependsOn: [
    { entity: "wishlist", permissions: ["wishlist.read", "wishlist.write"] }
  ]
});
