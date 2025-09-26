export type Password = {
    id: string;
    generatedPassword: string;
    length: number;
    useLowerCase: boolean;
    useUpperCase: boolean;
    useNumbers: boolean;
    useSymbols: boolean;
    allowedChars: string;
};