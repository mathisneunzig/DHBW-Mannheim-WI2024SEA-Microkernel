# Microkernel Plugin Aufgabe

## Ziel der Aufgabe
Du entwickelst ein eigenes **Plugin** für das bestehende Microkernel-System.  
Die Aufgabe wird **in Einzelarbeit** bearbeitet und ist mit **maximal 5 Punkten** bewertet.

Dein Plugin soll:
1. Sich korrekt beim `pluginManager` registrieren.  
2. **Mindestens eine Funktion** implementieren, die Daten **liest** und **verändert**.  
3. Mit den **Permissions** arbeiten, die das Kernel-System bereitstellt.  

---

## Datenmodell des Kernels

Im Kernel existieren folgende Daten:

```ts
type Address = {
  street: string;
  houseNr: string;
  zipCode: string;
  city: string;
  country: string;
};

type KernelData = {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    address: Address;
    favColor: string | null;
    favAnimal: string | null;
    birthday: Date;
  }[];
  shoppingList: { id: string; item: string; qty: number }[];
  profileImage: string | null;
  todos: { id: string; text: string; done: boolean }[];
};
```

---

## Verfügbare Permissions

Für **jede Datenkategorie** gibt es **Lese-** und **Schreibrechte**.  
Diese musst du in deinem Plugin in der `permissions`-Liste angeben.  

| Permission              | Bedeutung                                |
|--------------------------|------------------------------------------|
| `users.read`             | Liste der User lesen                     |
| `users.write`            | User hinzufügen                          |
| `shoppingList.read`      | Einkaufsliste lesen                      |
| `shoppingList.write`     | Einträge hinzufügen/entfernen            |
| `profileImage.read`      | Profilbild anzeigen                      |
| `profileImage.write`     | Profilbild setzen/ändern                 |
| `todos.read`             | To-Do-Liste lesen                        |
| `todos.write`            | To-Do-Liste bearbeiten |

---

## Anforderungen an dein Plugin

- Dein Plugin muss im Ordner `src/plugins/<deinName>` liegen.  
- Es muss mindestens folgende Felder in `index.ts` enthalten:

```ts
pluginManager.register({
  id: "<deinPluginId>",
  route: "/<deinPluginId>",
  component: <DeinePageKomponente>,
  tile: "<Titel für die Kachel>",
  color1: "<Farbe 1>",
  color2: "<Farbe 2>",
  spin: 45, 
  permissions: ["<benötigte Permissions>"]
});
```

- Deine Page-Komponente soll:
  - Daten **lesen** (z. B. `todos` oder `users`)  
  - Daten **ändern** (z. B. neuen Todo-Eintrag hinzufügen, einen Todo abhaken, ein neues Item in die Einkaufsliste legen, Profilbild ändern, neuen User anlegen, etc.)  

---

## Tipps

- Achte darauf, dass du die Aufgabe **alleine** bearbeitest.  
- Deine Kachel erscheint **nicht** auf der Startseite, wenn dein Plugin unvollständig oder fehlerhaft registriert ist.  
- Überlege dir ein **sinnvolles Szenario**, das etwas zu den bestehenden Daten beiträgt (z. B. „Meine Lieblingsfarbe eintragen“, „Shopping List erweitern“, „Geburtstag anzeigen“).  

---

Viel Erfolg! 🚀
