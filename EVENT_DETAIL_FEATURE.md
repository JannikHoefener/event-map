# Event Detail Page Feature

## Übersicht
Die Event-Detail-Seite bietet eine umfassende Detailansicht für einzelne Events. Sie ist über den App Router erreichbar und zeigt alle wichtigen Event-Informationen an.

## Implementierte Features

### ✅ Event-Detail-Seite (`/app/event/[id].tsx`)
- **Dynamische Route**: Verwendet Expo Router's dynamische Parameter `[id]`
- **Farbiges Header**: Gradient-Header mit der jeweiligen Event-Kategorie-Farbe
- **Back Button**: Erlaubt Navigation zurück zur vorherigen Seite
- **Umfassende Informationen**:
  - Event-Titel und Preis
  - Datum (formatiert auf Deutsch)
  - Uhrzeit
  - Ort (Indoor/Outdoor)
  - Koordinaten
  - Beschreibung (wenn vorhanden)
  - Event-Details in Karten-Layout

### ✅ Navigation
- **Von der Karte**: Klick auf Event Card nach Pin-Auswahl navigiert zur Detail-Seite
- **Von der Liste**: Klick auf Event Card in der Listenansicht navigiert zur Detail-Seite
- **Einfache Rückkehr**: Back-Button bringt den Nutzer zurück

### ✅ Design
- **Responsive Layout**: Angepasst an verschiedene Bildschirmgrößen
- **Brand-konsistent**: Verwendet das Brand Design System
- **Premium Look**: 
  - Gradient-Header
  - Icon-basierte Info-Karten
  - Saubere Typografie
  - Schatten und Rundungen

## Geänderte Dateien

1. **`/app/event/[id].tsx`** (NEU)
   - Event-Detail-Screen mit allen Informationen

2. **`/app/_layout.tsx`**
   - Registrierung der neuen Route im Stack Navigator
   - Animation: `slide_from_right`

3. **`/app/index.tsx`**
   - Import von `router` von expo-router
   - Implementierung der Navigation in `handleEventPress()`

4. **`/data/mockEvents.ts`**
   - Hinzugefügt: Beschreibungen für die ersten Events (Jazz Night, Pub Quiz, Rooftop Sundowner, Comedy Night)

## Verwendung

### Vom Nutzer-Standpunkt:
1. **Von der Kartenansicht**:
   - Tippe auf einen Event-Pin
   - Event Card erscheint am unteren Bildschirmrand
   - Tippe auf die Event Card
   - → Event-Detail-Seite öffnet sich

2. **Von der Listenansicht**:
   - Wechsle zur Listenansicht
   - Tippe auf ein Event in der Liste
   - → Event-Detail-Seite öffnet sich

3. **Zurück navigieren**:
   - Tippe auf den Back-Button oben links
   - → Zurück zur vorherigen Ansicht

## Technische Details

### Routing
- Verwendet Expo Router's file-based routing
- Dynamische Parameter über `useLocalSearchParams()`
- Navigation via `router.push()`

### Datenstruktur
```typescript
interface Event {
    id: string;
    title: string;
    coordinate: Coordinate;
    category: string;
    price: string;
    time: string;
    date: Date;
    indoor: boolean;
    description?: string;  // Optional
    imageUrl?: string;     // Für zukünftige Verwendung
}
```

### Nächste Schritte (Vorschläge)
- [ ] Event-Bilder integrieren
- [ ] Teilen-Funktionalität hinzufügen
- [ ] Favoriten-Button
- [ ] Karte mit Event-Location
- [ ] Teilnehmerzahl/Kapazität
- [ ] Ticket-Link
- [ ] Kommentare/Bewertungen

## Entwickler-Notizen
- Event-Daten kommen aktuell aus `MOCK_EVENTS`
- Bei "Event nicht gefunden" wird ein Fehler-Screen mit Zurück-Button angezeigt
- StatusBar wird auf "light" gesetzt für bessere Lesbarkeit über dem dunklen Header
- Alle Texte sind auf Deutsch
