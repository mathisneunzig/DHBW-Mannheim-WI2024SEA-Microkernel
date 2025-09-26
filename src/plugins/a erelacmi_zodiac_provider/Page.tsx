import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";


export const ZodiacProviderPage = ({ ctx }) => {
    const [selectedZodiac, setSelectedZodiac] = useState("");
    
    const zodiacSigns = [
        { sign: "♈ Widder", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7499590052792585494?q=aries%20dopamineoracle&t=1757508928685" },
        { sign: "♉ Stier", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7499965490576641302" },
        { sign: "♊ Zwillinge", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7521489538254998806?q=gemini%20dopamineoracle&t=1757508894339" },
        { sign: "♋ Krebs", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7518355136155094294?q=cancer%20dopamineoracle&t=1757508628973" },
        { sign: "♌ Löwe", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7534090104596466967?q=leo%20dopamineoracle&t=1757508827892" },
        { sign: "♍ Jungfrau", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7522990088662355222?q=virgo%20dopamineoracle&t=1757508797758" },
        { sign: "♎ Waage", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7522246052469034262?is_from_webapp=1&sender_device=pc" },
        { sign: "♏ Skorpion", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7502933990467226902" },
        { sign: "♐ Schütze", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7546577551301414166" },
        { sign: "♑ Steinbock", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7542656622875905282?q=capricorn%20dopamineoracle&t=1757508701324" },
        { sign: "♒ Wassermann", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7520402179157478678?q=aquarius%20dopamineoracle&t=1757508628973" },
        { sign: "♓ Fische", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7546685646065175830" }
    ];

    const handleZodiacChange = (event) => {
        setSelectedZodiac(event.target.value);
    };

    const openTikTok = () => {
        const zodiac = zodiacSigns.find(z => z.sign === selectedZodiac);
        if (zodiac) {
            window.open(zodiac.tiktok, '_blank');
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>🔮 Zodiac Signs & TikTok</h2>
            
            <div style={{ marginBottom: "20px" }}>
                <label>Wähle dein Sternzeichen:</label>
                <select 
                    value={selectedZodiac} 
                    onChange={handleZodiacChange}
                    style={{ marginLeft: "10px", padding: "5px" }}
                >
                    <option value="">-- Bitte wählen --</option>
                    {zodiacSigns.map((zodiac, index) => (
                        <option key={index} value={zodiac.sign}>
                            {zodiac.sign}
                        </option>
                    ))}
                </select>
            </div>

            {selectedZodiac && (
                <div>
                    <p>Du hast gewählt: <strong>{selectedZodiac}</strong></p>
                    <button 
                        onClick={openTikTok}
                        style={{ 
                            padding: "10px 20px", 
                            backgroundColor: "purple", 
                            color: "white", 
                            border: "none", 
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        📱 Öffne TikTok für {selectedZodiac}
                    </button>
                </div>
            )}
        </div>
    );
};