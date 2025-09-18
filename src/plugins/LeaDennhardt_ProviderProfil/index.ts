import { pluginManager } from "../../app/pluginManager";
import { SpotifyData } from "./type";

// Registrierung des Provider-Plugins beim Kernel
pluginManager.register({
  id: "spotifyProvider",
  route: "/spotifyProvider",
  component: () => null, 
  tile: "Spotify Provider",
  color1: "#1DB954",
  color2: "#1ED760",
  spin: 0,
  permissions: ["SpotifyData.write", "SpotifyData.read", "ImageRead"],

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
          // 1. Stellt sicher, dass 'state' ein Objekt ist.
          const currentState = (typeof state === 'object' && state !== null) ? state : {};
          
          // 2. Extrahiert die neue URL sicher aus dem payload.
          const newUrl = String(payload?.url ?? "");
 
          // 3. Wenn keine URL übergeben wurde, wird der alte Zustand zurückgegeben.
          if (!newUrl) return currentState;
 
          // 4. Gibt ein NEUES Objekt zurück, das die 'spotifyUrl' überschreibt.
          return { ...currentState, spotifyUrl: newUrl };
        },
      }
    }
  ]
});

