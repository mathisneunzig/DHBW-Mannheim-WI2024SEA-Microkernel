import { pluginManager } from "../../app/pluginManager";
import { CatProfilePicturePickerPlugin } from "./Page";

pluginManager.register({
  id: "catProfilePicture",
  route: "/catProfilePicturePicker",
  component: CatProfilePicturePickerPlugin,
  tile: "Cat Profile Picture Picker 😺",
  color1: "#0099ee",
  color2: "#ee00cc",
  spin: 23,
  permissions: ["users.read","profileImage.write","profileImage.read","catImages.read","catImages.write"],
  provides: [
      {
        entity: "catImages",
        initial: [] as string[],
        commands: {
          add: (state, payload: any) => {
            const catImageList = Array.isArray(state) ? (state as string[]) : [];
            const url = String(payload ?? "");
            if (!url) return catImageList;
            return [...catImageList, url];
          },
          remove: (state, payload: any) => {
            const catImageList = Array.isArray(state) ? (state as string[]) : [];
            const url = String(payload ?? "");
            return catImageList.filter(n => n !== url);
          }
        }
      }
    ] 
});
