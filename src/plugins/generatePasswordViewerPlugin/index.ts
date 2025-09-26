import { pluginManager } from "../../app/pluginManager";
import { PasswordViewerPage } from "./page";

pluginManager.register({
  id: "PasswordGenerateViewer",
  route: "/passwords",
  component: PasswordViewerPage,
  tile: "Password Viewer",
  color1: "#8a48ed",
  color2: "#ff4d4d",
  spin: 27,
  permissions: ["passwords.read","passwords.write"],
  dependsOn: [
    { entity: "passwords", permissions: ["passwords.read","passwords.write"] }
  ]
});
