import { pluginManager } from "../../app/pluginManager";
import { Trivia } from "./page";

pluginManager.register({
  id: "Trivia",
  route: "/Trivia",
  component: Trivia,
  tile: "Trivia ≽^•⩊•^≼",
  color1: "#f0f8ff",
  color2: "#00bfff",
  spin: 45, 
  permissions: [ "question.read", "question.write", "users.read" ],
});