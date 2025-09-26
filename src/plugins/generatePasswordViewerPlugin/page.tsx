import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import {Password} from "../generatePasswordProviderPlugin/types.ts";

export const PasswordViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
    const passwords = (ctx.read.entity("passwords") as Password[]) ?? [];

    const [useLowerCase, setUseLowerCase] = useState(true);
    const [useUpperCase, setUseUpperCase] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useSymbols, setUseSymbols] = useState(true);

    const [length, setLength] = useState(12);

    const handleGenerate = () => {
        ctx.write.exec("passwords", "generatePassword", {
            length,
            useLowerCase,
            useUpperCase,
            useNumbers,
            useSymbols,
        });
    };

    return (
        <div style={{ padding: 16 }}>
            <h3>Passwörter</h3>
            <p style={{ fontSize: 14, color: "#555", marginBottom: 12 }}>
                Mindestlänge: 4 | Maximallänge: 100
                <br />
                Bitte gib deine Parameter an. Bei ungültigen Angaben wird ein
                Standardwert angenommen.
            </p>

            <div style={{ marginBottom: 12 }}>
                <label style={{ display: "block", marginBottom: 4 }}>
                    <input
                        type="checkbox"
                        checked={useLowerCase}
                        onChange={(e) => setUseLowerCase(e.target.checked)}
                    />
                    {" "}Kleinbuchstaben
                </label>
                <label style={{ display: "block", marginBottom: 4 }}>
                    <input
                        type="checkbox"
                        checked={useUpperCase}
                        onChange={(e) => setUseUpperCase(e.target.checked)}
                    />
                    {" "}Großbuchstaben
                </label>
                <label style={{ display: "block", marginBottom: 4 }}>
                    <input
                        type="checkbox"
                        checked={useNumbers}
                        onChange={(e) => setUseNumbers(e.target.checked)}
                    />
                    {" "}Zahlen
                </label>
                <label style={{ display: "block", marginBottom: 4 }}>
                    <input
                        type="checkbox"
                        checked={useSymbols}
                        onChange={(e) => setUseSymbols(e.target.checked)}
                    />
                    {" "}Symbole
                </label>

                <div style={{ marginTop: 8 }}>
                    <label>
                        Länge:&nbsp;
                        <input
                            type="number"
                            min={4}
                            max={100}
                            value={length}
                            onChange={(e) => setLength(Number(e.target.value))}
                            style={{ width: 60 }}
                        />
                    </label>
                </div>
            </div>

            <div style={{ marginBottom: 16 }}>
                <button onClick={handleGenerate} disabled={!ctx.can("passwords.write")}>
                    Passwort generieren
                </button>
            </div>

            <div>
                {passwords.length > 0 ? (
                    passwords.map((password) => (
                        <div
                            key={password.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                marginBottom: 4,
                            }}
                        >
                            <span>{password.generatedPassword}</span>
                            <button
                                onClick={() =>
                                    ctx.write.exec("passwords", "removePassword", { id: password.id })
                                }
                                disabled={!ctx.can("passwords.write")}
                            >
                                Löschen
                            </button>
                        </div>
                    ))
                ) : (
                    <div>Keine Passwörter vorhanden.</div>
                )}
            </div>
        </div>
    );
};
