import { pluginManager } from "../../app/pluginManager";
import { BucketlistViewerPage } from "./page";

pluginManager.register({
  id: "bucketlistViewer",
  route: "/bucketlist",
  component: BucketlistViewerPage,
  tile: "Bucket-Liste",
  color1: "#CDAF95",
  color2: "#ba9a7eff",
  spin: 45,
  permissions: ["list.read", "list.write", "list.edit"],
  dependsOn: [
    { entity: "list", permissions: ["list.read", "list.write", "list.edit"] },
  ],
});
