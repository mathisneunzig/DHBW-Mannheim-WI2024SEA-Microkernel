import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import tommy from "./img/tommy.png";
export const OiiaiViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const links =
    (ctx.read.entity("oiiaiLink") as {
      id: string;
      title: string;
      url: string;
    }[]) ?? [];
  const link = links[0];
  const [url, setUrl] = useState(link?.url ?? "");
  
  return (
    
    <div style={{ display: "flex",
    justifyContent: "center",
    alignItems: "center",
    }}>
    <div style={{ display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blueviolet",
    width: "50%",
    borderRadius: 12
    }}>
    <div style={{ padding: 16  }}>
      {" "}
      <img
        src={tommy}
        alt="Tommy"
        style={{
          width: 300,
          height: "auto",
          borderRadius: 12,
          marginBottom: 12,
        }}
      />{" "}
      <h3>{link.title}</h3>{" "}
      <div style={{ marginBottom: 8 }}>
        {" "}
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Link ändern"
        />{" "}
        <button
          onClick={() => {
            const v = url.trim();
            if (v) {
              ctx.write.exec("oiiaiLink", "update", {
                id: link.id,
                url: v,
              });
            }
          }}
          disabled={!ctx.can("oiiaiLink.write")}
        >
          {" "}
          Wechsel den Videolink!{" "}
        </button>{" "}
      </div>{" "}
      <div style={{ marginTop: 12 }}>
        {" "}
        <button
          onClick={() => window.open(link.url, "_blank")}
          disabled={!ctx.can("oiiaiLink.read")}
        >
          {" "}
          KATZE KATZE KATZE{" "}
        </button>{" "}
      </div>{" "}
    </div>
    </div>
    </div>
  );
};
