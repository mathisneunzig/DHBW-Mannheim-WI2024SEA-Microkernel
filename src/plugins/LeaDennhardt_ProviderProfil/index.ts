import { pluginManager } from "../../app/pluginManager";
import { SpotifyData } from "./type";

// Registrierung des Provider-Plugins beim Kernel
pluginManager.register({
  id: "spotifyProvider",
  route: "/spotifyProvider",
  component: () => null, // kein React-Component
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
      ],
      commands: {
        add: (newUrl: string) => {
          // Validierung der URL
          if (!newUrl.startsWith("https://open.spotify.com/embed/")) {
            console.warn("Ungültige Spotify URL:", newUrl);
            return;
          }

          // In der initialen Datenstruktur speichern
          // Wir nehmen hier das erste Element in initial als Speicher
          const dataItem = pluginManager.getEntity("SpotifyData")[0] as SpotifyData;
          dataItem.spotifyUrl = newUrl;

          // Optional: auch direkt im Kernel speichern, falls Permissions nötig
          pluginManager.updateKernelData("entities.spotifyUrl", newUrl, "spotifyUrl.write");

          console.log("Neue Spotify URL gespeichert:", newUrl);
        }
      }
    }
  ]
});


// Funktion, um die Spotify URL zu setzen
export function setSpotifyUrl(url: string) {
  if (url.startsWith("https://open.spotify.com/embed/")) {
    spotifyData.spotifyUrl = url;
    // In Kernel speichern mit Permission
    pluginManager.updateKernelData("entities.spotifyUrl", url, "spotifyUrl.write");
    console.log("Spotify URL gesetzt:", url);
  } else {
    console.warn("Ungültige Spotify URL:", url);
  }
}

// Funktion, um die Spotify URL zu bekommen
export function getSpotifyUrl(): string | null {
  return spotifyData.spotifyUrl;
}
