import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import { Card, Deck } from "../nicoProviderPlugin/types";
import "./style.css";

const allCards: Card[] = [
    { img: getCardImage("Barbarians"), name: "Barbarians", elixir: 5 },
    { img: getCardImage("Archers"), name: "Archers", elixir: 3 },
    { img: getCardImage("Giant"), name: "Giant", elixir: 5 },
    { img: getCardImage("Knight"), name: "Knight", elixir: 3 },
    { img: getCardImage("Goblins"), name: "Goblins", elixir: 2 },
    { img: getCardImage("Mini P.E.K.K.A"), name: "Mini P.E.K.K.A", elixir: 4 },
    { img: getCardImage("Musketeer"), name: "Musketeer", elixir: 4 },
    { img: getCardImage("Baby Dragon"), name: "Baby Dragon", elixir: 4 },
    { img: getCardImage("Skeleton Army"), name: "Skeleton Army", elixir: 3 },
    { img: getCardImage("Witch"), name: "Witch", elixir: 5 },
    { img: getCardImage("Prince"), name: "Prince", elixir: 5 },
    { img: getCardImage("Bomber"), name: "Bomber", elixir: 2 },
    { img: getCardImage("Valkyrie"), name: "Valkyrie", elixir: 4 },
    { img: getCardImage("Fireball"), name: "Fireball", elixir: 4 },
    { img: getCardImage("Arrows"), name: "Arrows", elixir: 3 },
    { img: getCardImage("Goblin Barrel"), name: "Goblin Barrel", elixir: 3 },
    { img: getCardImage("Hog Rider"), name: "Hog Rider", elixir: 4 },
    { img: getCardImage("Inferno Tower"), name: "Inferno Tower", elixir: 5 },
    { img: getCardImage("Tesla"), name: "Tesla", elixir: 4 },
    { img: getCardImage("Cannon"), name: "Cannon", elixir: 3 },
    { img: getCardImage("Wizard"), name: "Wizard", elixir: 5 },
    { img: getCardImage("Mirror"), name: "Mirror", elixir: 0 },
    { img: getCardImage("Rage"), name: "Rage", elixir: 2 },
    { img: getCardImage("Rocket"), name: "Rocket", elixir: 6 },
    { img: getCardImage("Lightning"), name: "Lightning", elixir: 6 },
    { img: getCardImage("Zap"), name: "Zap", elixir: 2 },
    { img: getCardImage("Freeze"), name: "Freeze", elixir: 4 },
    { img: getCardImage("Poison"), name: "Poison", elixir: 4 },
    { img: getCardImage("Graveyard"), name: "Graveyard", elixir: 5 },
    { img: getCardImage("The Log"), name: "The Log", elixir: 2 },
    { img: getCardImage("Tornado"), name: "Tornado", elixir: 3 },
    { img: getCardImage("Clone"), name: "Clone", elixir: 3 },
    { img: getCardImage("Earthquake"), name: "Earthquake", elixir: 3 },
    { img: getCardImage("Giant Snowball"), name: "Giant Snowball", elixir: 2 },
    { img: getCardImage("Firecracker"), name: "Firecracker", elixir: 3 },
    { img: getCardImage("Royal Delivery"), name: "Royal Delivery", elixir: 3 },
    { img: getCardImage("Goblin Gang"), name: "Goblin Gang", elixir: 3 },
    {
        img: getCardImage("Elite Barbarians"),
        name: "Elite Barbarians",
        elixir: 6,
    },
    {
        img: getCardImage("Three Musketeers"),
        name: "Three Musketeers",
        elixir: 9,
    },
    { img: getCardImage("Royal Giant"), name: "Royal Giant", elixir: 6 },
    { img: getCardImage("Dark Prince"), name: "Dark Prince", elixir: 4 },
    { img: getCardImage("Guards"), name: "Guards", elixir: 3 },
    { img: getCardImage("Princess"), name: "Princess", elixir: 3 },
    { img: getCardImage("Ice Wizard"), name: "Ice Wizard", elixir: 3 },
    { img: getCardImage("Lumberjack"), name: "Lumberjack", elixir: 4 },
    { img: getCardImage("Battle Ram"), name: "Battle Ram", elixir: 4 },
    { img: getCardImage("Bandit"), name: "Bandit", elixir: 3 },
    { img: getCardImage("Royal Ghost"), name: "Royal Ghost", elixir: 3 },
    { img: getCardImage("Magic Archer"), name: "Magic Archer", elixir: 4 },
    { img: getCardImage("Electro Wizard"), name: "Electro Wizard", elixir: 4 },
    { img: getCardImage("Hunter"), name: "Hunter", elixir: 4 },
    { img: getCardImage("Zappies"), name: "Zappies", elixir: 4 },
    { img: getCardImage("Flying Machine"), name: "Flying Machine", elixir: 4 },
    { img: getCardImage("Goblin Giant"), name: "Goblin Giant", elixir: 6 },
    { img: getCardImage("Rascals"), name: "Rascals", elixir: 5 },
    { img: getCardImage("Wall Breakers"), name: "Wall Breakers", elixir: 2 },
    { img: getCardImage("Skeleton Barrel"), name: "Skeleton Barrel", elixir: 3 },
    { img: getCardImage("Fisherman"), name: "Fisherman", elixir: 3 },
    { img: getCardImage("Electro Dragon"), name: "Electro Dragon", elixir: 5 },
    { img: getCardImage("Skeleton King"), name: "Skeleton King", elixir: 4 },
    { img: getCardImage("Golden Knight"), name: "Golden Knight", elixir: 4 },
    { img: getCardImage("Archer Queen"), name: "Archer Queen", elixir: 5 },
    { img: getCardImage("Monk"), name: "Monk", elixir: 5 },
    { img: getCardImage("Phoenix"), name: "Phoenix", elixir: 4 },
    { img: getCardImage("Mighty Miner"), name: "Mighty Miner", elixir: 4 },
    { img: getCardImage("Goblin Drill"), name: "Goblin Drill", elixir: 4 },
    { img: getCardImage("Mother Witch"), name: "Mother Witch", elixir: 4 },
    {
        img: getCardImage("Skeleton Dragons"),
        name: "Skeleton Dragons",
        elixir: 4,},
    { img: getCardImage("Electro Giant"), name: "Electro Giant", elixir: 8 },
    { img: getCardImage("Ram Rider"), name: "Ram Rider", elixir: 5 },
    { img: getCardImage("Cannon Cart"), name: "Cannon Cart", elixir: 5 },
    { img: getCardImage("Goblin Cage"), name: "Goblin Cage", elixir: 4 },
    { img: getCardImage("Elixir Golem"), name: "Elixir Golem", elixir: 3 },
    { img: getCardImage("Battle Healer"), name: "Battle Healer", elixir: 4 },
    { img: getCardImage("Heal Spirit"), name: "Heal Spirit", elixir: 1 },
    { img: getCardImage("Electro Spirit"), name: "Electro Spirit", elixir: 1 },
    { img: getCardImage("Ice Spirit"), name: "Ice Spirit", elixir: 1 },
    { img: getCardImage("Fire Spirit"), name: "Fire Spirit", elixir: 1 },
    { img: getCardImage("Mega Minion"), name: "Mega Minion", elixir: 3 },
    { img: getCardImage("Minions"), name: "Minions", elixir: 3 },
    { img: getCardImage("Minion Horde"), name: "Minion Horde", elixir: 5 },
    { img: getCardImage("Night Witch"), name: "Night Witch", elixir: 4 },
];

