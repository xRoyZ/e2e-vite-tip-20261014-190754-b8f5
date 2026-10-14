# Trinkgeld-Rechner

Eine schlichte Single-Page-Web-App (Vite + React + TypeScript), die aus
Betrag, Trinkgeld-Prozent und Personenzahl live das Trinkgeld, den
Gesamtbetrag und den Betrag pro Person berechnet. Die gesamte Rechenlogik
liegt in einer reinen, mit Vitest getesteten Funktion; die Anwendung läuft
vollständig clientseitig im Browser und überträgt keine Eingaben an einen
Server oder Dritte.

## Tech-Stack

- **Sprache:** TypeScript (strict)
- **Framework:** React mit Vite
- **Tests:** Vitest (Unit-Tests der reinen Berechnungsfunktion)
- **Laufzeit:** Node/npm, rein clientseitig im Browser, kein Server
- **Datenhaltung:** keine Persistenz, keine Datenbank

## Installation

Voraussetzung ist Node.js mit npm.

```bash
npm ci
```

## Entwicklung starten

```bash
npm run dev
```

Vite gibt danach eine lokale Adresse (standardmäßig
`http://localhost:5173`) aus, die im Browser geöffnet wird.

## Produktions-Build

```bash
npm run build
```

Der Build erzeugt das Verzeichnis `dist/`. Zum lokalen Anschauen des
Produktions-Builds:

```bash
npm run preview
```

## Bedienung

1. Im Feld **Betrag (€)** den Rechnungsbetrag eingeben, z. B. `100,00`.
2. Im Feld **Trinkgeld (%)** den gewünschten Prozentsatz eingeben, z. B. `10`.
   Als Dezimaltrennzeichen werden Komma und Punkt akzeptiert.
3. Im Feld **Personenzahl** die Anzahl der Personen angeben, z. B. `4`.

Die Berechnung erfolgt live, ohne Absenden. Solange nicht alle drei Felder
gültig ausgefüllt sind, zeigt der Ergebnisbereich keine Zahlen, sondern den
Platzhalter `—`. Sobald alle Felder gültig sind, erscheinen **Trinkgeld**,
**Gesamt** und **Pro Person** gleichzeitig. Alle Beträge werden deutsch mit
zwei Nachkommastellen und Euro-Zeichen angezeigt, z. B. `27,50 €`.

## Prüfen

```bash
npm run typecheck   # TypeScript-Prüfung
npm test            # Vitest-Unit-Tests
```

## Funktionen

- Live-Berechnung von Trinkgeld, Gesamtbetrag und Betrag pro Person
- Kaufmännische Rundung aller Beträge auf ganze Cent
- Akzeptiert Komma und Punkt als Dezimaltrennzeichen
- Deutsche Währungsformatierung mit genau zwei Nachkommastellen
- Feldspezifische deutsche Fehlermeldungen bei ungültiger Eingabe
- Neutraler Start ohne Fehlermeldungen; Hinweise erst nach Berührung eines Feldes
- Keine Übertragung von Eingaben an Server oder Dritte, keine Persistenz
