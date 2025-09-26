import { pluginManager } from "../../app/pluginManager";
import { Card, Deck } from "./types";

pluginManager.register({
  id: "nicoProvider",
  route: "/nicoProvider",
  component: () => null,
  tile: "Nico Provider",
  color1: "#444",
  color2: "#777",
  spin: 15,
  permissions: ["decks.read","decks.write"],
  provides: [

    {
        entity:"decks",
        initial:{ cards:  [] }  as Deck,
        commands:{

        add: (state, payload: any) => {
            const deck =state as Deck;
         if(deck.cards.length>= 8) return state;
         if(deck.cards.find (c => c.name === payload.card.name)) return state;
         return{ ...deck, cards: [...deck.cards,payload.card]}
        },
        remove: (state , payload: any) => {
            const deck =state as Deck;

          return { ...deck, cards: deck.cards.filter((c)=> c.name !== payload.name)}
        },
        reset: ()=>({cards:[]} as Deck)

      },


    },
  ],
});