function getCardImage(name: string): string {
    return `https://royaleapi.github.io/cr-api-assets/cards-150/${toSlug(
        name
    )}.png`;
}
function toSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/\./g, "")
        .replace(/'/g, "");
}
export const nicosPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
    const deck = ctx.read.entity("decks") as { cards: Card[] };
    const cards = deck.cards ?? [];
    let avgElixir = "0.0";

    if (cards.length > 0) {
        let sum = 0;
        for (let i = 0; i < cards.length; i++) {
            sum += cards[i].elixir;
        }
        let average = sum / cards.length;
        avgElixir = average.toFixed(1);
    }

    return (
        <div className="container">
            <h2> Your Deck :</h2>
            <p>Average Elixir cost : {avgElixir}</p>
            <div className="card-rows">
                {cards.map((c) => (
                    <div key={c.name} className="card" style={{ flex: "0 0 20%" }}>
                        <ul>
                            <img src={c.img} alt={c.name} width={60} />
                            <div>
                                {c.name} ({c.elixir})
                            </div>
                            <button
                                onClick={() =>
                                    ctx.write.exec("decks", "remove", { name: c.name })
                                }
                                disabled={!ctx.can("decks.write")}
                            >
                                Remove from your Deck
                            </button>
                        </ul>
                    </div>
                ))}
            </div>

            <h2> All Cards :</h2>
            <div className="card-rows">
                {allCards.map((c) => (
                    <ul>
                        <div key={c.name}>
                            <img src={c.img} alt={c.name} width={60} />
                            <div>
                                {c.name} ({c.elixir})
                            </div>
                            <button
                                onClick={() => ctx.write.exec("decks", "add", { card: c })}
                                disabled={!ctx.can("decks.write")}
                            >
                                Add to your Deck
                            </button>
                        </div>
                    </ul>
                ))}
            </div>
        </div>
    );
};
