import { pluginManager } from "../../app/pluginManager";
import { SpotifyData } from "./type";

pluginManager.register({
  id: "spotifyProvider",
  route: "/spotifyProvider",
  component: () => null,
  tile: "Spotify Provider",
  color1: "#1DB954",
  color2: "#1ED760",
  spin: 0,
  permissions: ["SpotifyData.write", "SpotifyData.read"],

  provides:[
    {
      entity: "SpotifyData",
      initial: [
        {
          spotifyUrl: "https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?utm_source=generator"
        }
      ] ,

      commands: {
        add: (state, payload: any) => {
          const currentState = (typeof state === 'object' && state !== null) ? state : {};
          const newUrl = String(payload?.url ?? "");
          if (!newUrl) return currentState;
          return { ...currentState, spotifyUrl: newUrl };
        },
      }
    }
  ]
});

