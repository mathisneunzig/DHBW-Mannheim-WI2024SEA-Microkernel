import React, { useState } from "react";
import type { PluginCtx } from "../../app/pluginRuntime";
import { Animal } from "../NhiAnimalsProviderPlugin/types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import EmojiNatureIcon from "@mui/icons-material/EmojiNature";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CrueltyFreeIcon from "@mui/icons-material/CrueltyFree";

export const AnimalsViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {
  const animalsFromCtx = ctx.read.entity("animals") as Animal[] ?? [];
  const [animals, setAnimals] = useState<Animal[]>(animalsFromCtx);
  const [selected, setSelected] = useState<Animal | null>(null);

  const handleLike = (animal: Animal) => {
    const updatedAnimals = animals.map(a => 
      a.id === animal.id ? { ...a, likes: (a.likes ?? 0) + 1 } : a
    );
    
    setAnimals(updatedAnimals);
    
    if (selected && selected.id === animal.id) {
      setSelected({ ...selected, likes: (selected.likes ?? 0) + 1 });
    }

    ctx.write.exec("animals", "likes", { id: animal.id });
  }

  const handleImageClick = (animal: Animal) => {
    setSelected(animal);
  };

  return (
    <div style={{ 
      padding: "2rem",
      background: `
        linear-gradient(135deg, 
          rgba(76, 175, 80, 0.1) 0%, 
          rgba(139, 195, 74, 0.15) 25%,
          rgba(102, 187, 106, 0.1) 50%,
          rgba(67, 160, 71, 0.12) 75%,
          rgba(46, 125, 50, 0.08) 100%
        ),
        radial-gradient(circle at 20% 80%, rgba(129, 199, 132, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(165, 214, 167, 0.2) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(200, 230, 201, 0.15) 0%, transparent 50%)
      `,
      backgroundColor: "#f1f8e9",
      minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      
    <div style={{ 
        textAlign: "center", 
        marginBottom: "3rem",
        color: "#2e7d32",
        position: "relative",
        zIndex: 10
    }}>
      <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1rem"
      }}>
          <CrueltyFreeIcon style={{
            fontSize: "3.5rem",
            color: "#4caf50",
            filter: "drop-shadow(0 2px 4px rgba(76, 175, 80, 0.3))"
          }} />
          <h1 style={{ 
            fontSize: "3rem", 
            fontWeight: "800",
            margin: 0,
            textShadow: "0 2px 4px rgba(46, 125, 50, 0.2)",
            background: "linear-gradient(135deg, #2e7d32, #4caf50, #66bb6a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            DHBW Tiergarten
          </h1>
      </div>
        <p style={{ 
          fontSize: "1.2rem", 
          opacity: 0.8,
          margin: "1rem 0 0 0",
          color: "#388e3c"
        }}>
          Entdecken Sie die Wunder der Natur
        </p>
    </div>

    {/*Animal */}
    <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
        gap: "2.5rem",
        marginBottom: selected ? "3rem" : "0",
        position: "relative",
        zIndex: 5
    }}>
        {animals.map(a => (
          <div 
            key={a.id} 
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              borderRadius: "24px",
              padding: "0",
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(46, 125, 50, 0.15)",
              transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              cursor: "pointer",
              overflow: "hidden",
              transform: "translateY(0) rotate(0deg)",
              border: "2px solid rgba(139, 195, 74, 0.2)"
            }}
            
          > 
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img 
                src={a.imageUrl} 
                alt={a.name} 
                style={{ 
                  width: "100%", 
                  height: "240px", 
                  objectFit: "cover",
                  transition: "all 0.3s ease"
                }}
                onClick={() => handleImageClick(a)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
           
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(45deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1))",
                opacity: 0,
                transition: "opacity 0.3s ease",
                pointerEvents: "none"
              }} />
            </div>
            
            <div style={{ padding: "2rem 1.5rem" }}>
              <h3 style={{ 
                margin: "0 0 1.5rem 0", 
                fontWeight: "700", 
                fontSize: "1.4rem",
                color: "#2e7d32",
                textShadow: "0 1px 2px rgba(46, 125, 50, 0.1)"
              }}>
                {a.name}
              </h3>

              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                background: "linear-gradient(135deg, #4caf50, #66bb6a)",
                borderRadius: "30px",
                padding: "1rem 2rem",
                transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)"
              }}
              onClick={(e) => {
                e.stopPropagation(); 
                handleLike(a); 
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(76, 175, 80, 0.4)";
                e.currentTarget.style.background = "linear-gradient(135deg, #66bb6a, #4caf50)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(76, 175, 80, 0.3)";
                e.currentTarget.style.background = "linear-gradient(135deg, #4caf50, #66bb6a)";
              }}
              >
                <FavoriteIcon
                  style={{
                    fontSize: "1.3rem",
                    color: "white",
                    marginRight: "0.75rem",
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
                  }}
                />      
                <span style={{ 
                  color: "white", 
                  fontWeight: "700",
                  fontSize: "1.1rem",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)"
                }}>
                  {a.likes ?? 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
       
      {selected && (
        <div style={{ 
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          borderRadius: "28px",
          padding: "2.5rem",
          maxWidth: "800px",
          margin: "0 auto",
          boxShadow: "0 25px 80px rgba(46, 125, 50, 0.2)",
          animation: "slideUpBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          border: "3px solid rgba(139, 195, 74, 0.3)",
          position: "relative",
          zIndex: 20
        }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginBottom: "2rem",
            paddingBottom: "1.5rem",
            borderBottom: "3px solid rgba(139, 195, 74, 0.2)"
          }}>
            <h2 style={{ 
              margin: 0,
              fontSize: "2.5rem",
              fontWeight: "800",
              background: "linear-gradient(135deg, #2e7d32, #4caf50, #66bb6a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 2px 4px rgba(46, 125, 50, 0.1)"
            }}>
              {selected.name}
            </h2>
            <div style={{
              background: "rgba(139, 195, 74, 0.1)",
              borderRadius: "16px",
              padding: "0.75rem",
              transition: "all 0.3s ease",
              cursor: "pointer",
              border: "2px solid rgba(139, 195, 74, 0.2)"
            }}            
            >
              <CloseIcon 
                onClick={() => setSelected(null)} 
                style={{ 
                  cursor: "pointer",
                  fontSize: "1.8rem",
                  color: "#4caf50"
                }}
              />
            </div>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2.5rem"
          }}>
            {[
              { label: "Species", value: selected.species },
              { label: "Habitat", value: selected.habitat },
              { label: "Diet", value: selected.diet },
              { label: "Lifespan", value: selected.lifespan }
            ].map((item, index) => (
              <div key={index} style={{
                background: "linear-gradient(135deg, rgba(139, 195, 74, 0.08), rgba(165, 214, 167, 0.12))",
                borderRadius: "18px",
                padding: "1.5rem",
                border: "2px solid rgba(139, 195, 74, 0.15)"
              }}>
                <div style={{ 
                  fontWeight: "700", 
                  fontSize: "0.9rem",
                  color: "#388e3c",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.75rem"
                }}>
                  {item.label}
                </div>
                <div style={{ 
                  fontSize: "1.1rem",
                  color: "#2e7d32",
                  fontWeight: "600"
                }}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/*Fun Fact and Description */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(255, 193, 7, 0.15), rgba(255, 235, 59, 0.2))",
              borderRadius: "20px",
              padding: "2rem",
              marginBottom: "1.5rem",
              border: "2px solid rgba(255, 193, 7, 0.2)"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem"
              }}>
                <EmojiNatureIcon style={{
                  fontSize: "2rem",
                  color: "#f57f17",
                  marginRight: "1rem"
                }} />
                <h4 style={{ 
                  margin: 0,
                  color: "#f57f17",
                  fontSize: "1.3rem",
                  fontWeight: "700"
                }}>
                 Fun Fact
                </h4>
              </div>
              <p style={{ 
                margin: 0,
                color: "#3e2723",
                lineHeight: "1.7",
                fontSize: "1.1rem"
              }}>
                {selected.funFact}
              </p>
            </div>

            <div style={{
              background: "rgba(139, 195, 74, 0.08)",
              borderRadius: "20px",
              padding: "2rem",
              border: "2px solid rgba(139, 195, 74, 0.2)"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem"
              }}>
                <MenuBookIcon style={{
                  fontSize: "2rem",
                  color: "#2e7d32",
                  marginRight: "1rem"
                }} />
                <h4 style={{ 
                  margin: 0,
                  color: "#2e7d32",
                  fontSize: "1.3rem",
                  fontWeight: "700"
                }}>
                  Description
                </h4>
              </div>
              <p style={{ 
                margin: 0,
                color: "#1b5e20",
                lineHeight: "1.7",
                fontSize: "1.1rem"
              }}>
                {selected.description}
              </p>
            </div>
          </div>
      
          {/*Like-Button Enhance Effect */}
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center"
          }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center",
              background: "linear-gradient(135deg, #4caf50, #66bb6a)",
              borderRadius: "35px",
              padding: "1.25rem 2.5rem",
              transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              cursor: "pointer",
              boxShadow: "0 8px 30px rgba(76, 175, 80, 0.4)",
              border: "3px solid rgba(255, 255, 255, 0.3)"
            }}
            onClick={() => handleLike(selected)}
            >
              <FavoriteIcon
                style={{ 
                  cursor: "pointer", 
                  color: "white", 
                  marginRight: "1rem",
                  fontSize: "1.8rem",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                }}
              />
              <span style={{ 
                color: "white",
                fontWeight: "800",
                fontSize: "1.4rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)"
              }}>
                {selected.likes ?? 0} Likes
              </span>
            </div>
          </div> 
        </div>                                              
      )}
    </div>    
  );
};