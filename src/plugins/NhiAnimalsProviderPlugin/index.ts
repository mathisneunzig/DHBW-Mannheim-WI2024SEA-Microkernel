import { pluginManager } from "../../app/pluginManager";
import { Animal } from "./types";

import pinguinImg from "../NhiAnimalsViewerPlugin/assets/pinguin.jpg";
import catImg from "../NhiAnimalsViewerPlugin/assets/hauskatze.jpg";
import elephantImg from "../NhiAnimalsViewerPlugin/assets/elefant.jpg";
import pandaImg from "../NhiAnimalsViewerPlugin/assets/panda.jpg";
import tigerImg from "../NhiAnimalsViewerPlugin/assets/sibirischer-tiger.jpg";
import papageiImg from "../NhiAnimalsViewerPlugin/assets/papagei.jpg";


pluginManager.register({
  id: "animalsProvider",
  route: "/animalsProvider",
  component: () => null,
  tile: "Animals Provider",
  color1: "#ffcc00",
  color2: "#ff9900",
  spin: 10,
  permissions: ["animals.read","animals.write"],
  provides: [
    {
      entity: "animals",
      initial: [
        { 
          id: "1",
          name: "Hauskatze",
          species: "Felis catus",
          habitat: "Häuser, Wohnungen und Gärten weltweit",
          diet: "Carnivore - Fleisch, Fisch, Katzenfutter",
          lifespan: "12-18 Jahre",
          funFact: "Katzen haben über 100 verschiedene Laute, während Hunde nur etwa 10 haben!",
          imageUrl: catImg,
          description: "Elegante und unabhängige Haustiere mit ausgeprägtem Jagdinstinkt."
       
        },
        { 
          id: "2", 
          name: "Kaiserpinguin",
          species: "Aptenodytes forsteri",
          habitat: "Antarktisches Packeis",
          diet: "Carnivore - Fische, Krill, Tintenfische",
          lifespan: "15-20 Jahre",
          funFact: "Pinguinväter brüten die Eier 64 Tage lang bei -40°C aus!",
          imageUrl: pinguinImg,
          description: "Majestätische Seevögel, die perfekt an das Leben in der Antarktis angepasst sind."
          
        },
        { 
          id: "3",
          name: "Afrikanischer Elefant",
          species: "Loxodonta africana",
          habitat: "Savannen und Wälder Afrikas",
          diet: "Herbivore - Gräser, Früchte, Rinde",
          lifespan: "60-70 Jahre",
          funFact: "Elefanten können bis zu 150 kg Nahrung pro Tag konsumieren!",
          imageUrl: elephantImg ,
          description: "Majestätische Giganten mit ausgeprägter Intelligenz und komplexem Sozialverhalten."
         
        },
        { 
          id: "4", 
          name: "Sibirischer Tiger",
          species: "Panthera tigris altaica",
          habitat: "Taiga und Wälder Sibiriens",
          diet: "Carnivore - Hirsche, Wildschweine",
          lifespan: "15-20 Jahre",
          funFact: "Größte lebende Katzenart der Welt!",
          imageUrl: tigerImg,
          description: "Kraftvolle Raubkatze mit markanten Streifen und beeindruckender Sprungkraft."
          
        },
        {
          id: "5",
          name: "Pandabär", 
          species: "Ailuropoda melanoleuca",
          habitat: "Bergwälder Chinas",
          diet: "99% Bambus",
          lifespan: "20-25 Jahre",
          funFact: "Pandas haben einen 'Pseudo-Daumen' zum Bambusgreifen!",
          imageUrl: pandaImg,
          description: "Charismatische Bären mit schwarz-weißem Fell und entspanntem Lebensstil."
        },
        {
          id: "6",
          name: "Ara-Papagei",
          species: "Ara macao",
          habitat: "Regenwälder Südamerikas",
          diet: "Früchte, Nüsse, Samen, Blüten",
          lifespan: "50-80 Jahre",
          funFact: "Aras können über 100 verschiedene Wörter lernen und haben eine Intelligenz wie ein 5-jähriges Kind!",
          imageUrl: papageiImg,
          description: "Farbenprächtige, hochintelligente Vögel mit starken sozialen Bindungen und beeindruckender Sprachfähigkeit."         
        }        
      ] as Animal[],
      commands: {
        add: (state, payload) => {
            const animal = payload as Animal;
            const list = Array.isArray(state) ? state as Animal[] : [];
            return [...list, { ...animal, id: crypto.randomUUID() }];
        },
        remove: (state, payload) => {
            const id = (payload as { id : string }).id;
            const list = Array.isArray(state) ? state as Animal[] : [];
            return list.filter(a => a.id !== id);

        },
        like: (state, payload: any) => {
          const animals = Array.isArray(state) ? state as Animal[] : [];
          const {id} = payload;
          return animals.map(animal => 
            animal.id === id ? {...animal, likes: (animal.likes ?? 0) + 1 } : animal
          );
        }     
      }
    }
  ]
});