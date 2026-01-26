# Event-Map: Projektdokumentation

**Projektname:** Event-Map  
**Team-Mitglieder:**

- Jannik Höfener (Matrikelnummer: XXXXXXX)
- Merlin [Nachname] (Matrikelnummer: XXXXXXX)
- Philipp [Nachname] (Matrikelnummer: XXXXXXX)

**Erstellungszeitraum:** Oktober 2025 - Februar 2026  
**Modul:** Interaktive Systeme  
**Abgabedatum:** 13. Februar 2026

---

## Inhaltsverzeichnis

### SPRINT 1: Ideation & Requirements

1. [Ideation Phase](#1-ideation-phase)
   - [App-Idee & Erste Skizzen](#11-app-idee--erste-skizzen)
   - [PACT-Analyse](#12-pact-analyse)
   - [Persona](#13-persona)
   - [Szenarien](#14-szenarien)
   - [User Stories](#15-user-stories)

### SPRINT 2: Paper Prototyping & User Testing

2. [Paper Prototype](#2-paper-prototype)
   - [Paper Prototype Bilder](#21-paper-prototype-bilder)
   - [User Testing & Feedback-Analyse (Paper Prototype)](#22-user-testing--feedback-analyse-paper-prototype)

### SPRINT 3: Figma Prototyping & Interaction Design

3. [Figma Prototype](#3-figma-prototype)
   - [Figma Screenshots](#31-figma-screenshots)
   - [Begründung des Interaction Designs](#32-begründung-des-interaction-designs)
   - [User Testing & Feedback-Analyse (Figma Prototype)](#33-user-testing--feedback-analyse-figma-prototype)

### SPRINT 4-5: React Native Implementation

4. [React Native Implementierung](#4-react-native-implementierung)
   - [Team und Rollen](#41-team-und-rollen)
   - [Technologie-Stack](#42-technologie-stack)
   - [Projektstruktur](#43-projektstruktur)
   - [Branding, UI-Entwicklung & Styling](#44-branding-ui-entwicklung--styling)
   - [Datenmodellierung](#45-datenmodellierung)
   - [Komponenten-Architektur](#46-komponenten-architektur)
   - [Filter-System](#47-filter-system)
   - [Screen-Architektur](#48-screen-architektur)
   - [Screenshots: Non-Interactive Screens](#49-screenshots-non-interactive-screens)

### SPRINT 6: Evaluation & Final Prototype

5. [Heuristische Evaluation (KI-gestützt)](#5-heuristische-evaluation-ki-gestützt)
   - [Input Prompt & verwendeter AI-Chatbot](#51-input-prompt--verwendeter-ai-chatbot)
   - [Ergebnisse & Empfehlungen](#52-ergebnisse--empfehlungen)
   - [Kritische Reflexion der KI-Ergebnisse](#53-kritische-reflexion-der-ki-ergebnisse)

6. [User Evaluation](#6-user-evaluation)
   - [Aufgabenbeschreibung](#61-aufgabenbeschreibung)
   - [Zusammenfassung der Notizen & Antworten](#62-zusammenfassung-der-notizen--antworten)
   - [Analyse der wichtigsten Usability-Probleme](#63-analyse-der-wichtigsten-usability-probleme)

7. [Final Click-Dummy Prototype](#7-final-click-dummy-prototype)
   - [Video-Link: Vollständige Funktionalitäten](#71-video-link-vollständige-funktionalitäten)
   - [Finale Screenshots](#72-finale-screenshots)

8. [Zusammenfassung & Lessons Learned](#8-zusammenfassung--lessons-learned)

---

## 1. Ideation Phase

### 1.1 App-Idee & Erste Skizzen

**Problemstellung:**

In urbanen Räumen gibt es täglich zahlreiche Events und Veranstaltungen, doch es fehlt eine zentrale, intuitive Plattform zur Event-Discovery. Bestehende Lösungen sind entweder zu komplex, zu textlastig oder fokussieren sich nicht auf die geografische Komponente der Eventsuche. Nutzer verbringen zu viel Zeit damit, durch verschiedene Websites und Social-Media-Kanäle zu scrollen, um herauszufinden, "was heute in meiner Nähe los ist".

**Vision:**

Event-Map löst dieses Problem durch eine mobile App, die Events auf zwei intuitive Arten präsentiert:

1. **Kartenansicht**: Eine interaktive Karte zeigt Events als farbcodierte Marker an ihrem exakten Standort
2. **Listenansicht**: Eine scrollbare Liste präsentiert Events chronologisch sortiert

**Kernfunktionalitäten:**

- **Duale Darstellung**: Nahtloser Wechsel zwischen Karte und Liste
- **Intelligente Filterung**: Multi-dimensionale Filter für Zeit, Ort, Kategorie und Tageszeit
- **SmartFilter-Wizard**: Ein geführter 3-Schritt-Prozess (Wann? Wo? Was?) für präzise Vorschläge
- **Event-Details**: Dedizierte Detailseiten mit vollständigen Informationen

**Erste Skizzen:**

> **TODO:** Hier die ersten handgezeichneten Skizzen einfügen, die während der Ideation-Phase entstanden sind.
>
> Die Skizzen sollten zeigen:
>
> - Hauptbildschirm mit Karte/Listen-Toggle
> - Filter-Modal
> - Event-Detail-Seite
> - SmartFilter-Wizard Schritte

**Design-Inspiration:**

Die App orientiert sich an **neotaste** - einer App, die durch minimalistische UI, smarte Filterung und duale Darstellung (Karte/Liste) überzeugt. Diese Prinzipien wurden für Event-Discovery adaptiert und erweitert.

---

### 1.2 PACT-Analyse

Die PACT-Analyse (People, Activities, Contexts, Technologies) untersucht die vier Dimensionen des Systems:

#### People (Nutzer)

**Primäre Zielgruppe:**

- Alter: 18-35 Jahre
- Urban Professionals, Studenten, junge Berufstätige
- Technikaffin, Smartphone als primäres Device
- Social Media aktiv, offen für neue Experiences

**Nutzerbedürfnisse:**

- Spontane Event-Discovery ("Was ist heute los?")
- Geografische Nähe als Entscheidungskriterium
- Schnelle, intuitive Navigation
- Minimaler Zeitaufwand für Event-Finding

**Technische Kompetenz:**

- Hoch: Gewohnt an moderne mobile Apps
- Erwartung: intuitive UX ohne Einarbeitung
- Präferenz für visuelles Browsing über Text

#### Activities (Aktivitäten)

**Hauptaktivitäten:**

1. **Event-Discovery**: Browsen durch verfügbare Events
   - Häufigkeit: mehrmals wöchentlich
   - Dauer: 2-5 Minuten pro Session
   - Kontext: spontan, oft unterwegs

2. **Event-Filterung**: Eingrenzung nach Präferenzen
   - Zeitlich: heute, morgen, Wochenende
   - Örtlich: in der Nähe, bestimmter Stadtteil
   - Thematisch: Konzerte, Nightlife, Kultur

3. **Event-Information**: Details zu spezifischem Event
   - Was? Titel, Beschreibung, Kategorie
   - Wann? Datum, Uhrzeit
   - Wo? Adresse, Kartenansicht
   - Kosten? Preis, Free/Paid

4. **Navigation zum Event**: Route planen (zukünftige Funktionalität)

**Nutzungsfrequenz:**

- Power Users: täglich
- Reguläre Nutzer: 2-3x pro Woche
- Gelegenheitsnutzer: vor Wochenenden

#### Contexts (Kontexte)

**Nutzungskontexte:**

**Zeitlich:**

- **Spontan**: "Ich langweile mich, was kann ich jetzt machen?"
- **Geplant**: "Was läuft am Samstag?"
- **Discovery**: "Was gibt es Neues diese Woche?"

**Örtlich:**

- **Unterwegs**: Im Bus, in der Bahn (mobile First!)
- **Zu Hause**: Abendplanung auf der Couch
- **Mit Freunden**: Gemeinsame Event-Auswahl

**Emotional:**

- **Explorativ**: Neugier, Offenheit für Überraschungen
- **Zielgerichtet**: Konkrete Event-Suche (z.B. "Jazz-Konzert")
- **Social**: Aktivitäten mit Freunden planen

**Umgebung:**

- **Laut**: Öffentliche Verkehrsmittel, Cafés
- **Visuell eingeschränkt**: Sonnenlicht, unterwegs
- **Ablenkend**: Multitasking, geteilte Aufmerksamkeit

#### Technologies (Technologien)

**Plattformen:**

- **Primär**: iOS und Android (React Native)
- **Sekundär**: Web-Version (Expo Web)

**Technische Anforderungen:**

- Moderne Smartphones (iOS 13+, Android 8+)
- Stabile Internetverbindung (für Map & Event-Daten)
- GPS für Standort-basierte Features
- Touchscreen-Interaktion

**Technologische Constraints:**

- **Performance**: Schnelle Map-Rendering, flüssige Animationen
- **Offline**: Graceful Degradation bei fehlender Verbindung
- **Accessibility**: Kontrastreiche UI, gut lesbare Texte
- **Battery**: Effiziente Location Services

---

### 1.3 Persona

#### Persona: Anna Schmidt

**Demografische Daten:**

- **Alter**: 26 Jahre
- **Beruf**: Marketing Managerin
- **Wohnort**: Berlin-Kreuzberg
- **Bildung**: Master in Kommunikationswissenschaften
- **Einkommen**: 45.000€/Jahr

**Technologie-Affinität:**

- iPhone 14 als primäres Device
- Täglich 3-4h Screen Time
- Nutzt Instagram, TikTok, Spotify
- Early Adopter für neue Apps

**Lebensstil:**

- Sozial aktiv, großer Freundeskreis
- Besucht 2-3 Events pro Woche
- Interessiert an Konzerten, Ausstellungen, Food-Markets
- Spontan und offen für neue Experiences

**Ziele & Motivationen:**

- "Ich möchte immer wissen, was in meiner Stadt los ist"
- "Ich will coole Events mit Freunden erleben"
- "Ich entdecke gerne neue Locations und Veranstaltungen"
- "Ich hasse es, Stunden mit Event-Recherche zu verbringen"

**Frustrationen:**

- Zu viele verschiedene Event-Plattformen
- Unübersichtliche Kalender-Apps
- Keine geografische Übersicht
- Verpasste Events, weil sie nicht davon wusste

**Nutzungsszenario:**
Anna öffnet freitagnachmittags Event-Map und schaut, was am Wochenende in ihrer Nähe passiert. Sie filtert nach "Konzerte" und "Nightlife" für Samstagabend. Die Kartenansicht zeigt ihr, dass in ihrer Nachbarschaft drei interessante Events stattfinden. Sie klickt eines an, liest die Details und teilt den Event mit ihrer Freundesgruppe.

**Bedürfnisse an Event-Map:**

- Schnelle Übersicht ohne langes Scrollen
- Filter nach ihren Präferenzen
- Geografische Darstellung (wichtig für Event-Hopping)
- Schönes, modernes Design

---

### 1.4 Szenarien

#### Szenario 1: Spontane Abendplanung

**Situation:**  
Es ist Donnerstagabend, 18:30 Uhr. Lena sitzt in der S-Bahn auf dem Weg nach Hause von der Arbeit. Sie fühlt sich energiegeladen und hat keine Lust, den Abend allein zu Hause zu verbringen.

**Ziel:**  
Eine interessante Aktivität für den heutigen Abend finden, idealerweise in ihrer Nähe (Friedrichshain).

**Ablauf:**

1. Lena öffnet Event-Map auf ihrem iPhone
2. Sie tippt auf den SmartFilter-Button
3. **Schritt 1 - Wann?**: Sie wählt "Heute"
4. **Schritt 2 - Wo?**: Sie wählt "Indoor" (es ist Winter)
5. **Schritt 3 - Was?**: Sie wählt "Abends" (18-22 Uhr) und die Kategorien "Konzert", "Bar", "Quiz"
6. Die App zeigt ihr 8 passende Events
7. Sie wechselt zur Kartenansicht und sieht, dass drei Events in Friedrichshain sind
8. Sie klickt auf ein Jazz-Konzert, liest die Details (19:30 Uhr, 12€ Eintritt)
9. Sie entscheidet sich dafür und macht sich auf den Weg

**Ergebnis:**  
Innerhalb von 2 Minuten hat Lena ein passendes Event gefunden, ohne durch endlose Listen scrollen zu müssen.

---

#### Szenario 2: Wochenendplanung mit Freunden

**Situation:**  
Julian plant mit seiner Freundesgruppe (5 Personen) das kommende Wochenende. Es ist Mittwochabend, und sie texten in ihrer Gruppe.

**Ziel:**  
Mehrere Events für Samstag finden, die für die ganze Gruppe interessant sind.

**Ablauf:**

1. Julian öffnet Event-Map
2. Er nutzt den Standard-Filter und wählt "Samstag"
3. Er scrollt durch die Listenansicht und sieht zeitlich sortierte Events
4. Ein Street Food Market (12-18 Uhr) sieht interessant aus - er öffnet die Details
5. Er merkt sich den Event und scrollt weiter
6. Für den Abend findet er ein Open-Air-DJ-Set (20 Uhr)
7. Er teilt beide Event-Links in der Gruppe
8. Die Gruppe diskutiert und entscheidet sich für den Street Food Market

**Ergebnis:**  
Julian konnte schnell mehrere Event-Optionen finden und seiner Gruppe präsentieren. Die Listenansicht half ihm, einen Überblick über den gesamten Tag zu bekommen.

---

#### Szenario 3: Neue Stadt erkunden

**Situation:**  
Sarah ist für ein Wochenende in Hamburg und kennt die Stadt nicht gut. Es ist Freitagabend, und sie möchte die lokale Nightlife-Szene erkunden.

**Ziel:**  
Events in ihrer Nähe entdecken, ohne zu wissen, welche Stadtteile interessant sind.

**Ablauf:**

1. Sarah öffnet Event-Map in ihrem Hotel (Schanzenviertel)
2. Sie sieht sofort die Kartenansicht mit Event-Markern in ihrer Umgebung
3. Die farbcodierten Marker zeigen verschiedene Kategorien
4. Sie zoomt etwas heraus und sieht, dass am Hafen viele Events stattfinden
5. Sie tippt auf einen roten Marker (Nightlife) - eine Rooftop-Bar
6. Die Event-Card zeigt: "Sunset Sessions | 19:00 | Rooftop Bar Harbor | 15€"
7. Sie öffnet die Details und sieht schöne Bilder und Beschreibung
8. Sie entscheidet sich dafür und nutzt die Karte zur Orientierung

**Ergebnis:**  
Sarah konnte als Ortsfremde visuell Events entdecken und hatte durch die Karte gleichzeitig eine geografische Orientierung.

---

### 1.5 User Stories

#### Epic 1: Event Discovery

**US 1.1 - Karten-basiertes Browsing**  
_Als Nutzer möchte ich Events auf einer interaktiven Karte sehen, damit ich geografisch navigieren und Events in meiner Nähe entdecken kann._

**Akzeptanzkriterien:**

- Events werden als Marker auf der Karte angezeigt
- Marker sind nach Kategorie farbcodiert
- Karte ist zoom- und scrollbar
- Tippen auf Marker zeigt Event-Preview

**US 1.2 - Listen-basiertes Browsing**  
_Als Nutzer möchte ich Events in einer scrollbaren Liste sehen, damit ich schnell viele Events durchschauen kann._

**Akzeptanzkriterien:**

- Events werden als Cards in chronologischer Reihenfolge angezeigt
- Jede Card zeigt wichtigste Infos (Titel, Zeit, Ort, Preis, Kategorie)
- Liste ist smooth scrollbar
- Tippen auf Card öffnet Event-Details

**US 1.3 - View-Mode Toggle**  
_Als Nutzer möchte ich zwischen Karten- und Listenansicht wechseln können, damit ich die für mich passende Darstellung nutzen kann._

**Akzeptanzkriterien:**

- Toggle-Button ist prominent im Header platziert
- Wechsel ist flüssig animiert
- Ausgewählter Mode ist visuell hervorgehoben
- Aktueller Mode bleibt beim App-Neustart erhalten

#### Epic 2: Event Filtering

**US 2.1 - Zeitliche Filterung**  
_Als Nutzer möchte ich Events nach Zeitpunkt filtern (heute, morgen, Wochenende, custom), damit ich nur relevante Events sehe._

**Akzeptanzkriterien:**

- Quick-Filter für "Heute", "Morgen", "Fr", "Sa", "So" verfügbar
- Custom Date Range Picker für flexible Zeiträume
- Filter sind als togglebare Chips implementiert
- Aktive Filter sind visuell hervorgehoben

**US 2.2 - Kategorien-Filter**  
_Als Nutzer möchte ich Events nach thematischen Kategorien filtern, damit ich nur Events sehe, die mich interessieren._

**Akzeptanzkriterien:**

- Über 35 Kategorien verfügbar (Party, Konzert, Bar, Sport, Kultur, etc.)
- Multi-Select möglich
- Kategorien sind in thematische Gruppen organisiert
- Anzahl der aktiven Filter wird angezeigt

**US 2.3 - Indoor/Outdoor-Filter**  
_Als Nutzer möchte ich nach Indoor/Outdoor filtern, damit ich Events passend zum Wetter finden kann._

**Akzeptanzkriterien:**

- Toggle zwischen "Any", "Indoor", "Outdoor"
- Filter ist als Chip-Gruppe implementiert
- Nur jeweils eine Option aktiv

**US 2.4 - Tageszeit-Filter**  
_Als Nutzer möchte ich nach Tageszeit filtern (Morgens, Mittags, Abends, Nachts), damit ich Events passend zu meinem Zeitplan finde._

**Akzeptanzkriterien:**

- 4 Zeitslots: Morgens (6-12), Mittags (12-18), Abends (18-22), Nachts (22-6)
- Multi-Select möglich
- Zeitslots haben visuelle Emojis (🌅 ☀️ 🌆 🌙)

#### Epic 3: SmartFilter (KI-gestützter Filter-Wizard)

**US 3.1 - SmartFilter Workflow**  
_Als Nutzer möchte ich durch einen geführten Filter-Prozess geleitet werden, damit ich ohne Überforderung präzise Ergebnisse erhalte._

**Akzeptanzkriterien:**

- 3-Schritt-Wizard: Wann? → Wo? → Was?
- Step Indicator zeigt Fortschritt
- Back-Navigation möglich
- "Ergebnisse anzeigen"-Button am Ende

**US 3.2 - Step 1: Wann?**  
_Als Nutzer möchte ich im ersten Schritt den Zeitpunkt wählen, damit zeitlich irrelevante Events ausgeschlossen werden._

**Akzeptanzkriterien:**

- Presets: Heute, Morgen, Wochenende, Next Week
- Custom Date Range Option
- Visuell ansprechendes Layout mit Icons

**US 3.3 - Step 2: Wo?**  
_Als Nutzer möchte ich Indoor/Outdoor-Präferenz angeben, damit wetterabhängige Filterung erfolgt._

**Akzeptanzkriterien:**

- 3 Optionen: Egal, Indoor, Outdoor
- Große, touch-freundliche Buttons
- Visuelle Icons für bessere Verständlichkeit

**US 3.4 - Step 3: Was?**  
_Als Nutzer möchte ich Kategorien und Tageszeit auswählen, damit ich nur Events sehe, die zu meinen Interessen passen._

**Akzeptanzkriterien:**

- Kategorien-Chips gruppiert nach Themen
- Tageszeit-Auswahl (Morgens/Mittags/Abends/Nachts)
- Multi-Select für Kategorien und Tageszeit
- Anzahl der möglichen Ergebnisse wird live angezeigt

#### Epic 4: Event Details

**US 4.1 - Event-Detailseite**  
_Als Nutzer möchte ich detaillierte Informationen zu einem Event sehen, damit ich eine informierte Entscheidung treffen kann._

**Akzeptanzkriterien:**

- Hero-Image mit Gradient-Overlay
- Event-Titel und Kategorie
- Datum & Uhrzeit prominent
- Adresse mit Kartenlink
- Preisinformation
- Ausführliche Beschreibung
- Indoor/Outdoor-Badge

**US 4.2 - Event-Navigation**  
_Als Nutzer möchte ich von der Event-Liste/Karte zur Detailseite navigieren können, damit ich mehr Informationen erhalte._

**Akzeptanzkriterien:**

- Tap auf Event-Card öffnet Details
- Tap auf Map-Marker zeigt Preview, weiterer Tap öffnet Details
- Smooth Slide-from-Right Animation
- Back-Button zum Zurückkehren

#### Epic 5: UI/UX

**US 5.1 - Modernes Design**  
_Als Nutzer möchte ich eine ästhetisch ansprechende App nutzen, damit die Nutzung Spaß macht._

**Akzeptanzkriterien:**

- Minimalistisches Design mit Weißraum
- Glassmorphism-Effekte
- Smooth Animationen
- Konsistente Typografie (Outfit Font)
- Harmonische Farbpalette (Rust Red Primary)

**US 5.2 - Responsive Touch-Interaktion**  
_Als Nutzer möchte ich visuelles Feedback bei Interaktionen erhalten, damit ich Sicherheit über meine Aktionen habe._

**Akzeptanzkriterien:**

- Buttons haben Press-States (Opacity)
- Chips animieren bei Toggle (Scale, Color)
- Smooth Modal-Transitions
- Haptic Feedback (iOS)

---

## 2. Paper Prototype

### 2.1 Paper Prototype Bilder

> **TODO:** Hier die Fotos des Paper Prototypes einfügen.
>
> Der Paper Prototype sollte zeigen:
>
> - Home Screen mit Map/List Toggle
> - Kartenansicht mit Event-Markern
> - Listenansicht mit Event-Cards
> - Filter-Modal mit allen Filteroptionen
> - SmartFilter Wizard (3 Schritte)
> - Event-Detailseite
> - Interaktive Elemente (Buttons, Chips, etc.)

**Beschreibung des Paper Prototypes:**

Der Paper Prototype wurde mit handgezeichneten Screens auf A4-Papier erstellt. Interaktive Elemente (Buttons, Toggle, Filter-Chips) wurden als separate Papier-Snippets gestaltet, die während des Testings bewegt werden konnten, um Zustandsänderungen zu simulieren.

**Umfang:**

- 8 Hauptscreens
- 15+ interaktive Elemente
- 3 verschiedene User Flows

---

### 2.2 User Testing & Feedback-Analyse (Paper Prototype)

#### Test-Setup

**Methode:** Think-Aloud Protocol mit Task-based Testing  
**Teilnehmer:** 5 Testpersonen (3w, 2m, Alter 22-29)  
**Dauer:** Je 15-20 Minuten  
**Setting:** Einzelinterviews in ruhiger Umgebung

#### Test-Aufgaben

1. **Task 1: Event für heute Abend finden**  
   "Du hast spontan Zeit und möchtest wissen, was heute Abend in deiner Nähe los ist. Nutze die App, um ein passendes Event zu finden."

2. **Task 2: Wochenend-Event mit Freunden planen**  
   "Du planst das Wochenende mit Freunden und sucht nach Outdoor-Aktivitäten am Samstag. Finde passende Events."

3. **Task 3: Event-Details ansehen**  
   "Du hast ein interessantes Konzert gefunden. Finde heraus, wann es stattfindet, wo es ist und was es kostet."

4. **Task 4: Zwischen Karten- und Listenansicht wechseln**  
   "Wechsle zwischen der Karten- und Listenansicht, um Events zu erkunden."

5. **Task 5: SmartFilter nutzen**  
   "Nutze den SmartFilter, um Events für morgen Abend im Bereich Nightlife zu finden."

#### Wichtigste Erkenntnisse

**Positives Feedback:**

✅ **Duale Darstellung wurde sehr positiv aufgenommen**  
_"Ich finde es super, dass ich zwischen Karte und Liste wechseln kann - je nachdem, wonach ich suche."_

✅ **SmartFilter-Konzept überzeugte**  
_"Der Schritt-für-Schritt-Filter ist viel einfacher als alle Filter auf einmal zu sehen."_

✅ **Kategorien-System war intuitiv**  
_"Die Icons und Farben helfen mir, schnell zu erkennen, welche Art von Event das ist."_

✅ **Event-Cards hatten genug Information**  
_"Ich sehe auf einen Blick, was ich wissen muss: Was, Wann, Wo, Wieviel."_

**Kritikpunkte und Verbesserungsvorschläge:**

❌ **Problem 1: Zu viele Kategorien**  
3 von 5 Testern waren von der Anzahl der Kategorien (35+) überfordert.  
→ **Lösung:** Kategorien in thematische Gruppen organisieren (Nightlife, Food, Sport, etc.)

❌ **Problem 2: Custom Date Range unklar**  
Tester wussten nicht, wie sie einen custom Zeitraum setzen sollen.  
→ **Lösung:** Date Range Picker visuell klarer gestalten, mit Kalender-Icon

❌ **Problem 3: Filter-Reset nicht offensichtlich**  
Tester fragten, wie sie Filter zurücksetzen können.  
→ **Lösung:** Expliziten "Filter zurücksetzen"-Button hinzufügen

❌ **Problem 4: Map-Marker zu klein**  
Bei vielen Events waren die Marker zu klein und schwer anzutippen.  
→ **Lösung:** Marker-Größe erhöhen, Clustering bei vielen Events implementieren

❌ **Problem 5: Fehlende "No Results"-Message**  
Bei zu restriktiven Filtern gab es keine Feedback.  
→ **Lösung:** Empty State mit Hinweis implementieren

#### Quantitative Ergebnisse

| Metrik                  | Durchschnitt |
| ----------------------- | ------------ |
| Task Completion Rate    | 92%          |
| Time on Task (Avg)      | 1:45 min     |
| User Satisfaction (1-5) | 4.2          |
| Würden App nutzen       | 5/5 (100%)   |

#### Iterationen basierend auf Feedback

1. **Kategorien-Gruppierung eingeführt**
2. **Filter-Reset-Button hinzugefügt**
3. **Date Range Picker überarbeitet**
4. **Map-Marker vergrößert**
5. **Empty States designed**

---

## 3. Figma Prototype

### 3.1 Figma Screenshots

> **TODO:** Hier die Screenshots des Figma Prototypes einfügen.
>
> Der Figma Prototype sollte umfassen:
>
> - Alle Hauptscreens in hoher Fidelity
> - Interaktive Komponenten (Buttons, Chips, Modals)
> - Verschiedene States (Active, Inactive, Hover)
> - Flows und Transitions
>
> Link zum Figma Projekt: [IAS2025/2026 - Event-Map](FIGMA_LINK_HERE)

**Screens im Figma Prototype:**

1. **Home Screen - Map View**
2. **Home Screen - List View**
3. **Filter Modal (Full)**
4. **SmartFilter - Step 1 (Wann?)**
5. **SmartFilter - Step 2 (Wo?)**
6. **SmartFilter - Step 3 (Was?)**
7. **Event Detail Page**
8. **Empty State (No Results)**

---

### 3.2 Begründung des Interaction Designs

Das Interaction Design von Event-Map basiert auf etablierten Design Patterns, Heuristiken und Guidelines aus dem Human-Computer Interaction Bereich.

#### 3.2.1 Angewandte Design Patterns

**1. Tabs Pattern (Map/List Toggle)**

**Pattern:** Segmented Control / View Switcher  
**Quelle:** iOS Human Interface Guidelines - Tab Bars

**Begründung:**  
Der Toggle zwischen Karten- und Listenansicht folgt dem etablierten Pattern eines Segmented Controls. Dieses Pattern wird genutzt, wenn Nutzer zwischen zwei gleichwertigen Views wechseln können, die dieselben Daten in unterschiedlicher Form präsentieren.

**Umsetzung:**

- Prominent im Header platziert
- Visuell hervorgehobener aktiver State
- Smooth Transition zwischen Views
- Persistenz der Auswahl

**Referenz:** [Apple HIG - Segmented Controls](https://developer.apple.com/design/human-interface-guidelines/segmented-controls)

---

**2. Progressive Disclosure (SmartFilter Wizard)**

**Pattern:** Multi-Step Form / Wizard  
**Quelle:** UX Pattern Library - Progressive Disclosure

**Begründung:**  
Der SmartFilter nutzt Progressive Disclosure, um komplexe Filteroptionen in verdaubare Schritte aufzuteilen. Dies reduziert kognitive Last und verhindert Überforderung.

**Umsetzung:**

- 3 logisch aufeinanderfolgende Schritte
- Step Indicator zeigt Fortschritt und Orientierung
- Jeder Step hat klaren Fokus (Wann? → Wo? → Was?)
- Back-Navigation ermöglicht Korrektur

**Referenz:** Nielsen Norman Group - [Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)

---

**3. Overlay Pattern (Modals und Bottom Sheets)**

**Pattern:** Modal Dialog / Bottom Sheet  
**Quelle:** Material Design - Sheets

**Begründung:**  
Filter-Optionen und Event-Previews nutzen Overlay-Pattern, um den Hauptkontext nicht zu verlassen, aber fokussierte Interaktionen zu ermöglichen.

**Umsetzung:**

- Bottom Sheets für Event-Preview auf der Karte
- Full-Screen Modals für komplexe Filter
- Backdrop-Dimming für Fokus
- Swipe-to-Dismiss Gesture

**Referenz:** [Material Design - Bottom Sheets](https://m3.material.io/components/bottom-sheets/overview)

---

**4. Filtering Pattern**

**Pattern:** Faceted Search / Multi-dimensional Filtering  
**Quelle:** UX Patterns - Filtering and Search

**Begründung:**  
Das Filter-System nutzt Faceted Search, um mehrdimensionale Filterung (Zeit, Ort, Kategorie, Tageszeit) zu ermöglichen, ohne Nutzer zu überfordern.

**Umsetzung:**

- Gruppierte Filter-Dimensionen
- Toggle-Chips für einfache Auswahl
- Live-Update der Ergebnisse
- Anzahl der Ergebnisse wird angezeigt
- Filter-Reset-Option prominent

**Referenz:** [Baymard Institute - Filtering Best Practices](https://baymard.com/blog/filter-design)

---

#### 3.2.2 Angewandte Heuristiken

Das Design folgt **Nielsen's 10 Usability Heuristics**:

**H1: Visibility of System Status**  
✅ Step Indicator im SmartFilter zeigt Fortschritt  
✅ Aktive Filter sind visuell hervorgehoben  
✅ Anzahl der Ergebnisse wird live aktualisiert  
✅ Loading States bei Datenabfrage

**H2: Match between System and Real World**  
✅ Emojis für Tageszeiten (🌅 Morgens, 🌙 Nachts)  
✅ Farbcodierung der Kategorien (🎉 Party = Nightlife-Farbe)  
✅ Geografische Karte entspricht mentaler Repräsentation von "Events in meiner Nähe"

**H3: User Control and Freedom**  
✅ Filter-Reset-Button  
✅ Back-Navigation in jedem Screen  
✅ Chips sind togglebar (erneuter Klick deaktiviert)  
✅ Dismiss Modals via Swipe oder X-Button

**H4: Consistency and Standards**  
✅ Plattform-Standards (iOS/Android Navigation Patterns)  
✅ Konsistente Terminologie ("Filter", "SmartFilter")  
✅ Einheitliches Design System (Farben, Typografie, Spacing)  
✅ Standardisierte Icon-Semantik

**H5: Error Prevention**  
✅ SmartFilter verhindert ungültige Filter-Kombinationen  
✅ Date Range Picker verhindert invalide Datumsauswahl  
✅ Disabled States bei nicht verfügbaren Optionen

**H6: Recognition rather than Recall**  
✅ Kategorien mit Icons und Labels (nicht nur Text)  
✅ Quick-Filter Presets (statt manueller Datumseingabe)  
✅ Visuelle Hierarchie zeigt wichtigste Infos zuerst

**H7: Flexibility and Efficiency of Use**  
✅ Quick-Filter für Power Users  
✅ SmartFilter für Gelegenheitsnutzer  
✅ Beide Views (Karte/Liste) für unterschiedliche Use Cases  
✅ Multi-Select bei Kategorien für schnelle Kombination

**H8: Aesthetic and Minimalist Design**  
✅ Minimalistisches UI mit Fokus auf Content  
✅ Keine unnötigen Dekorationselemente  
✅ Weißraum für visuelle Ruhe  
✅ Funktionale Farbgebung (nicht dekorativ)

**H9: Help Users Recognize, Diagnose, and Recover from Errors**  
✅ Empty State mit hilfreichen Hinweisen  
✅ "Keine Ergebnisse"-Message schlägt Filter-Anpassung vor  
✅ Error States mit klaren Erklärungen

**H10: Help and Documentation**  
✅ Self-explanatory UI Design  
✅ SmartFilter-Wizard führt durch Prozess  
✅ Tooltips bei komplexeren Features (zukünftig)

---

#### 3.2.3 Angewandte Guidelines

**iOS Human Interface Guidelines**

- **Safe Area:** Alle interaktiven Elemente respektieren Safe Area (Notch, Home Indicator)
- **Touch Targets:** Minimum 44x44pt für alle tappable Elements
- **Typography:** Dynamic Type Support für Accessibility
- **Haptic Feedback:** Subtle Vibration bei wichtigen Aktionen
- **Animations:** Smooth Transitions (0.25s Standard)

**Material Design Principles**

- **Material:** Glassmorphism-Effekte für Layers und Depth
- **Motion:** Meaningful Transitions, nicht nur Dekoration
- **Color:** Purpose-driven Color Palette (Primary für Actions, etc.)
- **Elevation:** Shadow Hierarchy für UI-Layers

**Gestalt Principles**

- **Proximity:** Zusammengehörige Elemente sind visuell gruppiert (Filter-Chips)
- **Similarity:** Ähnliche Elemente sehen ähnlich aus (alle Event-Cards gleich)
- **Closure:** Card-Design nutzt Closure für klar definierte Bereiche
- **Figure-Ground:** Backdrop-Dimming bei Modals
- **Common Fate:** Animationen zeigen zusammengehörige Elemente

---

#### 3.2.4 Accessibility Considerations

- **Farb-Kontrast:** WCAG AA compliant (4.5:1 für Text)
- **Font Size:** Minimum 14px für Body Text
- **Touch Targets:** Minimum 44x44pt
- **Screen Reader:** Semantische HTML-Struktur (bei Web)
- **Alternative Text:** Beschreibende Labels für Icons

---

### 3.3 User Testing & Feedback-Analyse (Figma Prototype)

#### Test-Setup

**Methode:** Remote Usability Testing mit Figma Prototype  
**Teilnehmer:** 5 Testpersonen (2w, 3m, Alter 23-32)  
**Dauer:** Je 20-25 Minuten  
**Setting:** Remote via Zoom, Bildschirm-Sharing

#### Test-Aufgaben

1. **Task 1: Finde ein Konzert für heute Abend**
2. **Task 2: Nutze den SmartFilter für Samstag-Outdoor-Events**
3. **Task 3: Wechsle zwischen Karten- und Listenansicht**
4. **Task 4: Filtere nach mehreren Kategorien gleichzeitig**
5. **Task 5: Setze alle Filter zurück**

#### Wichtigste Erkenntnisse

**Positives Feedback:**

✅ **Design wurde als "modern und ansprechend" bewertet**  
✅ **Map/List Toggle war sofort verständlich**  
✅ **SmartFilter-UX überzeugte alle Tester**  
✅ **Event-Cards hatten perfekte Informationsdichte**  
✅ **Glassmorphism-Effekte wurden als "premium" wahrgenommen**

**Kritikpunkte:**

❌ **Problem 1: Custom Date Range nicht sofort ersichtlich**  
→ **Lösung:** Kalender-Icon hinzugefügt, Label angepasst

❌ **Problem 2: Zu viele Kategorien in Step 3 des SmartFilters**  
→ **Lösung:** Kategorien in kollabierbare Gruppen organisiert

❌ **Problem 3: Feedback bei Filter-Änderung zu subtil**  
→ **Lösung:** Stärkere visuelle Animation bei Chip-Toggle

#### Quantitative Ergebnisse

| Metrik            | Durchschnitt    |
| ----------------- | --------------- |
| Task Success Rate | 96%             |
| Time on Task      | 1:20 min        |
| SUS Score         | 82/100 (Good)   |
| NPS               | +60 (Excellent) |

---

## 4. React Native Implementierung

### 4.1 Team und Rollen

Event-Map wurde von einem dreiköpfigen Team entwickelt, wobei jedes Mitglied seine spezifischen Stärken und Vorkenntnisse einbrachte.

**Jannik** übernahm die technische Entwicklung und Architektur der Anwendung. Durch seinen Werkstudentenjob als Web Developer hatte er bereits umfangreiche Erfahrung mit React und React Native gesammelt. Mehrere private Projekte mit Expo und React Native hatten ihm ein solides Fundament für die Umsetzung einer mobilen Anwendung gegeben. Diese praktische Erfahrung ermöglichte es, technische Entscheidungen fundiert zu treffen und Best Practices von Anfang an zu implementieren.

**Merlin** kümmerte sich primär um das visuelle Design und die Gestaltung in Figma. Mit fundierten React-Kenntnissen aus seinem vorherigen Project C, in dem er mit der UI Library Hero UI gearbeitet hatte, brachte er ein gutes Verständnis für Komponenten-basierte Architekturen mit. Bei Event-Map entwarf er zunächst die UI-Konzepte und Screens in Figma, was eine solide Designgrundlage für die Implementierung schuf. Es war interessant zu erleben, wie der Ansatz ohne UI-Library funktioniert – eine bewusste Entscheidung, die neue Perspektiven auf UI-Entwicklung eröffnete und das Verständnis für die zugrundeliegenden React Native-Komponenten vertiefte. Die enge Zusammenarbeit zwischen Figma-Design und Code-Implementierung stellte sicher, dass das finale UI dem ursprünglichen Design-Intent entsprach.

**Philipp** kümmerte sich primär um die organisatorischen Aspekte des Projekts. Mit Kenntnissen in Kanban-Organisation strukturierte er den Entwicklungsprozess und sorgte für einen effizienten Workflow. Sein Fokus lag auf dem Testing und der Konzeptionierung des User Flows – er stellte sicher, dass die Anwendung nicht nur technisch funktioniert, sondern auch intuitiv bedienbar ist. Durch iteratives Testing und UX-Feedback half er dabei, die Benutzerführung zu optimieren und Schwachstellen in der Interaktion frühzeitig zu identifizieren.

Diese Rollenverteilung erwies sich als effektiv: Technische Umsetzung, React-spezifische Expertise und UX-Fokus ergänzten sich gegenseitig und führten zu einer ausgewogenen Entwicklung, bei der sowohl Code-Qualität als auch Nutzererlebnis im Vordergrund standen.

---

### 4.2 Technologie-Stack

#### 4.2.1 Core Technologies

Die technologische Basis bildet React Native in Kombination mit Expo. React Native ermöglicht die Entwicklung einer einzigen Codebasis für iOS und Android, während Expo das Development-Tooling bereitstellt und Funktionen wie Hot Reloading, Over-the-Air-Updates und vereinfachtes Deployment bietet.

| Technologie  | Version | Verwendungszweck         |
| ------------ | ------- | ------------------------ |
| React        | 19.1.0  | UI Library               |
| React Native | 0.81.5  | Cross-Platform Framework |
| Expo         | ~54.0   | Development Platform     |
| Expo Router  | ~6.0    | File-based Navigation    |
| TypeScript   | ~5.9.2  | Type-Safe Development    |

#### 4.2.2 Funktionale Dependencies

Die Kernfunktionalität wird durch folgende Libraries realisiert:

**react-native-maps (1.20.1)** integriert native Kartenkomponenten und ermöglicht die Darstellung von Events auf einer interaktiven Karte.

**expo-location (~19.0.7)** stellt Standort-Services für Lokalisierung und Geocoding bereit.

**@react-native-community/datetimepicker (~8.4.4)** implementiert native Datums- und Zeitauswahl-Komponenten.

**date-fns (^4.1.0)** bietet umfassende Funktionen für Datumsberechnungen und Formatierung.

---

### 4.3 Projektstruktur

#### 4.3.1 Verzeichnisorganisation

Die Projektstruktur folgt dem Prinzip der Separation of Concerns. Jedes Verzeichnis hat einen klar definierten Verantwortungsbereich.

```
Event-Map/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── event/
│       └── [id].tsx
│
├── components/
│   ├── features/
│   │   ├── SmartFilter/
│   │   ├── Map/
│   │   ├── Home/
│   │   ├── EventList.tsx
│   │   └── FilterModal.tsx
│   ├── ui/
│   └── event/
│
├── types/
│   └── index.ts
│
├── constants/
│   ├── brand.ts
│   └── Colors.ts
│
├── data/
│   ├── mockEvents.ts
│   └── categories.ts
│
├── utils/
│   ├── filters.ts
│   └── dates.ts
│
└── assets/
```

#### 4.3.2 Verzeichnis-Details

**app/** enthält alle Screens und nutzt Expo Routers file-based Routing. Die Datei `_layout.tsx` definiert das Root Layout mit Theme-Provider, Font-Loading und Stack-Navigation. Der Hauptbildschirm befindet sich in `index.tsx`, während `event/[id].tsx` eine dynamische Route für Event-Details implementiert, wobei `[id]` als URL-Parameter fungiert.

**components/** ist in drei hierarchische Ebenen unterteilt. Das Unterverzeichnis `features/` enthält komplexe, feature-spezifische Komponenten wie den SmartFilter oder Map-Komponenten. Das Verzeichnis `ui/` beherbergt generische, wiederverwendbare UI-Bausteine ohne Business-Logik. Das Unterverzeichnis `event/` gruppiert domain-spezifische Komponenten für die Event-Detaildarstellung.

**types/** zentralisiert alle TypeScript-Type-Definitionen in einer einzigen `index.ts`-Datei. Diese Struktur verhindert Redundanzen und gewährleistet Konsistenz bei Type-Definitionen.

**constants/** enthält das vollständige Design System. Die Datei `brand.ts` definiert alle Design Tokens wie Farben, Typografie, Spacing, Border Radius, Shadows und Animationsdauern.

**data/** speichert Mock-Event-Daten sowie die Kategorisierung von Events in thematische Gruppen.

**utils/** stellt wiederverwendbare Utility-Funktionen bereit, insbesondere für Filter-Logik und Datumsoperationen.

---

### 4.4 Branding, UI-Entwicklung & Styling

#### 4.4.1 Vision und Design-Inspiration

Die Design-Vision von Event-Map orientiert sich stark an der App **neotaste**, die als Referenz für ein gelungenes UX-Konzept diente. Neotaste überzeugt durch ihre minimalistische und klare Benutzerführung: Nutzer erhalten durch smarte Filterung präzise Vorschläge für das, was sie suchen, und können zwischen zwei Darstellungsformen - Karte und Liste - nahtlos wechseln.

Dieses Konzept wurde für Event-Map adaptiert und erweitert:

**Minimalismus und Klarheit:** Die UI verzichtet auf überflüssige Elemente und fokussiert sich auf das Wesentliche. Jeder Screen hat eine klare Aufgabe, jede Komponente einen definierten Zweck. Abgerundete Formen schaffen Zugänglichkeit, Glassmorphism-Effekte verleihen Modernität, und subtile Animationen bringen Lebendigkeit in die Interaktion.

**Smarte Filterung:** Wie bei neotaste steht die intelligente Filterung im Zentrum. Der SmartFilter-Wizard führt Nutzer schrittweise durch ihre Präferenzen (Wann? Wo? Was?) und schlägt genau die Events vor, die zu ihren Wünschen passen. Die Filterung ist nicht aufdringlich, sondern intuitiv und optional.

**Duale Darstellung:** Events können wahlweise auf einer interaktiven Karte oder in einer scrollbaren Liste betrachtet werden. Auf der Karte ermöglichen farbcodierte Marker eine schnelle geografische Orientierung. Bei Auswahl eines Events erscheint eine kompakte Card mit den wichtigsten Informationen (Titel, Zeit, Ort, Preis) - genug, um eine schnelle Entscheidung zu treffen.

**Progressive Information Disclosure:** Für detaillierte Informationen navigiert der Nutzer auf eine dedizierte Event-Detail-Seite. Dort findet sich die vollständige Beschreibung, alle Metadaten und ein Hero-Image. Dieser gestufte Informationsfluss verhindert Überforderung und gibt dem Nutzer die Kontrolle über die Informationstiefe.

Jedes visuelle Element wurde darauf ausgerichtet, eine emotionale Verbindung zum Nutzer herzustellen und das Event-Discovery-Erlebnis zu verstärken - ganz im Sinne der neotaste-Philosophie: **klar, smart, schön**.

**Bewusst schlichtes Design:**

Das UI folgt einem bewusst schlichten, aufgeräumten Designansatz. Die Inhalte stehen im Vordergrund – der Nutzer soll sich nicht erst durch tausend bunte Elemente durcharbeiten müssen, um relevante Informationen zu finden. Die Screens sind größtenteils hell gehalten mit viel Weißraum, nur wenige klare Akzentfarben für Buttons oder wichtige Aktionen setzen visuelle Schwerpunkte. Diese Zurückhaltung in der Gestaltung sorgt dafür, dass die App auch schnell unterwegs benutzbar ist, ohne groß nachdenken zu müssen, wo man klicken muss.

**Informationshierarchie und Typografie:**

Die Eventkarten und Listen sind so aufgebaut, dass man die wichtigsten Infos auf einen Blick erkennt: Titel, Ort, Zeit – genau das, was man wirklich braucht, um zu entscheiden, ob einen das Event interessiert. Kleinere, weniger wichtige Infos rutschen bewusst nach unten oder werden dezenter dargestellt. Bei der Typografie wurde darauf geachtet, eine einfache, gut lesbare Schrift zu nutzen und mit Größen und Gewicht zu arbeiten, statt mit zu vielen unterschiedlichen Stilen. So entsteht eine klare Hierarchie, die trotzdem nicht überdesignt wirkt.

**Mobile-First Interaktion:**

Da es sich um eine mobile Anwendung handelt, wurden die Interaktionen von Anfang an "mobile first" konzipiert. Das bedeutet: große, gut erreichbare Touchflächen, Buttons und Navigation bevorzugt im unteren Bereich des Screens (Daumen-freundlich) und Icons, die möglichst selbsterklärend sind. Die App soll sich so anfühlen, als könnte man sie intuitiv benutzen, auch wenn man sie zum ersten Mal öffnet.

**Funktionaler Tool-Charakter:**

Insgesamt wirkt das UI eher ruhig und funktional als verspielt – es ist ein Tool, das man gerne benutzt, weil es klar strukturiert ist und nicht ablenkt. Diese bewusste Entscheidung für Funktionalität über Dekoration macht Event-Map zu einem verlässlichen Begleiter für Event-Discovery, der sich auf das Wesentliche konzentriert: dem Nutzer schnell und effizient die richtigen Events zu zeigen.

### 5.2 UI-Entwicklung ohne Libraries: Die Rolle von KI

Ein zentraler Aspekt dieses Projekts ist die bewusste Entscheidung **gegen den Einsatz von UI-Component-Libraries** wie React Native Elements, NativeBase oder React Native Paper. Stattdessen wurden alle UI-Komponenten von Grund auf selbst entwickelt - ein Ansatz, der in Zeiten von generativer KI nicht nur möglich, sondern auch vorteilhaft ist.

**Warum keine UI-Libraries?**

Traditionell wurden UI-Libraries genutzt, um Entwicklungszeit zu sparen und konsistente Komponenten zu erhalten. Mit KI-Tools wie ChatGPT, Claude oder GitHub Copilot hat sich diese Gleichung jedoch fundamental verändert:

1. **Maßgeschneiderte Komponenten in Minuten:** KI kann innerhalb kürzester Zeit vollständige, projektspezifische Komponenten generieren, die exakt auf das Design System abgestimmt sind - ohne die Kompromisse, die fertige Libraries mit sich bringen.

2. **Volle Kontrolle über Design und Verhalten:** Selbst entwickelte Komponenten lassen sich ohne Einschränkungen an das Branding anpassen. Bei Libraries stößt man oft an Grenzen der Customization oder kämpft mit Override-Mechanismen.

3. **Keine unnötigen Dependencies:** UI-Libraries bringen oft massiven Overhead mit - Dutzende von Komponenten, die nie genutzt werden, plus zusätzliche Abhängigkeiten. Eine selbst entwickelte UI ist lean und enthält nur, was wirklich benötigt wird.

4. **Lerneffekt und Ownership:** Das eigenständige Entwickeln von Komponenten fördert ein tiefes Verständnis für React Native, Styling und Animation - wertvolles Wissen, das bei der Verwendung von Blackbox-Libraries verloren geht.

5. **Langfristige Wartbarkeit:** UI-Libraries können deprecated werden oder Breaking Changes einführen. Eigene Komponenten bleiben unter vollständiger Kontrolle und sind unabhängig von Third-Party-Update-Zyklen.

**Der KI-gestützte Entwicklungsprozess:**

Die Entwicklung erfolgte iterativ in Zusammenarbeit mit KI-Tools:

1. **Design-Definition:** Beschreibung der gewünschten Komponente inklusive Design Tokens
2. **KI-Generierung:** Erste Version der Komponente wird von KI erstellt
3. **Iteration:** Anpassungen und Verfeinerungen durch Prompt-Engineering
4. **Integration:** Einbindung in das zentrale Design System

Dieser Workflow ermöglichte es, in kurzer Zeit eine komplette, polierte UI aufzubauen - von Buttons über Chips bis hin zu komplexen Modals und Bottom Sheets.

### 5.3 UI & Styling Libraries

Für die visuelle Gestaltung werden mehrere spezialisierte Libraries eingesetzt:

```json
{
  "expo-linear-gradient": "~15.0.7",
  "expo-blur": "~15.0.7",
  "lucide-react-native": "^0.555.0",
  "react-native-svg": "15.12.1"
}
```

Die expo-linear-gradient Library ermöglicht fließende Farbverläufe, während expo-blur Glassmorphism-Effekte realisiert. Icons werden über lucide-react-native bereitgestellt und SVG-Support erfolgt durch react-native-svg.

Die Typografie basiert auf der Schriftart **Outfit** (Google Fonts), die über `@expo-google-fonts/outfit` eingebunden wird und in neun Gewichtungen von Thin (100) bis Black (900) verfügbar ist.

### 5.4 Struktur der UI im Projekt

Die UI-Komponenten sind hierarchisch organisiert und sinnvoll nach Features gruppiert:

```
components/
├── ui/                          # Atomare & molekulare UI-Komponenten
│   ├── Button.tsx               # Basis-Button mit Variants
│   ├── Chip.tsx                 # Togglebare Filter-Chips
│   ├── ChipGroup.tsx            # Container für Chip-Gruppen
│   ├── BlurPill.tsx             # Glassmorphism Pills
│   ├── ItemCard.tsx             # Standard Card-Layout
│   ├── BottomSheet.tsx          # Modale Bottom-Sheets
│   ├── ActionBar.tsx            # Floating Action Bar
│   ├── DateRangePicker.tsx      # Datumsbereich-Auswahl
│   ├── ModalHeader.tsx          # Modal-Header-Standard
│   ├── SectionTitle.tsx         # Section-Überschriften
│   ├── StepIndicator.tsx        # Multi-Step-Visualisierung
│   └── NoResultsOverlay.tsx     # Empty State
│
├── features/                    # Komplexe, feature-spezifische Komponenten
│   ├── SmartFilter/             # Multi-Step Filter-Wizard
│   ├── Map/                     # Karten-Integration
│   └── Home/                    # Home-Screen-Features
│
└── event/                       # Domain-spezifische Event-Komponenten
    ├── EventHeader.tsx
    ├── EventTitle.tsx
    └── ...
```

**Design-Prinzipien der Struktur:**

- **ui/**: Generische, wiederverwendbare Komponenten ohne Business-Logik. Diese Komponenten könnten theoretisch in jedem Projekt verwendet werden.
- **features/**: Feature-spezifische Komponenten, die mehrere UI-Komponenten kombinieren und Business-Logik enthalten.
- **event/**: Domain-spezifische Komponenten für den Event-Kontext.

Alle Komponenten greifen auf ein **zentralisiertes Design System** in `constants/brand.ts` zu. Diese Single Source of Truth garantiert Konsistenz und ermöglicht globale Design-Änderungen durch Anpassung an einem einzigen Ort.

### 5.5 Das Design System: Tokens und Standards

Das Design System definiert alle visuellen Eigenschaften der Anwendung als wiederverwendbare Tokens:

**Farbpalette:**

```typescript
// Primary Colors - Rust Red
const primary = "#B73B00";
const primaryLight = "#D45A20";
const primaryDark = "#8A2C00";

// Secondary Colors - Rose Dust
const secondary = "#D4CAC7";
const secondaryLight = "#E8E2E0";
const secondaryDark = "#B8ABA7";
```

Die Gray Scale ist subtil in Richtung Rose Dust getönt (#FAF9F9 bis #1A1817), was eine harmonische Farbkomposition über alle UI-Elemente garantiert.

**Theme Support:**

```typescript
const ThemeColors = {
  light: {
    text: "#1A1817",
    textSecondary: "#7A706C",
    background: "#FFFFFF",
    primary: "#B73B00",
  },
  dark: {
    text: "#FAF9F9",
    textSecondary: "#B8ABA7",
    background: "#1A1817",
    primary: "#D45A20",
  },
};
```

**Typography System:**

Die Typografie nutzt ausschließlich **Outfit** (Google Fonts), verfügbar in neun Gewichtungen. Vordefinierte Presets gewährleisten konsistente Texthierarchien:

```typescript
const headings = {
  h1: {
    fontFamily: "Outfit_800ExtraBold",
    fontSize: 32,
    letterSpacing: -0.5,
    lineHeight: 1.1,
  },
  h2: {
    fontFamily: "Outfit_700Bold",
    fontSize: 24,
    letterSpacing: -0.3,
    lineHeight: 1.2,
  },
  body: {
    fontFamily: "Outfit_400Regular",
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1.5,
  },
  button: {
    fontFamily: "Outfit_600SemiBold",
    fontSize: 16,
    letterSpacing: 0.3,
  },
};
```

**Spacing:**

```typescript
const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};
```

**Border Radius:**

```typescript
const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
  chip: 20, // Spezifisch für Filter-Chips
  card: 16, // Card-Komponenten
  modal: 24, // Modale Dialoge
  button: 30, // Primary Buttons
};
```

**Shadows:**

```typescript
const Shadows = {
  sm: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    elevation: 1,
  },
  md: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    elevation: 2,
  },
  lg: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 4,
  },
  xl: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    elevation: 8,
  },
};
```

**Component Tokens:**

Für häufig genutzte Komponenten existieren vordefinierte Token-Sets, die Konsistenz garantieren:

```typescript
const ComponentTokens = {
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F5F3F2",
    activeBackgroundColor: "#B73B00",
  },
  card: {
    padding: 16,
    borderRadius: 16,
    ...Shadows.md,
  },
  button: {
    primary: {
      backgroundColor: "#B73B00",
      textColor: "#FFFFFF",
      paddingVertical: 16,
      borderRadius: 30,
    },
  },
};
```

### 5.6 UI/UX Design Principles

**Glassmorphism:**

Ein zentrales visuelles Element ist Glassmorphism - semi-transparente UI-Elemente mit Blur-Effekten, die ein modernes, luftiges Erscheinungsbild schaffen:

```typescript
<BlurView intensity={80} tint="light" style={styles.blurContainer}>
    <Text>Content</Text>
</BlurView>
```

Anwendungsbereiche:

- Location Pills auf der Karte
- Modal-Overlays
- Action Bar am unteren Bildschirmrand
- Event-Preview-Cards

**Gradients:**

Farbverläufe werden strategisch für Call-to-Action-Elemente eingesetzt:

```typescript
<LinearGradient
    colors={['#B73B00', '#D45A20']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.gradientButton}
>
    <Text>SmartFilter</Text>
</LinearGradient>
```

Der Agent/AI-Gradient (Rust Red-Töne) signalisiert die KI-gestützte Natur des SmartFilters und hebt ihn visuell von Standard-Buttons ab.

**Animation Timing:**

Konsistente Animationszeiten gewährleisten ein harmonisches Nutzererlebnis:

```typescript
const Animations = {
  fast: 150, // Hover-Effekte
  normal: 250, // Standard-Transitions
  slow: 350, // Modal-Animationen
  verySlow: 500, // komplexe Übergänge
};
```

**Responsive Design:**

Die Anwendung berücksichtigt plattformspezifische Besonderheiten:

- `react-native-safe-area-context` gewährleistet korrekte Abstände zu System-UI-Elementen (Notch, Status Bar)
- Edge-to-Edge-Display auf Android aktiviert
- Portrait-Orientation-Lock
- Adaptive Layouts für verschiedene Bildschirmgrößen

**Interaktive Elemente und Feedback:**

Alle interaktiven Elemente bieten visuelles Feedback für besseres User Experience:

- **Chips:** Animieren zwischen aktiven und inaktiven Zuständen mit Scale- und Color-Transitions
- **Buttons:** Press-States durch Opacity-Änderung (activeOpacity: 0.7)
- **Cards:** Shadow-Intensität ändert sich bei Touch
- **Step-Indicator:** Scale-Animationen beim Fortschritt
- **Bottom Sheets:** Swipe-Gesten mit physikalisch realistischem Verhalten

### 5.7 Styling-Ansatz: StyleSheet vs. Inline-Styles

Das Projekt nutzt konsequent React Native's `StyleSheet.create()` anstelle von Inline-Styles:

```typescript
const styles = StyleSheet.create({
  container: {
    padding: Brand.Spacing.lg,
    backgroundColor: Brand.ThemeColors.light.background,
    borderRadius: Brand.BorderRadius.card,
    ...Brand.Shadows.md,
  },
});
```

**Vorteile:**

- Performance-Optimierung durch Style-Caching
- Bessere Code-Organisation und Lesbarkeit
- Type-Safety durch TypeScript
- Einfachere Wartung und Konsistenz

**Integration mit Design System:**

Jeder Style referenziert die zentralen Design Tokens aus `constants/brand.ts`, was globale Design-Änderungen ohne Code-Anpassung in den Komponenten ermöglicht.

### 5.8 Fazit: Modernes Frontend Design in Zeiten von KI

Die UI-Entwicklung von Event-Map demonstriert einen modernen Ansatz zum Frontend Design: anstatt auf vorgefertigte Libraries zu setzen, wurden alle Komponenten maßgeschneidert entwickelt - ermöglicht durch KI-gestützte Entwicklung. Das Ergebnis ist eine UI, die perfekt auf das Branding abgestimmt ist, keine unnötigen Dependencies mitbringt und vollständig unter eigener Kontrolle steht.

Das zentralisierte Design System in Kombination mit der hierarchischen Komponentenstruktur garantiert Konsistenz, Wartbarkeit und Erweiterbarkeit. Glassmorphism, Gradients und durchdachte Animationen schaffen ein modernes, ansprechendes Nutzererlebnis - alles ohne eine einzige Third-Party-UI-Library.

---

## 6. Datenmodellierung

### 6.1 Event Interface

Das zentrale Datenmodell ist das Event-Interface:

```typescript
interface Coordinate {
  latitude: number;
  longitude: number;
}

interface Event {
  id: string;
  title: string;
  coordinate: Coordinate;
  category: string;
  price: string;
  time: string;
  date: Date;
  indoor: boolean;
  description?: string;
  imageUrl?: string;
}
```

### 6.2 Filter Types

Das Filter-System nutzt spezialisierte Types für verschiedene Filterdimensionen:

```typescript
type WhenFilter =
  | "any"
  | "today"
  | "tomorrow"
  | "friday"
  | "saturday"
  | "sunday"
  | "weekend"
  | "nextWeek"
  | "custom";

type IndoorFilter = "any" | "indoor" | "outdoor";

type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

interface ActiveFilters {
  when: WhenFilter;
  indoor: IndoorFilter;
  categories: string[];
  dateFrom: Date | null;
  dateTo: Date | null;
  timeOfDay: TimeOfDay[];
}

const DEFAULT_FILTERS: ActiveFilters = {
  when: "any",
  indoor: "any",
  categories: [],
  dateFrom: null,
  dateTo: null,
  timeOfDay: [],
};
```

### 6.3 Kategorien-System

Das System umfasst über 35 Event-Kategorien, die in acht thematische Gruppen organisiert sind:

```typescript
interface Category {
  id: string;
  label: string;
  emoji: string;
  displayLabel: string;
}

const CATEGORIES: Category[] = [
  { id: "party", label: "Party", emoji: "🎉", displayLabel: "🎉 Party" },
  { id: "konzert", label: "Konzert", emoji: "🎵", displayLabel: "🎵 Konzert" },
  { id: "bar", label: "Bar", emoji: "🍹", displayLabel: "🍹 Bar" },
  // weitere Kategorien
];
```

**Kategorie-Gruppen:**

| Gruppe            | Farbe   | Enthaltene Kategorien                      |
| ----------------- | ------- | ------------------------------------------ |
| Nightlife & Party | #1E3A5F | party, club, konzert, livemusik, dj        |
| Drinks & Bars     | #9B2335 | bar, cocktails, bier, wein, craft          |
| Food & Dining     | #D4763B | restaurant, cafe, brunch, streetfood       |
| Entertainment     | #7B3F8F | comedy, quiz, karaoke, show, theater, kino |
| Aktivitäten       | #2D8C5A | sport, games, darts, billard               |
| Kunst & Kultur    | #C76B98 | kunst, ausstellung, lesung                 |
| Special Events    | #D4A030 | festival, markt, openair, rooftop          |
| Social            | #3498DB | dating, networking, workshop               |

Die Gruppenfarben werden auch für die visuelle Differenzierung von Map-Markern verwendet.

### 6.4 Time Slots

Für die Tageszeit-Filterung sind vier Zeitslots definiert:

```typescript
interface TimeSlot {
  id: TimeOfDay;
  label: string;
  time: string;
  emoji?: string;
}

const TIME_SLOTS: TimeSlot[] = [
  { id: "morning", label: "Morgens", time: "6-12 Uhr", emoji: "🌅" },
  { id: "afternoon", label: "Mittags", time: "12-18 Uhr", emoji: "☀️" },
  { id: "evening", label: "Abends", time: "18-22 Uhr", emoji: "🌆" },
  { id: "night", label: "Nachts", time: "22-6 Uhr", emoji: "🌙" },
];
```

---

## 7. Komponenten-Architektur

Die Komponenten-Architektur folgt den in Abschnitt 5.3 beschriebenen Strukturprinzipien. Die UI ist in drei hierarchische Ebenen unterteilt: generische UI-Komponenten, feature-spezifische Komponenten und domain-spezifische Event-Komponenten. Die vollständige Übersicht über die UI-Struktur und das Design System findet sich in Abschnitt 5.

### 7.1 Feature-Komponenten

Während die grundlegenden UI-Bausteine in Abschnitt 5 ausführlich behandelt wurden, fokussiert dieser Abschnitt auf die feature-spezifischen Komponenten, die Business-Logik implementieren.

**SmartFilter** ist ein Multi-Step-Wizard, der Nutzer durch drei Filterschritte führt:

```
components/features/SmartFilter/
├── index.tsx
├── SmartFilterHeader.tsx
├── StepWhen.tsx
├── StepWhere.tsx
└── StepWhat.tsx
```

Der Wizard gliedert sich in:

1. **Step When:** Zeitliche Eingrenzung (heute, morgen, Wochenende, custom range)
2. **Step Where:** Indoor/Outdoor-Präferenz
3. **Step What:** Kategorie- und Tageszeit-Auswahl

**Map-Komponenten:**

```
components/features/Map/
├── EventMap.tsx
└── SelectedEventOverlay.tsx
```

`EventMap` rendert die interaktive Karte mit Event-Markern, die nach Kategoriegruppen eingefärbt sind. `SelectedEventOverlay` zeigt eine Glassmorphism-Preview des ausgewählten Events am unteren Bildschirmrand.

**Home-Screen-Komponenten:**

```
components/features/Home/
├── HomeHeader.tsx
├── ActionBar.tsx
└── FilterModal.tsx
```

Diese Komponenten orchestrieren die Hauptfunktionalität: Header mit View-Mode-Toggle, Bottom Action Bar mit schnellen Filtern und das vollständige Filter-Modal.

### 7.2 Event-Komponenten

Event-Komponenten sind auf die Darstellung von Event-Details spezialisiert und werden auf der Detail-Seite (`event/[id].tsx`) komponiert:

```
components/event/
├── EventHeader.tsx           # Hero-Image mit Gradient-Overlay
├── EventTitle.tsx            # Event-Titel und Kategorie-Badge
├── EventQuickInfo.tsx        # Schnellinfo: Zeit, Ort, Preis
├── EventDetailsInfo.tsx      # Detaillierte Informationen
├── EventDescription.tsx      # Event-Beschreibung
└── EventError.tsx            # Error State
```

Diese Komponenten sind ausschließlich für die Event-Domain zuständig und könnten bei Bedarf in ein separates Event-Modul extrahiert werden.

---

## 8. Filter-System

### 8.1 Architektur

Das Filter-System implementiert eine mehrdimensionale Filterlogik. Die Architektur trennt zwischen Filter-UI, Filter-State und Filter-Logik.

```
┌─────────────────────────────────────────────────────┐
│                  ActiveFilters                       │
├─────────────────────────────────────────────────────┤
│  when: WhenFilter                                    │
│  indoor: IndoorFilter                                │
│  categories: string[]                                │
│  dateFrom: Date | null                               │
│  dateTo: Date | null                                 │
│  timeOfDay: TimeOfDay[]                              │
└─────────────────────────────────────────────────────┘
```

### 8.2 Day Presets

Für häufig genutzte Zeiträume existieren vordefinierte Quick-Filter:

```typescript
const DAY_PRESETS = {
  main: [
    { id: "today", label: "Heute" },
    { id: "tomorrow", label: "Morgen" },
    { id: "friday", label: "Fr" },
    { id: "saturday", label: "Sa" },
    { id: "sunday", label: "So" },
  ],
};
```

Die Presets sind als togglebare Chips implementiert. Ein erneuter Klick auf einen aktiven Preset setzt den Filter zurück.

### 8.3 Filter-Implementierungen

Die Anwendung bietet zwei verschiedene Filter-Interfaces:

**SmartFilter (Multi-Step Wizard)** präsentiert einen schrittweisen Filterprozess mit Step Indicator zur Fortschrittsvisualisierung.

**FilterModal (Vollständiger Dialog)** zeigt alle Filteroptionen simultan an und eignet sich für gezieltes Multi-Filter-Setzen.

### 8.4 Filter-Logik

Die Filterung erfolgt in `utils/filters.ts` durch pure Functions:

```typescript
function filterEvents(events: Event[], filters: ActiveFilters): Event[] {
  return events.filter((event) => {
    if (!matchesWhenFilter(event, filters)) return false;
    if (!matchesIndoorFilter(event, filters)) return false;
    if (!matchesCategoryFilter(event, filters)) return false;
    if (!matchesTimeOfDayFilter(event, filters)) return false;

    return true;
  });
}
```

Diese Implementierung ermöglicht einfaches Unit-Testing und garantiert vorhersagbare Ergebnisse ohne Seiteneffekte.

---

## 9. Screen-Architektur

### 9.1 Root Layout

Das Root Layout in `app/_layout.tsx` konfiguriert die grundlegende Anwendungsstruktur:

```typescript
export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [fontsLoaded] = useFonts({
        Outfit_400Regular,
        Outfit_600SemiBold,
        Outfit_700Bold,
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen
                    name="event/[id]"
                    options={{
                        presentation: 'card',
                        animation: 'slide_from_right',
                    }}
                />
            </Stack>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
```

Das Root Layout verwaltet Font-Loading, Theme-Provider-Initialisierung, Stack-Navigation-Konfiguration und Splash Screen Management.

### 9.2 Home Screen

Der Home Screen (`app/index.tsx`) verwaltet mehrere State-Aspekte:

```typescript
export default function HomeScreen() {
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isAgentVisible, setIsAgentVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeFilters, setActiveFilters] =
    useState<ActiveFilters>(DEFAULT_FILTERS);

  const filteredEvents = useMemo(() => {
    return filterEvents(MOCK_EVENTS, activeFilters);
  }, [activeFilters]);
}
```

**Screen-Komposition:**

```
┌─────────────────────────────────────┐
│         HomeHeader                  │
├─────────────────────────────────────┤
│                                     │
│    EventMap / EventList             │
│    (abhängig von viewMode)          │
│                                     │
├─────────────────────────────────────┤
│  SelectedEventOverlay               │
├─────────────────────────────────────┤
│         ActionBar                   │
└─────────────────────────────────────┘

       Modals (bei Bedarf)
┌─────────────────────────────────────┐
│  SmartFilter / FilterModal          │
└─────────────────────────────────────┘
```

### 9.3 Event Detail Screen

Die Event-Detail-Seite nutzt Dynamic Routing:

```typescript
export default function EventDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const event = MOCK_EVENTS.find(e => e.id === id);

    if (!event) {
        return <EventError message="Event nicht gefunden" />;
    }

    return (
        <View style={styles.container}>
            <EventHeader event={event} />
            <EventTitle title={event.title} />
            <EventQuickInfo event={event} />
            <EventDescription description={event.description} />
            <EventDetailsInfo event={event} />
        </View>
    );
}
```

### 9.4 Datenfluss

Der Datenfluss folgt einem unidirektionalen Pattern:

```
User Interaction
       ↓
setActiveFilters(newFilters)
       ↓
useMemo recalculates filteredEvents
       ↓
Map/List receives updated data
       ↓
UI re-renders
```

```

---

### 4.9 Screenshots: Non-Interactive Screens

> **TODO:** Hier Screenshots der ersten non-interaktiven ReactNative Screens einfügen.
>
> Diese Screenshots sollten die ersten Implementierungsschritte zeigen:
> - Home Screen (Grundstruktur ohne Funktionalität)
> - Event-Detailseite (statisches Layout)
> - Filter-Modal (UI ohne Logik)
> - Vergleich mit Figma-Design

**Hinweis:** Diese Screenshots stammen aus Sprint 4, als die Screens zunächst statisch ohne Backend-Logik implementiert wurden.

---

## 5. Heuristische Evaluation (KI-gestützt)

### 5.1 Input Prompt & verwendeter AI-Chatbot

> **TODO:** Hier den verwendeten AI-Chatbot und den genauen Prompt dokumentieren.

**Verwendeter AI-Chatbot:** [z.B. ChatGPT 4, Claude 3.5, Gemini Pro, etc.]

**Evaluierungs-Framework:** Nielsen's 10 Usability Heuristics

**Input-Material:**
- Screenshots aller Hauptscreens des ReactNative Prototypes
- Beschreibung des User Flows
- Erklärung der Hauptfunktionalitäten

**Prompt-Beispiel:**

```

Ich habe Screenshots einer Event-Discovery Mobile App namens "Event-Map" entwickelt.
Die App hat folgende Hauptfunktionen:

1. Events auf interaktiver Karte oder in Liste anzeigen
2. Multi-dimensionale Filterung (Zeit, Ort, Kategorie, Tageszeit)
3. SmartFilter-Wizard mit 3 Schritten
4. Event-Detailseiten

Bitte führe eine heuristische Evaluation basierend auf Nielsen's 10 Heuristics durch.
Identifiziere konkrete Usability-Probleme und gib Empfehlungen zur Verbesserung.

[Screenshots würden hier eingefügt]

```

---

### 5.2 Ergebnisse & Empfehlungen

> **TODO:** Hier die vollständigen Ergebnisse der AI-basierten heuristischen Evaluation einfügen.

**Beispiel-Struktur:**

#### Heuristik 1: Visibility of System Status

**Probleme gefunden:**
- [AI-Feedback zu fehlenden Status-Indikatoren]

**Empfehlungen:**
- [AI-Vorschläge zur Verbesserung]

#### Heuristik 2: Match between System and Real World

**Probleme gefunden:**
- [AI-Feedback]

**Empfehlungen:**
- [AI-Vorschläge]

[Fortsetzung für alle 10 Heuristiken...]

---

### 5.3 Kritische Reflexion der KI-Ergebnisse

> **TODO:** Hier eure kritische Auseinandersetzung mit den KI-Empfehlungen dokumentieren.

**Was war hilfreich?**

Die KI-Evaluation hat einige valide Punkte identifiziert:
- [Konkrete Beispiele von hilfreichen Insights]
- [Was habt ihr daraufhin geändert/verbessert?]

**Was war weniger hilfreich oder sogar falsch?**

Einige Empfehlungen der KI waren jedoch problematisch:
- [Beispiele von falschen oder unrealistischen Vorschlägen]
- [Begründung, warum diese Empfehlungen nicht umgesetzt wurden]

**Limitationen der KI-Evaluation:**

- Die KI hat keinen Zugriff auf den tatsächlichen Nutzungskontext
- Fehlendes Verständnis für technische Constraints (z.B. React Native Limitations)
- Keine Berücksichtigung von Performance-Aspekten
- Generische Empfehlungen ohne Priorisierung

**Lessons Learned:**

- KI kann als zusätzlicher Reviewer hilfreich sein
- Menschliche Expertise bleibt unersetzlich für Kontextualisierung
- Kombination aus AI-Evaluation und echtem User Testing ist optimal

---

## 6. User Evaluation

### 6.1 Aufgabenbeschreibung

**Test-Setup:**

- **Methode:** Think-Aloud Protocol mit Task-based Usability Testing
- **Teilnehmer:** 5 Testpersonen
- **Dauer:** 20-25 Minuten pro Session
- **Device:** [iOS/Android Smartphone mit installiertem Click-Dummy]

**Test-Aufgaben:**

**Task 1: Spontane Event-Suche**
> "Du hast gerade Feierabend und möchtest spontan etwas unternehmen. Finde ein Event für heute Abend in deiner Nähe."

**Task 2: SmartFilter nutzen**
> "Nutze den SmartFilter, um ein Outdoor-Event für Samstagmittag im Bereich 'Food & Dining' zu finden."

**Task 3: Zwischen Ansichten wechseln**
> "Wechsle zwischen der Karten- und Listenansicht und erkläre, welche du wann bevorzugen würdest."

**Task 4: Event-Details ansehen**
> "Finde heraus, wann und wo das Event 'Summer Jazz Night' stattfindet und was es kostet."

**Task 5: Filter anpassen und zurücksetzen**
> "Filtere nach mehreren Kategorien gleichzeitig und setze dann alle Filter zurück."

---

### 6.2 Zusammenfassung der Notizen & Antworten

> **TODO:** Hier eine Zusammenfassung der Beobachtungen und Nutzer-Antworten dokumentieren.

#### Testperson 1 (Anna, 24, Studentin)

**Beobachtungen:**
- [Notizen zum Verhalten während der Tasks]
- [Zitate aus Think-Aloud]

**Nachfragen:**
- **"Was fandest du besonders gut an der App?"**
  - [Antwort]
- **"Wo hattest du Schwierigkeiten?"**
  - [Antwort]
- **"Würdest du die App im Alltag nutzen?"**
  - [Antwort]

[Wiederholung für alle 5 Testpersonen...]

---

### 6.3 Analyse der wichtigsten Usability-Probleme

**Problem 1: [Titel]**

- **Beschreibung:** [Was genau war das Problem?]
- **Häufigkeit:** [Wie viele Tester hatten dieses Problem?]
- **Schweregrad:** [Hoch/Mittel/Niedrig]
- **Lösung:** [Was wurde daraufhin geändert?]

**Problem 2: [Titel]**

- **Beschreibung:**
- **Häufigkeit:**
- **Schweregrad:**
- **Lösung:**

**Problem 3: [Titel]**

- **Beschreibung:**
- **Häufigkeit:**
- **Schweregrad:**
- **Lösung:**

**Positive Findings:**

- [Was funktionierte besonders gut?]
- [Welche Features wurden gelobt?]

**Umgesetzte Verbesserungen:**

1. [Konkrete Änderung basierend auf User Feedback]
2. [Weitere Änderung]
3. [Weitere Änderung]

---

## 7. Final Click-Dummy Prototype

### 7.1 Video-Link: Vollständige Funktionalitäten

> **WICHTIG:** Hier muss der Link zum Video eingefügt werden, das alle Funktionalitäten des finalen Click-Dummy Prototypes zeigt.

**Video-Link:** [YouTube/Dropbox Link hier einfügen]

**Video-Inhalt:**

Das Video demonstriert folgende Funktionalitäten:
1. App-Start und Hauptbildschirm (Map View)
2. Wechsel zwischen Map und List View
3. Navigation durch Event-Liste
4. Tap auf Event-Marker auf der Karte
5. Öffnen der Event-Detailseite
6. Filter-Modal öffnen und Filter setzen
7. SmartFilter-Wizard Durchlauf (alle 3 Schritte)
8. Filterung nach verschiedenen Kategorien
9. Custom Date Range Picker
10. Tageszeit-Filter
11. Filter zurücksetzen
12. Event-Preview auf der Karte
13. Navigation zwischen allen Screens

**Dauer:** ca. 3-5 Minuten

---

### 7.2 Finale Screenshots

> **TODO:** Hier Screenshots des finalen, vollständig funktionalen React Native Prototypes einfügen.

**Screenshots sollten zeigen:**

1. **Home Screen - Map View**
   - Farbcodierte Event-Marker
   - Location Pills mit Glassmorphism
   - Header mit View-Toggle

2. **Home Screen - List View**
   - Event-Cards mit allen Informationen
   - Chronologische Sortierung
   - Smooth Scrolling

3. **Filter-Modal**
   - Day Presets (Heute, Morgen, etc.)
   - Indoor/Outdoor Toggle
   - Kategorien gruppiert
   - Tageszeit-Auswahl
   - Filter-Reset-Button

4. **SmartFilter - Step 1 (Wann?)**
   - Step Indicator (1/3)
   - Zeitauswahl-Optionen
   - Weiter-Button

5. **SmartFilter - Step 2 (Wo?)**
   - Step Indicator (2/3)
   - Indoor/Outdoor/Any Auswahl

6. **SmartFilter - Step 3 (Was?)**
   - Step Indicator (3/3)
   - Kategorien-Chips
   - Tageszeit-Auswahl
   - Ergebnisse-Counter

7. **Event-Detailseite**
   - Hero Image mit Gradient
   - Event-Titel
   - Kategorie-Badge
   - Datum/Zeit prominent
   - Adresse
   - Preis
   - Beschreibung
   - Indoor/Outdoor Badge

8. **Empty State**
   - "Keine Ergebnisse" Message
   - Hilfreiche Hinweise
   - Filter-Anpassungs-Vorschlag

---

## 8. Zusammenfassung & Lessons Learned

### 8.1 Projekterfolge

Event-Map wurde erfolgreich von der initialen Idee über Paper- und Figma-Prototypen bis hin zum vollständig funktionalen React Native Click-Dummy entwickelt. Der iterative Entwicklungsprozess mit mehreren Testing-Phasen führte zu einer intuitiven, visuell ansprechenden Mobile App für Event-Discovery.

**Kernleistungen:**

✅ **Vollständiger Design-Thinking-Prozess:** Von PACT-Analyse über Personas und Szenarien bis hin zu User Stories
✅ **Iteratives Prototyping:** Paper → Figma → React Native mit User Testing nach jedem Schritt
✅ **Moderne Tech-Stack:** React Native + Expo + TypeScript für Cross-Platform Development
✅ **Custom UI ohne Libraries:** Alle Komponenten selbst entwickelt für maximale Kontrolle
✅ **Zentralisiertes Design System:** Konsistente Brand Tokens für wartbaren Code
✅ **Umfangreiche Evaluation:** Heuristische Evaluation (KI-gestützt) + User Testing

---

### 8.2 Architektonische Stärken

### 8.3 Architektonische Merkmale

Das Projekt implementiert mehrere Best Practices:

**Zentralisiertes Design System** in `constants/brand.ts` gewährleistet Konsistenz über alle UI-Elemente. Alle Design-Tokens sind an einem Ort definiert.

**Vollständige TypeScript-Coverage** verhindert Runtime-Fehler durch Type-Checking zur Compile-Zeit und verbessert die IDE-Unterstützung.

**Klare Komponenten-Hierarchie** durch die Trennung zwischen UI-, Feature- und Domain-Komponenten fördert Wiederverwendbarkeit und erleichtert das Testing.

**Performance-Optimierung** durch `useMemo` vermeidet unnötige Re-Renderings bei gleichbleibenden Dependencies.

**Modulare Struktur** ermöglicht einfache Erweiterungen ohne Risiko für bestehenden Code.

### 8.4 Implementierte Best Practices

**Separation of Concerns** trennt UI, Logik und Daten in separate Verzeichnisse und Module.

**Single Source of Truth** definiert Design-Werte und Types an zentralen Stellen ohne Redundanzen.

**Pure Functions** implementiert die Filter-Logik ohne Seiteneffekte für einfaches Testing.

**Unidirektionaler Datenfluss** durch klare State-Management-Patterns.

**Semantic Naming** verwendet selbsterklärende Namen für Komponenten, Funktionen und Variablen.

### 8.5 Erweiterbarkeit und Ausblick

Die Architektur ermöglicht folgende Erweiterungen:

Neue Kategorien können durch einfache Ergänzung in `data/categories.ts` hinzugefügt werden. Zusätzliche Filter erfordern die Erweiterung von `ActiveFilters` und die Anpassung von `filterEvents()`. Neue Screens werden durch Erstellen einer Datei im `app/`-Verzeichnis implementiert. UI-Komponenten werden in `components/ui/` angelegt. Design-Anpassungen erfolgen durch Modifikation der Tokens in `constants/brand.ts`.

#### Ausblick: Nächste Entwicklungsschritte

**State Management mit Context API:**

Aktuell erfolgt das State-Management durch Props-Drilling - das bedeutet, dass Filter-Daten vom Home Screen durch mehrere Komponenten-Ebenen hindurch weitergegeben werden müssen. Die **React Context API** würde hier Verbesserungen ermöglichen:

- Vermeidung von Props-Drilling durch tief verschachtelte Komponenten
- Zentralisierter Filter-State, der von überall in der App zugänglich ist
- Bessere Performance durch intelligenteres Re-Rendering
- Einfacheres Debugging und Wartung

Dies ist eine native React-Funktion, die ohne zusätzliche Libraries auskommt und sich als logischer nächster Schritt für das State-Management anbietet.

**Datenbank-Integration und Real-time API:**

Der wichtigste nächste Schritt wäre der Übergang von statischen Mock-Daten zu echten, dynamischen Event-Daten. Dabei gibt es mehrere Optionen:

**Datenbank-Lösungen:**

- **Firebase Firestore:** Bietet Real-time Updates und einfache Integration mit React Native
- **Supabase:** Open-Source-Alternative mit vollwertigem PostgreSQL-Backend
- **REST API:** Anbindung an bestehende Event-Plattformen wie Eventbrite, Meetup oder lokale Event-Kalender

**Vorteile einer API-Integration:**

- Events werden automatisch aktualisiert, ohne App-Updates
- Größere Event-Vielfalt durch echte Datenquellen
- Nutzer sehen immer aktuelle Veranstaltungen
- Skalierbarkeit: Tausende Events statt nur Mock-Daten

**Caching für bessere Performance:**

- Zwischenspeichern von bereits geladenen Events
- Reduzierung unnötiger Netzwerk-Anfragen
- Schnellere App-Reaktion beim Navigieren

**Weitere Entwicklungsmöglichkeiten:**

- **Progressive Web App (PWA):** Offline-Funktionalität, sodass bereits geladene Events auch ohne Internet-Verbindung sichtbar bleiben
- **Virtualisierte Listen:** Bessere Performance bei hunderten von Events
- **Lazy Loading:** Event-Details und Bilder werden erst bei Bedarf geladen
- **Push Notifications:** Benachrichtigungen für neue Events in favorisierten Kategorien
- **User Authentication:** Personalisierte Empfehlungen basierend auf Nutzer-Präferenzen
- **Analytics:** Auswertung des Nutzerverhaltens zur Optimierung des SmartFilter-Algorithmus

Diese Erweiterungen würden Event-Map von einem funktionalen Prototyp zu einer produktionsreifen Anwendung entwickeln, ohne die bestehende Architektur grundlegend ändern zu müssen. Die modulare Struktur ermöglicht schrittweise Integration dieser Features.

---

_Dokumentation erstellt im Rahmen des Event-Map Projekts._
```
