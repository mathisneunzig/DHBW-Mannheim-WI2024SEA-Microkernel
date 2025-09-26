import { pluginManager } from "../../app/pluginManager";
import { Coffee } from "./types";

pluginManager.register({
  id: "coffeeProvider",
  route: "/coffeeProvider",
  component: () => null,
  tile: "Coffee Provider",
  color1: "<Farbe 1>",
  color2: "<Farbe 2>",
  spin: 45,
  permissions: ["coffee.read", "coffee.write"],
  provides: [
    {
      entity: "coffee",
      initial: [
        {
          name: "Cappuccino",
          link: "https://rauwolf-coffee.at/kaffee-rezepte/cappuccino/",
        },
        {
          name: "Flat White",
          link: "https://rauwolf-coffee.at/kaffee-rezepte/flat-white/",
        },
        {
          name: "Espresso",
          link: "https://www.roastmarket.de/magazin/espresso-zubereitung/",
        },
        {
          name: "Drip Coffee",
          link: "https://www.kaffeeroesterei-kirmse.de/drip-coffee",
        },
        {
          name: "Latte Macchiato",
          link: "https://rauwolf-coffee.at/kaffee-rezepte/latte-macchiato/",
        },
        {
          name: "Ristretto",
          link: "https://www.roeststaette.com/espresso-ristretto-lungo-unterschied/",
        },
        {
          name: "Americano",
          link: "https://docklands-coffee.de/kaffee-americano",
        },
        {
          name: "Mocha",
          link: "https://www.flatberry-market.de/blogs/tipps/caffe-mocha-kaffeerezept",
        },
      ] as Coffee[],
      commands: {
        add: (state, payload: any) => {
          const list = Array.isArray(state) ? state as { name: string; link: string }[] : [];
          const name = String(payload?.name ?? "");
          const link = String(payload?.link ?? "");
          if (!name || !link) return list;
          return [...list, { name: name, link:link }];
        },
      },
    },
  ],
});
