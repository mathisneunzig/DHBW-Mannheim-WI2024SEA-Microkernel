import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PluginCtx } from "../../../app/pluginRuntime";
import "../style.css";

export const AddDrinkForm = ({ ctx }: { ctx: PluginCtx }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = () => {
    ctx.write.exec("coffee", "add", { name: name, link: link });
    setName("");
    setLink("");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-dark text-light p-3 vh-100">
      <h3>
        Add New Drink... <span className="badge text-bg-secondary"></span>
      </h3>
      <div className="mb-3 w-50 mx-auto">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="m-1 bg-dark text-light customph"
              type="text"
              placeholder="enter drink name..."
            ></Form.Control>
            <Form.Control
              name="link"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
              className="m-1 bg-dark text-light customph"
              type="text"
              placeholder="enter link to recipe..."
            ></Form.Control>
            <Button
              onClick={handleSubmit}
              className="btn btn-dark btn-outline-light m-1"
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
