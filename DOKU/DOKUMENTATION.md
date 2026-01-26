# Event-Map: Technische Dokumentation

**Projektname:** Event-Map  
**Erstellungszeitraum:** Oktober 2025 - Februar 2026  
**Dokumentationstyp:** Technische Projektdokumentation
**Modul:** Interaktive Systeme

---

## Inhaltsverzeichnis

1. [Projektübersicht](#1-projektübersicht)
2. [Team und Rollen](#2-team-und-rollen)
3. [Technologie-Stack](#3-technologie-stack)
4. [Projektstruktur](#4-projektstruktur)
5. [Branding, UI-Entwicklung & Styling](#5-branding-ui-entwicklung--styling)
6. [Datenmodellierung](#6-datenmodellierung)
7. [Komponenten-Architektur](#7-komponenten-architektur)
8. [Filter-System](#8-filter-system)
9. [Screen-Architektur](#9-screen-architektur)
10. [Zusammenfassung](#10-zusammenfassung)

---

## 1. Projektübersicht

Event-Map ist eine mobile Anwendung, die es Nutzern ermöglicht, lokale Events und Veranstaltungen zu entdecken. Die Events können wahlweise auf einer interaktiven Karte oder in einer Listenansicht dargestellt werden. Das Projekt wurde vollständig mit React Native und dem Expo-Framework in TypeScript entwickelt.

Die Kernfunktionalität umfasst vier Hauptbereiche:

**Event-Discovery:** Nutzer können Events entweder auf einer interaktiven Karte mit geografischen Markern erkunden oder durch eine scrollbare Listenansicht navigieren.

**Intelligente Filterung:** Ein mehrdimensionales Filter-System ermöglicht die präzise Eingrenzung von Events nach zeitlichen Kriterien, Lokalität und thematischen Kategorien.

**SmartFilter:** Ein Multi-Step-Wizard führt Nutzer schrittweise durch den Filterprozess und bietet eine alternative, geführte Filterung.

**Event-Details:** Jedes Event verfügt über eine dedizierte Detailseite mit umfassenden Informationen zu Beschreibung, Zeitpunkt, Ort und Preis.

Die Navigation basiert auf Expo Router, welches ein file-based Routing implementiert. Die Dateistruktur im `app`-Verzeichnis bestimmt direkt die URL-Struktur der Anwendung. Die Anwendung wurde für iOS, Android und Web entwickelt und nutzt plattformspezifische Optimierungen.

---

## 2. Team und Rollen

Event-Map wurde von einem dreiköpfigen Team entwickelt, wobei jedes Mitglied seine spezifischen Stärken und Vorkenntnisse einbrachte.

**Jannik** übernahm die technische Entwicklung und Architektur der Anwendung. Durch seinen Werkstudentenjob als Web Developer hatte er bereits umfangreiche Erfahrung mit React und React Native gesammelt. Mehrere private Projekte mit Expo und React Native hatten ihm ein solides Fundament für die Umsetzung einer mobilen Anwendung gegeben. Diese praktische Erfahrung ermöglichte es, technische Entscheidungen fundiert zu treffen und Best Practices von Anfang an zu implementieren.

**Merlin** kümmerte sich primär um das visuelle Design und die Gestaltung in Figma. Mit fundierten React-Kenntnissen aus seinem vorherigen Project C, in dem er mit der UI Library Hero UI gearbeitet hatte, brachte er ein gutes Verständnis für Komponenten-basierte Architekturen mit. Bei Event-Map entwarf er zunächst die UI-Konzepte und Screens in Figma, was eine solide Designgrundlage für die Implementierung schuf. Es war interessant zu erleben, wie der Ansatz ohne UI-Library funktioniert – eine bewusste Entscheidung, die neue Perspektiven auf UI-Entwicklung eröffnete und das Verständnis für die zugrundeliegenden React Native-Komponenten vertiefte. Die enge Zusammenarbeit zwischen Figma-Design und Code-Implementierung stellte sicher, dass das finale UI dem ursprünglichen Design-Intent entsprach.

**Philipp** kümmerte sich primär um die organisatorischen Aspekte des Projekts. Mit Kenntnissen in Kanban-Organisation strukturierte er den Entwicklungsprozess und sorgte für einen effizienten Workflow. Sein Fokus lag auf dem Testing und der Konzeptionierung des User Flows – er stellte sicher, dass die Anwendung nicht nur technisch funktioniert, sondern auch intuitiv bedienbar ist. Durch iteratives Testing und UX-Feedback half er dabei, die Benutzerführung zu optimieren und Schwachstellen in der Interaktion frühzeitig zu identifizieren.

Diese Rollenverteilung erwies sich als effektiv: Technische Umsetzung, React-spezifische Expertise und UX-Fokus ergänzten sich gegenseitig und führten zu einer ausgewogenen Entwicklung, bei der sowohl Code-Qualität als auch Nutzererlebnis im Vordergrund standen.

---

## 3. Technologie-Stack

### 3.1 Core Technologies

Die technologische Basis bildet React Native in Kombination mit Expo. React Native ermöglicht die Entwicklung einer einzigen Codebasis für iOS und Android, während Expo das Development-Tooling bereitstellt und Funktionen wie Hot Reloading, Over-the-Air-Updates und vereinfachtes Deployment bietet.

| Technologie | Version | Verwendungszweck |
|-------------|---------|------------------|
| React | 19.1.0 | UI Library |
| React Native | 0.81.5 | Cross-Platform Framework |
| Expo | ~54.0 | Development Platform |
| Expo Router | ~6.0 | File-based Navigation |
| TypeScript | ~5.9.2 | Type-Safe Development |


### 3.2 Funktionale Dependencies

Die Kernfunktionalität wird durch folgende Libraries realisiert:

**react-native-maps (1.20.1)** integriert native Kartenkomponenten und ermöglicht die Darstellung von Events auf einer interaktiven Karte.

**expo-location (~19.0.7)** stellt Standort-Services für Lokalisierung und Geocoding bereit.

**@react-native-community/datetimepicker (~8.4.4)** implementiert native Datums- und Zeitauswahl-Komponenten.

**date-fns (^4.1.0)** bietet umfassende Funktionen für Datumsberechnungen und Formatierung.

---

## 4. Projektstruktur

### 4.1 Verzeichnisorganisation

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

### 4.2 Verzeichnis-Details

**app/** enthält alle Screens und nutzt Expo Routers file-based Routing. Die Datei `_layout.tsx` definiert das Root Layout mit Theme-Provider, Font-Loading und Stack-Navigation. Der Hauptbildschirm befindet sich in `index.tsx`, während `event/[id].tsx` eine dynamische Route für Event-Details implementiert, wobei `[id]` als URL-Parameter fungiert.

**components/** ist in drei hierarchische Ebenen unterteilt. Das Unterverzeichnis `features/` enthält komplexe, feature-spezifische Komponenten wie den SmartFilter oder Map-Komponenten. Das Verzeichnis `ui/` beherbergt generische, wiederverwendbare UI-Bausteine ohne Business-Logik. Das Unterverzeichnis `event/` gruppiert domain-spezifische Komponenten für die Event-Detaildarstellung.

**types/** zentralisiert alle TypeScript-Type-Definitionen in einer einzigen `index.ts`-Datei. Diese Struktur verhindert Redundanzen und gewährleistet Konsistenz bei Type-Definitionen.

**constants/** enthält das vollständige Design System. Die Datei `brand.ts` definiert alle Design Tokens wie Farben, Typografie, Spacing, Border Radius, Shadows und Animationsdauern.

**data/** speichert Mock-Event-Daten sowie die Kategorisierung von Events in thematische Gruppen.

**utils/** stellt wiederverwendbare Utility-Funktionen bereit, insbesondere für Filter-Logik und Datumsoperationen.

---

## 5. Branding, UI-Entwicklung & Styling

### 5.1 Vision und Design-Inspiration

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
const primary = '#B73B00';
const primaryLight = '#D45A20';
const primaryDark = '#8A2C00';

// Secondary Colors - Rose Dust
const secondary = '#D4CAC7';
const secondaryLight = '#E8E2E0';
const secondaryDark = '#B8ABA7';
```

Die Gray Scale ist subtil in Richtung Rose Dust getönt (#FAF9F9 bis #1A1817), was eine harmonische Farbkomposition über alle UI-Elemente garantiert.

**Theme Support:**

```typescript
const ThemeColors = {
    light: {
        text: '#1A1817',
        textSecondary: '#7A706C',
        background: '#FFFFFF',
        primary: '#B73B00',
    },
    dark: {
        text: '#FAF9F9',
        textSecondary: '#B8ABA7',
        background: '#1A1817',
        primary: '#D45A20',
    },
};
```

**Typography System:**

Die Typografie nutzt ausschließlich **Outfit** (Google Fonts), verfügbar in neun Gewichtungen. Vordefinierte Presets gewährleisten konsistente Texthierarchien:

```typescript
const headings = {
    h1: {
        fontFamily: 'Outfit_800ExtraBold',
        fontSize: 32,
        letterSpacing: -0.5,
        lineHeight: 1.1,
    },
    h2: {
        fontFamily: 'Outfit_700Bold',
        fontSize: 24,
        letterSpacing: -0.3,
        lineHeight: 1.2,
    },
    body: {
        fontFamily: 'Outfit_400Regular',
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 1.5,
    },
    button: {
        fontFamily: 'Outfit_600SemiBold',
        fontSize: 16,
        letterSpacing: 0.3,
    },
};
```

**Spacing:**
```typescript
const Spacing = {
    xs: 4, sm: 8, md: 12, lg: 16, 
    xl: 20, xxl: 24, xxxl: 32, huge: 40
};
```

**Border Radius:**
```typescript
const BorderRadius = {
    xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24,
    full: 9999,
    chip: 20,      // Spezifisch für Filter-Chips
    card: 16,      // Card-Komponenten
    modal: 24,     // Modale Dialoge
    button: 30,    // Primary Buttons
};
```

**Shadows:**
```typescript
const Shadows = {
    sm: { shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, elevation: 1 },
    md: { shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, elevation: 2 },
    lg: { shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, elevation: 4 },
    xl: { shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, elevation: 8 },
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
        backgroundColor: '#F5F3F2',
        activeBackgroundColor: '#B73B00',
    },
    card: {
        padding: 16,
        borderRadius: 16,
        ...Shadows.md,
    },
    button: {
        primary: {
            backgroundColor: '#B73B00',
            textColor: '#FFFFFF',
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
    fast: 150,      // Hover-Effekte
    normal: 250,    // Standard-Transitions
    slow: 350,      // Modal-Animationen
    verySlow: 500,  // komplexe Übergänge
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
    | 'any' | 'today' | 'tomorrow' 
    | 'friday' | 'saturday' | 'sunday'
    | 'weekend' | 'nextWeek' | 'custom';

type IndoorFilter = 'any' | 'indoor' | 'outdoor';

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

interface ActiveFilters {
    when: WhenFilter;
    indoor: IndoorFilter;
    categories: string[];
    dateFrom: Date | null;
    dateTo: Date | null;
    timeOfDay: TimeOfDay[];
}

const DEFAULT_FILTERS: ActiveFilters = {
    when: 'any',
    indoor: 'any',
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
    { id: 'party', label: 'Party', emoji: '🎉', displayLabel: '🎉 Party' },
    { id: 'konzert', label: 'Konzert', emoji: '🎵', displayLabel: '🎵 Konzert' },
    { id: 'bar', label: 'Bar', emoji: '🍹', displayLabel: '🍹 Bar' },
    // weitere Kategorien
];
```

**Kategorie-Gruppen:**

| Gruppe | Farbe | Enthaltene Kategorien |
|--------|-------|----------------------|
| Nightlife & Party | #1E3A5F | party, club, konzert, livemusik, dj |
| Drinks & Bars | #9B2335 | bar, cocktails, bier, wein, craft |
| Food & Dining | #D4763B | restaurant, cafe, brunch, streetfood |
| Entertainment | #7B3F8F | comedy, quiz, karaoke, show, theater, kino |
| Aktivitäten | #2D8C5A | sport, games, darts, billard |
| Kunst & Kultur | #C76B98 | kunst, ausstellung, lesung |
| Special Events | #D4A030 | festival, markt, openair, rooftop |
| Social | #3498DB | dating, networking, workshop |

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
    { id: 'morning', label: 'Morgens', time: '6-12 Uhr', emoji: '🌅' },
    { id: 'afternoon', label: 'Mittags', time: '12-18 Uhr', emoji: '☀️' },
    { id: 'evening', label: 'Abends', time: '18-22 Uhr', emoji: '🌆' },
    { id: 'night', label: 'Nachts', time: '22-6 Uhr', emoji: '🌙' },
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
        { id: 'today', label: 'Heute' },
        { id: 'tomorrow', label: 'Morgen' },
        { id: 'friday', label: 'Fr' },
        { id: 'saturday', label: 'Sa' },
        { id: 'sunday', label: 'So' },
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
    return events.filter(event => {
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
    const [viewMode, setViewMode] = useState<ViewMode>('map');
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [isAgentVisible, setIsAgentVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>(DEFAULT_FILTERS);
    
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

---


## 10. Zusammenfassung

### 10.1 Architektonische Merkmale

Das Projekt implementiert mehrere Best Practices:

**Zentralisiertes Design System** in `constants/brand.ts` gewährleistet Konsistenz über alle UI-Elemente. Alle Design-Tokens sind an einem Ort definiert.

**Vollständige TypeScript-Coverage** verhindert Runtime-Fehler durch Type-Checking zur Compile-Zeit und verbessert die IDE-Unterstützung.

**Klare Komponenten-Hierarchie** durch die Trennung zwischen UI-, Feature- und Domain-Komponenten fördert Wiederverwendbarkeit und erleichtert das Testing.

**Performance-Optimierung** durch `useMemo` vermeidet unnötige Re-Renderings bei gleichbleibenden Dependencies.

**Modulare Struktur** ermöglicht einfache Erweiterungen ohne Risiko für bestehenden Code.

### 10.2 Implementierte Best Practices

**Separation of Concerns** trennt UI, Logik und Daten in separate Verzeichnisse und Module.

**Single Source of Truth** definiert Design-Werte und Types an zentralen Stellen ohne Redundanzen.

**Pure Functions** implementiert die Filter-Logik ohne Seiteneffekte für einfaches Testing.

**Unidirektionaler Datenfluss** durch klare State-Management-Patterns.

**Semantic Naming** verwendet selbsterklärende Namen für Komponenten, Funktionen und Variablen.

### 10.3 Erweiterbarkeit und Ausblick

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

*Dokumentation erstellt im Rahmen des Event-Map Projekts.*
