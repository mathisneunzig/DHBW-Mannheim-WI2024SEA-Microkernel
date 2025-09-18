import React, { useState } from "react";
import type { PluginCtx } from "../../../app/pluginRuntime";
import "bootstrap/dist/css/bootstrap.min.css";
import { Placeholder } from "react-bootstrap";

export const SearchDrinkForm: React.FC<{
  ctx: PluginCtx;
}> = ({ ctx }) => {
  const current = ctx.read.entity("coffee") as { name: string; link: string }[];
  const [input, setInput] = useState("");
  const [filtered, setFiltered] = useState<{ name: string; link: string }[]>(
    []
  );
  const [searched, setSearched] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(true);

  const handleSearch = () => {
    const result = current.filter(
      (item) => item.name.toLowerCase() === input.toLowerCase()
    );
    setFiltered(result);
    setSearched(true);
    setInput("");
    if (result.length > 0) {
      setSearchBarOpen(true);
    }
  };

  const clear = () =>{
    setFiltered([]);
    setSearchBarOpen(true);
    setSearched(false)
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-dark text-light p-3 vh-100">
      {searchBarOpen && (
        <>
          <h3>
            Tell me your favorite coffee, and i'll show you how to make it.
          </h3>
          <Placeholder></Placeholder>
          <div className="input-group mb-3 w-50 mx-auto">
            <input
              type="text"
              className="form-control bg-dark text-light customph"
              onChange={(e) => {
                setInput(e.target.value);
                setSearched(false);
              }}
              placeholder="e.g. Cappuccino, Espresso"
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
            {filtered.map((recipe) => (
              setSearchBarOpen(false),
              <div className="card">
                <div className="card-header">{recipe.name}</div>
                <div className="card-body">
                  <a href={recipe.link} className="btn btn-primary">
                    Go to Recipe
                  </a>
                </div>
              </div>
            ))}
          </ul>
          {searched && filtered.length === 0 && (
            <div className="alert alert-warning" role="alert">
              Nothing found... <br></br> Add your favorite drink by clicking
              'Add'
            </div>
          )}
        </>
      )}
      {!searchBarOpen &&
        <div>
          {filtered.map((recipe) => (
              <div className="container m-2">
                  <h3>Great choice! Check out the coffee we discovered for you.</h3>
                  <Placeholder></Placeholder>
                  <div className="d-flex justify-content-between ">
                  <a href={recipe.link} className="btn btn-outline-light">
                    Get the Recipe
                  </a>
                  <button onClick={clear} className="btn btn-outline-light">Back to Search</button>
                  </div>
              </div>
            ))}
        </div>
      }
    </div>
  );
};