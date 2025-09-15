import { pluginManager } from "../../app/pluginManager";
import { Question } from "./types";

pluginManager.register({
    id: "TriviaProvider",
    route: "/TriviaProvider",
    component: () => null,
    tile: "Trivia ≽^•⩊•^≼",
    color1: "#f0f8ff",
    color2: "#00bfff",
    spin: 45,
    permissions: ["question.read", "question.write", "users.read"],
    provides: [
        {
            entity: "question",
            initial: [{ id: "1", question: "What is the capital of Australia?", answer: "Canberra" },
            { id: "2", question: "Which chemical element has the symbol 'O'?", answer: "Oxygen" },
            { id: "3", question: "In which year did the Berlin Wall fall?", answer: "1989" },
            { id: "4", question: "Who wrote the novel '1984'?", answer: "George Orwell" },
            { id: "5", question: "Which language has the most native speakers worldwide?", answer: "Mandarin Chinese" },
            { id: "6", question: "Which programmer is considered the creator of Python?", answer: "Guido van Rossum" },
            { id: "7", question: "Which country won the 2014 FIFA World Cup?", answer: "Germany" },
            { id: "8", question: "Which animal is the largest living animal on Earth?", answer: "Blue whale" },
            { id: "9", question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" },
            { id: "10", question: "Which organ in the human body is primarily responsible for filtering blood?", answer: "Kidneys" },
            { id: "11", question: "What is the hardest natural substance on Earth?", answer: "Diamond" },
            { id: "12", question: "In computing, what does 'HTML' stand for?", answer: "HyperText Markup Language" },
            { id: "13", question: "What is the smallest country in the world by land area?", answer: "Vatican City" },
            { id: "14", question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
            { id: "15", question: "Which ocean is the largest on Earth?", answer: "Pacific Ocean" }] as Question[],
            commands: {
                add: (state, payload) => {
                    const questions = (state as Question[]) ?? [];
                    const { question, answer } = payload as { question: string; answer: string };
                    const newId = (questions.length + 1).toString();
                    const newQuestion: Question = {
                        id: newId,
                        question: question,
                        answer: answer,
                    };
                    return [...questions, newQuestion];
                }
            }
        }
    ]
});
