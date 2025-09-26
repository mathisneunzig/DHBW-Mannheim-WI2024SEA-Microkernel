import { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import catImage from "./cat-dictionary-1024x662.jpg"

export const VictorsPluginPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const wordWithDefinition = (ctx.read.entity("definitions") as { id: string; word: string; definition: string}[]) ?? [];
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const fetchDefinition = async () => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if (!response.ok) {
        throw new Error("Failed to fetch definition");
    } else {
        const data = await response.json();

        const fetchedDefinition = data[0]?.meanings[0]?.definitions[0]?.definition
        setDefinition(fetchedDefinition);
        ctx.write.exec("definitions","add",{ word: word.trim(), definition: fetchedDefinition.trim() }); 
        console.log(ctx.read.entity("definitions"));
      }
  }

  return (
    <div style={{ padding: 16 }}>
      <h1> Definition Finder </h1>
      <img src={catImage} width="400"/> 
      <p>Type in an english word, the definition will appear under the box</p>
      <input value={word} onChange={e => setWord(e.target.value)} placeholder="e.g. Cat" />
      <button
        onClick={fetchDefinition}
      >Get Definition</button>
      <p>Result: {definition}</p>
      <p>Last Results:</p>
      <ul>
        {wordWithDefinition.map((e) => (
          <li 
            key={e.id} 
          >
            {e.word} : {e.definition}
            <button 
              onClick={() => { ctx.write.exec("definitions","remove",{ id: e.id }) }}>
                Löschen
            </button> 
          </li>
        ))}
      </ul>
    </div>

  );
};