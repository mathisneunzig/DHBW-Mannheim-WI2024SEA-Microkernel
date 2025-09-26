import { pluginManager } from "../../app/pluginManager";
import { MoodConsumerPage } from "./page";

pluginManager.register({
  id: "moodConsumer",
  route: "/moodConsumer",
  component: MoodConsumerPage,
  tile: "Mood",
  color1: "yellow",
  color2: "green",
  spin: 35, 
  permissions: ["mood.read", "mood.write"],
  dependsOn: [
    { entity: "mood", permissions: ["mood.read", "mood.write"]}
  ]
});