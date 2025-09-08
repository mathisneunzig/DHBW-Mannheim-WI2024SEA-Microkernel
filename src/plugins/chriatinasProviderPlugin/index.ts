import { pluginManager } from "../../app/pluginManager";
import { LinkEntity } from "./type";

pluginManager.register({
  id: "christinasProviderPlugin",
  route: "/christinasProviderPlugin",
  component: () => null,
  tile: "Christina Provider",
  color1: "#FAD0C4",
  color2: "#FFF7F3",
  spin: 220,
  permissions: ["emotionsLinks.read", "emotionsLinks.write"],


  provides: [
    {
      entity: "emotionsLinks",
      initial: [
        {
          id: "emotion1",
          emotion: "busy",
          url: "https://de.pinterest.com/pin/6473993209133041/",
        },
        {
          id: "emotion2",
          emotion: "hardworking",
          url: "https://de.pinterest.com/pin/9007268002001998/",
        },
        {
          id: "emotion3",
          emotion: "confused",
          url: "https://de.pinterest.com/pin/222154194114846024/",
        },
        {
          id: "emotion4",
          emotion: "bold",
          url: "https://tenor.com/de/view/me%C3%B8wmiing-sargentmeowww-gif-16222185005256641305",
        },
        {
          id: "emotion5",
          emotion: "angry",
          url: "https://de.pinterest.com/pin/681239881171020353/",
        },
        {
          id: "emotion6",
          emotion: "not convinced",
          url: "https://de.pinterest.com/pin/10133167906043464/",
        },
        {
          id: "emotion7",
          emotion: "happy",
          url: "https://de.pinterest.com/pin/6192518232009459/",
        },
        {
          id: "emotion8",
          emotion: "nonchalant",
          url: "https://de.pinterest.com/pin/917327017858842285/",
        }, 
        {
          id: "emotion9",
          emotion: "hungry",
          url: "https://de.pinterest.com/pin/69172544272008039/"
        },

        

      ] as LinkEntity[],
      commands: {
        add: (state, payload: any) => {
          const list = Array.isArray(state) ? (state as LinkEntity[]) : [];
          const emotion = String(payload?.text ?? "");
          const url = String(payload?.url ?? "");
          if (!emotion) return list;
          const id = "emotion" + Date.now(); // garantiert eindeutige ID
          return [...list, { id, emotion, url }];
        },
        remove: (state, payload: any) => {
          const list = Array.isArray(state) ? (state as LinkEntity[]) : [];
          const id = String(payload?.id ?? "");
          return list.filter(e => e.id !== id);
        },
      },
    },
  ],
});