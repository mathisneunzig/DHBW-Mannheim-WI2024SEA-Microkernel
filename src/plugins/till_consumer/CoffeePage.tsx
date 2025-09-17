import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddDrinkForm } from "./AddDrinkForm";

export const CoffeePage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const current = ctx.read.entity("coffee") as { name: string; link: string }[];
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState<{ name: string; link: string }[]>(
    []
  );
  const [searched, setSearched] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(true);

  const handleSearch = () => {
    const result = current.filter(
      (item) => item.name.toLowerCase() === input.toLowerCase()
    );
    setFiltered(result);
    setSearched(true);
    setInput("");
  };

  return (
    <div className="bg-dark text-light">
      <div className="d-flex justify-content-between p-3">
        <button
          onClick={() => {
            setOpenSearchBar(true);
          }}
          type="button"
          className="btn btn-outline-light"
        >
          Search
        </button>
        <button
          onClick={() => {
            setOpenSearchBar(false);
          }}
          type="button"
          className="btn btn-outline-light"
        >
          Add
        </button>
      </div>

      {openSearchBar && (
        <div className="d-flex flex-column justify-content-center align-items-center bg-dark text-light p-3 vh-100">
          <h3>
            Enter your fav Coffee-Drink to get the recipe... <span className="badge text-bg-secondary"></span>
          </h3>
          <div className="input-group mb-3 w-50 mx-auto">
            <input
              type="text"
              className="form-control bg-dark text-light customph"
              aria-label="Coffee Drink"
              aria-describedby="button-addon2"
              onChange={(e) => {
                setInput(e.target.value);
                setSearched(false);
              }}
              placeholder="Enter your drink..."
            />
            <button
              onClick={handleSearch}
              type="button"
              className="btn btn-outline-light"
            >
              Suchen
            </button>
          </div>
          <ul>
            {filtered.map((recipe, idx) => (
              <p key={idx}>
                <a href={recipe.link}>{recipe.name}</a>
              </p>
            ))}
          </ul>
          {searched && filtered.length === 0 && <div className="alert alert-warning" role="alert">Nothing found... <br></br> Add your favorite drink by clicking 'Add'</div>}
        </div>
      )}

      {!openSearchBar && <AddDrinkForm ctx={ctx}/>}
    </div>
  );
};
