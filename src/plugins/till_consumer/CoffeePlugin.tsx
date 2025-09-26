import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddDrinkForm } from "./Components/AddDrinkForm";
import { SearchDrinkForm } from "./Components/SearchDrinkForm";

export const CoffeePlugin: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const [openSearchBar, setOpenSearchBar] = useState("search");

  return (
    <div className="bg-dark text-light">
      <div className="d-flex justify-content-between p-3">
        <button
          onClick={() => {
            setOpenSearchBar("search");
          }}
          type="button"
          className="btn btn-outline-light"
        >
          Search
        </button>
        <button
          onClick={() => {
            setOpenSearchBar("add");
          }}
          type="button"
          className="btn btn-outline-light"
        >
          Add
        </button>
      </div>

      {openSearchBar === "search" && <SearchDrinkForm ctx={ctx}></SearchDrinkForm>}
      {openSearchBar === "add" && <AddDrinkForm ctx={ctx} />}
    </div>
  );
};
