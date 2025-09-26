export type Animal = {
  id: string;
  name: string;
  species: string;
  habitat: string;
  diet: string;
  lifespan: string;
  funFact: string;
  description: string;
  imageUrl: string;
  likes?: number;
  
}

export type Comment = {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: Date;
};