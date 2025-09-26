import { pluginManager } from "../../app/pluginManager";
import  Profil  from "./page";

pluginManager.register({
  id: "Profil",
  route: "Profil",
  component: Profil,
  tile: "Profil",
  color1: "DarkOliveGreen",
  color2: "AntiqueWhite",
  spin: 45,
  permissions: ["SpotifyData.read", "SpotifyData.write"]
});
