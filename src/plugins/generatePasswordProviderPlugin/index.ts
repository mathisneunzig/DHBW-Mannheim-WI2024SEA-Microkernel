import { pluginManager } from "../../app/pluginManager";
import { Password } from "./types";

pluginManager.register({
  id: "generatePasswordProvider",
  route: "/generatePasswordProvider",
  component: () => null,
  tile: "Password Generator",
  color1: "#444",
  color2: "#777",
  spin: 15,
  permissions: ["passwords.read","passwords.write"],
  provides: [
    {
      entity: "passwords",
      initial: [] as Password[],
      commands: {
        generatePassword: (state: any = [], payload: any = {}) => {

          function buildfillAllowedChars(passwordInstance: Password): string {
            const charOptions = [
              "abcdefghijklmnopqrstuvwxyz",
              "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
              "0123456789",
              "!@#$%^&*()_-+=<>?/{}[]"
            ];

            let allowedChars = "";

            if (passwordInstance.useLowerCase) allowedChars += charOptions[0];
            if (passwordInstance.useUpperCase) allowedChars += charOptions[1];
            if (passwordInstance.useNumbers) allowedChars += charOptions[2];
            if (passwordInstance.useSymbols) allowedChars += charOptions[3];

            if (allowedChars.length === 0) {
              charOptions.forEach((element: string) => {
                allowedChars += element;
              });
            }

            return allowedChars;
          }

          function buildPassword(passwordInstance: Password): string {
            let pass = "";
            let length = passwordInstance.length;

            if (length < 4) {
              length = 4;
            } else if (length > 100) {
              length = 100;
            }

            for (let i = 0; i < length; i++) {
              pass += passwordInstance.allowedChars[Math.floor(Math.random() * passwordInstance.allowedChars.length)];
            }
            return pass;
          }

          const passwordInstance: Password = {
            id: crypto.randomUUID(),
            generatedPassword: "",
            length: payload.length ?? 12,
            useLowerCase: payload.useLowerCase ?? true,
            useUpperCase: payload.useUpperCase ?? true,
            useNumbers: payload.useNumbers ?? true,
            useSymbols: payload.useSymbols ?? true,
            allowedChars: ""
          };

          passwordInstance.allowedChars = buildfillAllowedChars(passwordInstance);

          passwordInstance.generatedPassword = buildPassword(passwordInstance);

          return [...(state as Password[]), passwordInstance];
        },

        removePassword: (state, payload: any) => {
          const list = Array.isArray(state) ? state as Password[] : [];
          const id = String(payload?.id ?? "");
          return list.filter(p => p.id !== id);
        }
      }
    }
  ]
});
