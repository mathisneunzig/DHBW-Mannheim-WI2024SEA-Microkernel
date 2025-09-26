import { pluginManager } from "../../app/pluginManager";
import { array } from "./array";

pluginManager.register({
  id: "memoryProvider",
  route: "/memoryProvider",
  component: () => null,
  tile: "Array Provider",
  color1: "#444",
  color2: "#777",
  spin: 15,
  permissions: ["array.read","array.write"],
  provides: [
    {
      entity: "array",
      initial: array,
      commands: {
        shuffle: (state: any, payload: any) => {
          let memoryArray = Array.isArray(state) ? state as number[] : [];
          for (let i = memoryArray.length - 1; i > 0; i--) {
            let rndm = Math.floor(Math.random() * (i + 1));
            [memoryArray[i], memoryArray[rndm]] = [memoryArray[rndm], memoryArray[i]];
          }
        },
        reset: (state: any, payload: any) => {
          const newMemoryArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
          state.length = 0;
            for (let num of newMemoryArray) {
               state.push(num); 
          }
        }
        
        
      }
    }
  ]
});