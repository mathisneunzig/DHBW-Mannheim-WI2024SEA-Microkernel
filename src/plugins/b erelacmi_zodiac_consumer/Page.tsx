import React, { useState } from "react";

export const ZodiacConsumerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
    const users = ctx.read.users();
    const [savedZodiac, setSavedZodiac] = useState("");

    const zodiacSigns = [
        { sign: "♈ Widder", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7499590052792585494?q=aries%20dopamineoracle&t=1757508928685", dates: "21. März - 19. April" },
        { sign: "♉ Stier", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7499965490576641302", dates: "20. April - 20. Mai" },
        { sign: "♊ Zwillinge", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7521489538254998806?q=gemini%20dopamineoracle&t=1757508894339", dates: "21. Mai - 20. Juni" },
        { sign: "♋ Krebs", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7518355136155094294?q=cancer%20dopamineoracle&t=1757508628973", dates: "21. Juni - 22. Juli" },
        { sign: "♌ Löwe", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7534090104596466967?q=leo%20dopamineoracle&t=1757508827892", dates: "23. Juli - 22. August" },
        { sign: "♍ Jungfrau", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7522990088662355222?q=virgo%20dopamineoracle&t=1757508797758", dates: "23. August - 22. September" },
        { sign: "♎ Waage", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7522246052469034262?is_from_webapp=1&sender_device=pc", dates: "23. September - 22. Oktober" },
        { sign: "♏ Skorpion", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7502933990467226902", dates: "23. Oktober - 21. November" },
        { sign: "♐ Schütze", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7546577551301414166", dates: "22. November - 21. Dezember" },
        { sign: "♑ Steinbock", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7542656622875905282?q=capricorn%20dopamineoracle&t=1757508701324", dates: "22. Dezember - 19. Januar" },
        { sign: "♒ Wassermann", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7520402179157478678?q=aquarius%20dopamineoracle&t=1757508628973", dates: "20. Januar - 18. Februar" },
        { sign: "♓ Fische", tiktok: "https://www.tiktok.com/@dopamine.oracle/video/7546685646065175830", dates: "19. Februar - 20. März" }
    ];

    const saveZodiacToUser = () => {
        if (savedZodiac && users.length > 0) {
            // Erweitere den ersten User um das Zodiac Sign
            const updatedUser = {
                ...users[0],
                zodiacSign: savedZodiac
            };
            
            // In einem echten System würde hier ctx.write.updateUser() aufgerufen
            alert(`Zodiac Sign ${savedZodiac} für ${users[0]?.firstName || 'User'} gespeichert!`);
        }
    };

    const currentZodiac = zodiacSigns.find(z => z.sign === savedZodiac);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Mein Sternzeichen Dashboard</h2>
            
            {users.length > 0 && (
                <div style={{ marginBottom: "20px", padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
                    <h3>Hallo {users[0].firstName}!</h3>
                    <p>Wähle dein Sternzeichen aus:</p>
                    
                    <select 
                        value={savedZodiac} 
                        onChange={(e) => setSavedZodiac(e.target.value)}
                        style={{ marginRight: "10px", padding: "5px" }}
                    >
                        <option value="">-- Bitte wählen --</option>
                        {zodiacSigns.map((zodiac, index) => (
                            <option key={index} value={zodiac.sign}>
                                {zodiac.sign}
                            </option>
                        ))}
                    </select>
                    
                    <button 
                        onClick={saveZodiacToUser}
                        disabled={!savedZodiac}
                        style={{ 
                            padding: "5px 15px", 
                            backgroundColor: savedZodiac ? "darkblue" : "gray",
                            color: "white",
                            border: "none",
                            borderRadius: "3px"
                        }}
                    >
                        Speichern
                    </button>
                </div>
            )}

            {currentZodiac && (
                <div style={{ padding: "20px", backgroundColor: "#e8f4fd", borderRadius: "8px" }}>
                    <h3>Dein Sternzeichen: {currentZodiac.sign}</h3>
                    <p><strong>Zeitraum:</strong> {currentZodiac.dates}</p>
                    
                    <button 
                        onClick={() => window.open(currentZodiac.tiktok, '_blank')}
                        style={{ 
                            padding: "10px 20px", 
                            backgroundColor: "darkblue", 
                            color: "white", 
                            border: "none", 
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        TikTok für {currentZodiac.sign} öffnen
                    </button>
                </div>
            )}

            <div style={{ marginTop: "20px", fontSize: "small", color: "gray" }}>
                <p>Anzahl User im System: {users.length}</p>
            </div>
        </div>
    );
};
