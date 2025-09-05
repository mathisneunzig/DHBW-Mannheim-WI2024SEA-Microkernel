# Microkernel Plugin Aufgabe

## Ziel der Aufgabe
Du entwickelst ein eigenes **Provider-Plugin** und ein **Consumer-Plugin** für das bestehende Microkernel-System.  
Die Aufgabe wird **in Einzelarbeit** bearbeitet und ist mit **maximal 5 Punkten** bewertet.

## Abgabe
Die Abgabe erfolgt bis zum 18.09.2025 um 20:00 als Pull-Request an diesem GitHub-Repository

## Anforderungen
Deine Plugins sollen:
1. Sich korrekt beim `pluginManager` registrieren.  
2. **Mindestens eine Funktion** implementieren, die Daten **liest** und **verändert**.  
3. Mit den **Permissions** arbeiten, die das Kernel-System bereitstellt.

Das Provider-Plugin soll:
1. Eine neue **Variable/Entity/Datenstruktur** sowie mindestens eine neue **Permission** bereitstellen.
   
Das Consumer-Plugin soll:
1. Die neue Permission und Datenstruktur **nutzen**.

## Regeln
1. Pünktlich abgeben!
2. Matrikelnummer angeben!
3. Code selber schreiben: Kein Einsatz von AI-gesteuerten Tools!
4. Nicht bei anderen "abgucken"!

---

## Datenmodell des Kernels

Im Kernel existieren folgende Daten:

```ts
export type Address = {
  street: string;
  houseNr: string;
  zipCode: string;
  city: string;
  country: string;
};

export type KernelData = {
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
  entities: Record<string, unknown>;
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

## Infos zum Plugin

- Dein Plugin muss im Ordner `src/plugins/<deinName_suffix>` liegen.  
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

---

Dependencies installieren: `npm install`

App starten: `npm run dev`

---

## Tipps

- Achte darauf, dass du die Aufgabe **alleine** bearbeitest.  
- Deine Kachel erscheint **nicht** auf der Startseite, wenn dein Plugin unvollständig oder fehlerhaft registriert ist.  
- Überlege dir ein **sinnvolles Szenario**, das etwas zu den bestehenden Daten beiträgt (z. B. „Meine Lieblingsfarbe eintragen“, „Shopping List erweitern“, „Geburtstag anzeigen“).  

---

Viel Erfolg! 🚀
