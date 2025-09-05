import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { KernelProvider, type KernelData } from "./app/kernel";

const initial: KernelData = {
  users: [
    {
      id: "u1",
      firstName: "Tommy",
      lastName: "Neunzig",
      address: {
        street: "Katzenstraße",
        houseNr: "1",
        zipCode: "69115",
        city: "Heidelberg",
        country: "Germany",
      },
      favColor: "Yellow",
      favAnimal: "Cat",
      birthday: new Date("2023-07-26"),
    },
  ],
  shoppingList: [
    { id: "s1", item: "Milk", qty: 1 },
    { id: "s2", item: "Cat treats", qty: 3 }
  ],
  profileImage: null,
  todos: [{ id: "t1", text: "Say hi 👋", done: false }],
  entities: {}
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KernelProvider initial={initial}>
      <App />
    </KernelProvider>
  </React.StrictMode>
);
