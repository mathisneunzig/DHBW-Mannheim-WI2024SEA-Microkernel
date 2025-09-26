import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";

export const MoodConsumerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
    const mood = (ctx.read.entity("mood") as { value: number; status: string } | null) ?? null;
    const [value, setValue] = useState(mood?.value ?? 0);
    const [status, setStatus] = useState(mood?.status ?? "");
    const [selectedValue, setSelectedValue] = useState<number | null>(null);

    const getEmoji = (value: number) => {
        if (value >= 7) return "🙂";
        if (value >= 4) return "😐";
        return "☹️";
    }

    return (
        <div style={{ padding: 16 }}>
            <h2>Mood</h2>
            {mood != null ? (
                <div>
                    <div style = {{ fontSize: 64}}> 
                        {getEmoji(mood.value)}
                    </div>
                    <div style = {{fontSize: 18}}>
                        {mood.status}
                    </div>
                    <div>
                        <button style={{ width: 100, height: 30, marginTop: 10}} onClick={() => {ctx.write.exec("mood","reset",{})} } disabled={!ctx.can("mood.write")}>
                        Delete mood
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{alignItems: "center", gap: 8}}>
                    <div>
                        {[1,2,3,4,5,6,7,8,9,10].map(value => (
                            <button style={{ width: 30, height: 30, marginRight: 8, backgroundColor: value == selectedValue ? "#bebebe" : "#eeeeee", borderRadius: 4}} key = {value} onClick={() => { setValue(value); setSelectedValue(value) } } disabled={!ctx.can("mood.write")}>
                                {value}
                            </button>
                        ))}
                    </div>
                    <div>
                        <input style={{ width: 364, height: 30, marginTop: 15, marginBottom : 15}} value={status} onChange={e => setStatus(e.target.value)} placeholder="Input status" />
                    </div>
                    <div>
                        <button style={{ width: 80, height: 30 }} onClick={() => { const s = status.trim(); if (s) { ctx.write.exec("mood","set",{ value: value, status: s }); setStatus(""); } }} disabled={!ctx.can("mood.write")}>
                        Set mood
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}