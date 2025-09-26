import React, { useEffect, useState } from 'react';
import type { PluginCtx } from "../../app/pluginRuntime";
import './App.css';

import img1 from './pictures/1.jpeg';
import img2 from './pictures/2.jpeg';
import img3 from './pictures/3.jpeg';
import img4 from './pictures/4.jpeg';
import img5 from './pictures/5.jpeg';
import img6 from './pictures/6.jpeg';
import img7 from './pictures/7.jpeg';
import img8 from './pictures/8.jpeg';
import img9 from './pictures/9.jpeg';
import img10 from './pictures/10.jpeg';
import img11 from './pictures/11.jpeg';
import img12 from './pictures/12.jpeg';
import img13 from './pictures/13.jpeg';
import img14 from './pictures/14.jpeg';
import img15 from './pictures/15.jpeg';

import dutchCat from './pictures/dutch-cat.jpeg';
import dutch from './pictures/dutch.jpeg';


const bilderSammlung = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];



export const MemoryViewerPage: React.FC<{ ctx: PluginCtx }> = ({ ctx }) => {

  let [kartenArray, setKartenArray] = useState<number[]>([]);

  let [umgedreht, setUmgedreht] = useState<number[]>([]);
  let [gefunden, setGefunden] = useState<number[]>([]);

  let [spielGewonnen, setSpielGewonnen] = useState<boolean>(false);


  useEffect(() => {
    spielStarten();
  }, [ctx]);


  let spielStarten = async () => {
    ctx.write.exec("array", "reset", {});
    ctx.write.exec("array", "shuffle", {});

    let neuesArray = ctx.read.entity("array") as number[];
    setKartenArray(neuesArray);
    setUmgedreht([]);
    setGefunden([]);
    setSpielGewonnen(false);
  };

  const karteKlicken = (index: number) => {
    if (umgedreht.length < 2 && !umgedreht.includes(index) && !gefunden.includes(index)) {

      let neuUmgedreht = [...umgedreht, index];
      setUmgedreht(neuUmgedreht);

      if (neuUmgedreht.length === 2) {

        let [ersterIndex, zweiterIndex] = neuUmgedreht;

        if (kartenArray[ersterIndex] === kartenArray[zweiterIndex]) {


          let neuGefunden = [...gefunden, ersterIndex, zweiterIndex];
          setGefunden(neuGefunden);



          setTimeout(() => {
            if (neuGefunden.length === kartenArray.length) {
              setSpielGewonnen(true);
            }
          }, 500);
        }


        setTimeout(() => {
          setUmgedreht([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="container">

      <div className="header">
        <img src={dutch} alt="Dutch" style={{ width: 350, marginRight: 25 }} />

        <h1 style={{ textAlign: 'center' }}>Kattengeheugenspel</h1>

        <img src={dutchCat} alt="Dutch cat" style={{ width: 350, marginLeft: 40 }} />
      </div>

      <h2 style={{ textAlign: 'center' }}>Fun voor man en kat</h2>



      <div className="memoryGrid">

        {kartenArray.map((wert: number, index: number) => (
          
          <div
            key={index}
            className={umgedreht.includes(index) || gefunden.includes(index) ? 'card flipped' : 'card'}
            onClick={() => karteKlicken(index)}
            
            style={{ width: 150, height: 150, backgroundColor: 'yellow' }}
          >

            {(umgedreht.includes(index) || gefunden.includes(index)) && <img src={bilderSammlung[wert - 1]} 
            style={{ width: 150, height: 150 }} />}

          </div>

        ))}

      </div>



      {spielGewonnen && (
        <div className="winMessage">
        🎉 Gefeliciteerd! 🎉<br/>
        Je hebt gewonnen! <br/>
        Ververs de pagina om opnieuw te starten. <br/>
        Seite neu Laden zum neu Starten
        </div>
        
      )}
    </div>
  );
};