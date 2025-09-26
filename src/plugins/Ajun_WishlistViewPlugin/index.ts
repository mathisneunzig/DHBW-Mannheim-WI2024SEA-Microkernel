import { pluginManager } from "../../app/pluginManager";
import { WishlistViewerPage } from "./page";

pluginManager.register({
  id: "wishlistViewer",
  route: "/wishlist",
  component: WishlistViewerPage,
  tile: "Wishlist 🌟",
  color1: "#196ba1ff",
  color2: "#7b58c153",
  spin: 150,
  permissions: ["wishlist.read", "wishlist.write"],
  dependsOn: [
    { entity: "wishlist", permissions: ["wishlist.read", "wishlist.write"] }
  ]
});
