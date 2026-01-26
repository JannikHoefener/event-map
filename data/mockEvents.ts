/**
 * Mock Events Data
 * 
 * Beispieldaten für Events und Standard-Karteneinstellungen.
 * Fokus auf Aktivitäten und Ausgeh-Events in Hamburg.
 * 
 * Coverage:
 * - Alle Kategorien (Nightlife, Drinks, Food, Entertainment, etc.)
 * - Diverse Zeiten (Morgens, Mittags, Abends, Nachts)
 * - Diverse Tage (Heute, Morgen, Wochenende)
 * - Indoor/Outdoor Mix
 */

import { Event } from '../types';

// ============================================================================
// Date Helpers
// ============================================================================

const now = new Date();
const today = new Date();
const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);
const dayAfterTomorrow = new Date(now); dayAfterTomorrow.setDate(now.getDate() + 2);

// Helper to get next specific day (0 = Sunday, 1 = Monday, ..., 5 = Friday, 6 = Saturday)
const getNextDay = (dayIndex: number): Date => {
    const d = new Date();
    d.setDate(d.getDate() + ((dayIndex + 7 - d.getDay()) % 7));
    if (d <= now) d.setDate(d.getDate() + 7); // Ensure it's in the future if today matches
    return d;
};

const nextFriday = getNextDay(5);
const nextSaturday = getNextDay(6);
const nextSunday = getNextDay(0);

// Helper to set time on a date object
const setTime = (date: Date, hours: number, minutes: number = 0): Date => {
    const d = new Date(date);
    d.setHours(hours, minutes, 0, 0);
    return d;
};

// ============================================================================
// Mock Events - Comprehensive Set
// ============================================================================

export const MOCK_EVENTS: Event[] = [
    // --- NIGHTLIFE & PARTY ---
    {
        id: 'party_1',
        title: 'Techno Thunder',
        category: 'party',
        time: '23:00',
        price: '15€',
        indoor: true,
        coordinate: { latitude: 53.5465, longitude: 9.9690 }, // PAL-ish
        date: setTime(nextSaturday, 23, 0),
        description: 'Die härtesten Bässe der Stadt. Techno all night long.',
    },
    {
        id: 'club_1',
        title: 'Golden Cut Saturday',
        category: 'club',
        time: '22:00',
        price: '20€',
        indoor: true,
        coordinate: { latitude: 53.5550, longitude: 10.0050 }, // Near Hbf
        date: setTime(nextSaturday, 22, 0),
        description: 'Exklusives Clubbing Ambiente mit House und RnB.',
    },
    {
        id: 'konzert_1',
        title: 'Indie Rock Night',
        category: 'konzert',
        time: '20:00',
        price: '25€',
        indoor: true,
        coordinate: { latitude: 53.5510, longitude: 9.9640 }, // Uebel & Gefährlich
        date: setTime(nextFriday, 20, 0),
    },
    {
        id: 'livemusik_1',
        title: 'Jazz im Cotton Club',
        category: 'livemusik',
        time: '20:30',
        price: '12€',
        indoor: true,
        coordinate: { latitude: 53.5450, longitude: 9.9800 },
        date: setTime(today, 20, 30),
        description: 'Finest Swing und Jazz Classics live.',
    },
    {
        id: 'dj_1',
        title: 'Sunday Sunset Sessions',
        category: 'dj',
        time: '16:00',
        price: 'Free',
        indoor: false,
        coordinate: { latitude: 53.5600, longitude: 9.9500 }, // Park Fiction
        date: setTime(nextSunday, 16, 0),
        description: 'Entspannte Deep House Beats zum Sonnenuntergang am Hafen.',
    },

    // --- DRINKS & BARS ---
    {
        id: 'bar_1',
        title: 'Le Lion - Bar de Paris',
        category: 'bar',
        time: '19:00',
        price: '$$$',
        indoor: true,
        coordinate: { latitude: 53.5515, longitude: 9.9920 },
        date: setTime(today, 19, 0),
        description: 'Klassische High-End Bar, bekannt für den Gin Basil Smash.',
    },
    {
        id: 'cocktails_1',
        title: 'Happy Hour @ Skyline',
        category: 'cocktails',
        time: '18:00',
        price: '$$',
        indoor: true,
        coordinate: { latitude: 53.5480, longitude: 9.9650 }, // Near Reeperbahn
        date: setTime(today, 18, 0),
    },
    {
        id: 'bier_1',
        title: 'Brauhaus Tour',
        category: 'bier',
        time: '14:00',
        price: '20€',
        indoor: true,
        coordinate: { latitude: 53.5620, longitude: 9.9600 }, // Schanze
        date: setTime(nextSaturday, 14, 0),
    },
    {
        id: 'wein_1',
        title: 'Wein & Käse Abend',
        category: 'wein',
        time: '19:30',
        price: '30€',
        indoor: true,
        coordinate: { latitude: 53.5900, longitude: 9.9950 }, // Poppenbüttel/Winterhudeish
        date: setTime(nextFriday, 19, 30),
    },
    {
        id: 'craft_1',
        title: 'Craft Beer Tasting',
        category: 'craft',
        time: '20:00',
        price: '25€',
        indoor: true,
        coordinate: { latitude: 53.5580, longitude: 9.9680 },
        date: setTime(tomorrow, 20, 0),
    },

    // --- FOOD & DINING ---
    {
        id: 'restaurant_1',
        title: 'Dinner in the Dark',
        category: 'restaurant',
        time: '19:00',
        price: '60€',
        indoor: true,
        coordinate: { latitude: 53.5530, longitude: 10.0100 },
        date: setTime(tomorrow, 19, 0),
        description: 'Ein Sinneserlebnis der besonderen Art.',
    },
    {
        id: 'cafe_1',
        title: 'Specialty Coffee Cupping',
        category: 'cafe',
        time: '15:00',
        price: '10€',
        indoor: true,
        coordinate: { latitude: 53.5650, longitude: 9.9550 },
        date: setTime(today, 15, 0),
    },
    {
        id: 'brunch_1',
        title: 'Vegan Sunday Brunch',
        category: 'brunch',
        time: '10:00',
        price: '22€',
        indoor: true,
        coordinate: { latitude: 53.5585, longitude: 9.9700 },
        date: setTime(nextSunday, 10, 0),
    },
    {
        id: 'streetfood_1',
        title: 'Food Truck Festival',
        category: 'streetfood',
        time: '12:00',
        price: 'Free',
        indoor: false,
        coordinate: { latitude: 53.5500, longitude: 9.9800 }, // Spielbudenplatz
        date: setTime(nextFriday, 12, 0),
    },

    // --- ENTERTAINMENT ---
    {
        id: 'comedy_1',
        title: 'Stand-Up Open Mic',
        category: 'comedy',
        time: '20:00',
        price: '5€',
        indoor: true,
        coordinate: { latitude: 53.5560, longitude: 9.9600 },
        date: setTime(today, 20, 0),
    },
    {
        id: 'quiz_1',
        title: 'Pub Quiz - Harry Potter Special',
        category: 'quiz',
        time: '19:00',
        price: '5€',
        indoor: true,
        coordinate: { latitude: 53.5520, longitude: 9.9710 },
        date: setTime(tomorrow, 19, 0),
    },
    {
        id: 'karaoke_1',
        title: 'Thai Oase Karaoke',
        category: 'karaoke',
        time: '22:00',
        price: 'Free',
        indoor: true,
        coordinate: { latitude: 53.5490, longitude: 9.9620 },
        date: setTime(nextSaturday, 22, 0),
        description: 'Der Klassiker auf der Großen Freiheit. Sing dich in die Herzen der Stadt!',
    },
    {
        id: 'theater_1',
        title: 'Der König der Löwen',
        category: 'theater',
        time: '18:30',
        price: '90€',
        indoor: true,
        coordinate: { latitude: 53.5430, longitude: 9.9700 }, // Harbor
        date: setTime(tomorrow, 18, 30),
    },
    {
        id: 'kino_1',
        title: 'Sneak Preview',
        category: 'kino',
        time: '23:00',
        price: '7€',
        indoor: true,
        coordinate: { latitude: 53.5540, longitude: 9.9900 },
        date: setTime(today, 23, 0),
    },

    // --- SPORTS & ACTIVITIES ---
    {
        id: 'sport_1',
        title: 'Lauftreff Alster',
        category: 'sport',
        time: '18:00',
        price: 'Free',
        indoor: false,
        coordinate: { latitude: 53.5650, longitude: 10.0000 },
        date: setTime(today, 18, 0),
        description: 'Gemeinsame Runde um die Außenalster, ca. 7.4km.',
    },
    {
        id: 'games_1',
        title: 'Board Game Night',
        category: 'games',
        time: '19:00',
        price: 'Free',
        indoor: true,
        coordinate: { latitude: 53.5700, longitude: 9.9800 },
        date: setTime(tomorrow, 19, 0),
    },
    {
        id: 'darts_1',
        title: 'Darts Turnier Amateur',
        category: 'darts',
        time: '18:00',
        price: '10€',
        indoor: true,
        coordinate: { latitude: 53.5555, longitude: 9.9620 },
        date: setTime(nextFriday, 18, 0),
    },
    {
        id: 'billard_1',
        title: 'Billard Abend',
        category: 'billard',
        time: '20:00',
        price: '10€/h',
        indoor: true,
        coordinate: { latitude: 53.5600, longitude: 9.9500 },
        date: setTime(today, 20, 0),
    },

    // --- ART & CULTURE ---
    {
        id: 'kunst_1',
        title: 'Vernissage: Modern Colours',
        category: 'kunst',
        time: '19:00',
        price: 'Free',
        indoor: true,
        coordinate: { latitude: 53.5590, longitude: 9.9480 }, // Altona
        date: setTime(nextFriday, 19, 0),
    },
    {
        id: 'ausstellung_1',
        title: 'Miniatur Wunderland Special',
        category: 'ausstellung',
        time: '09:00',
        price: '20€',
        indoor: true,
        coordinate: { latitude: 53.5435, longitude: 9.9880 },
        date: setTime(tomorrow, 9, 0),
    },
    {
        id: 'lesung_1',
        title: 'Krimi Lesung',
        category: 'lesung',
        time: '20:00',
        price: '15€',
        indoor: true,
        coordinate: { latitude: 53.5580, longitude: 9.9900 },
        date: setTime(nextSunday, 20, 0),
    },

    // --- SPECIAL ---
    {
        id: 'festival_1',
        title: 'Hafenfest',
        category: 'festival',
        time: '12:00',
        price: 'Free',
        indoor: false,
        coordinate: { latitude: 53.5450, longitude: 9.9600 },
        date: setTime(nextSaturday, 12, 0),
    },
    {
        id: 'markt_1',
        title: 'Isemarkt',
        category: 'markt',
        time: '08:00',
        price: 'Free',
        indoor: false,
        coordinate: { latitude: 53.5820, longitude: 9.9750 },
        date: setTime(nextFriday, 8, 30), // Usually Tues/Fri
    },
    {
        id: 'rooftop_1',
        title: 'Rooftop Chillout',
        category: 'rooftop',
        time: '17:00',
        price: 'Free',
        indoor: false,
        coordinate: { latitude: 53.5495, longitude: 9.9900 },
        date: setTime(today, 17, 0),
    },

    // --- SOCIAL ---
    {
        id: 'dating_1',
        title: 'Single Cooking Night',
        category: 'dating',
        time: '18:00',
        price: '40€',
        indoor: true,
        coordinate: { latitude: 53.5650, longitude: 9.9850 },
        date: setTime(nextFriday, 18, 0),
    },
    {
        id: 'networking_1',
        title: 'Tech Meetup Hamburg',
        category: 'networking',
        time: '19:00',
        price: 'Free',
        indoor: true,
        coordinate: { latitude: 53.5550, longitude: 9.9800 },
        date: setTime(tomorrow, 19, 0),
    },
    {
        id: 'workshop_1',
        title: 'Photography Workshop',
        category: 'workshop',
        time: '10:00',
        price: '50€',
        indoor: false,
        coordinate: { latitude: 53.5470, longitude: 9.9750 },
        date: setTime(nextSaturday, 10, 0),
        description: 'Lerne die Grundlagen der Street Photography.',
    },

    // --- MORE NIGHTLIFE ---
    {
        id: 'party_2',
        title: 'Friday Night Fever',
        category: 'party',
        time: '22:00',
        price: '10€',
        indoor: true,
        coordinate: { latitude: 53.5520, longitude: 9.9580 },
        date: setTime(nextFriday, 22, 0),
    },
    {
        id: 'club_2',
        title: 'Warehouse Rave',
        category: 'club',
        time: '23:30',
        price: '18€',
        indoor: true,
        coordinate: { latitude: 53.5400, longitude: 9.9550 },
        date: setTime(nextSaturday, 23, 30),
    },
    {
        id: 'konzert_2',
        title: 'Acoustic Session',
        category: 'konzert',
        time: '19:00',
        price: '15€',
        indoor: true,
        coordinate: { latitude: 53.5630, longitude: 9.9720 },
        date: setTime(today, 19, 0),
    },
    {
        id: 'livemusik_2',
        title: 'Blues Brothers Tribute',
        category: 'livemusik',
        time: '21:00',
        price: '20€',
        indoor: true,
        coordinate: { latitude: 53.5480, longitude: 9.9620 },
        date: setTime(nextFriday, 21, 0),
    },
    {
        id: 'dj_2',
        title: 'Rooftop Beats',
        category: 'dj',
        time: '18:30',
        price: 'Free',
        indoor: false,
        coordinate: { latitude: 53.5510, longitude: 9.9880 },
        date: setTime(today, 18, 30),
    },

    // --- MORE DRINKS ---
    {
        id: 'bar_2',
        title: 'Whiskey Tasting',
        category: 'bar',
        time: '20:00',
        price: '35€',
        indoor: true,
        coordinate: { latitude: 53.5570, longitude: 9.9650 },
        date: setTime(tomorrow, 20, 0),
    },
    {
        id: 'cocktails_2',
        title: 'Mojito Masterclass',
        category: 'cocktails',
        time: '19:30',
        price: '40€',
        indoor: true,
        coordinate: { latitude: 53.5490, longitude: 9.9710 },
        date: setTime(nextSaturday, 19, 30),
    },
    {
        id: 'bier_2',
        title: 'Oktoberfest Warm-Up',
        category: 'bier',
        time: '17:00',
        price: '15€',
        indoor: false,
        coordinate: { latitude: 53.5600, longitude: 9.9650 },
        date: setTime(nextFriday, 17, 0),
    },
    {
        id: 'wein_2',
        title: 'Italian Wine Night',
        category: 'wein',
        time: '20:00',
        price: '28€',
        indoor: true,
        coordinate: { latitude: 53.5530, longitude: 9.9920 },
        date: setTime(today, 20, 0),
    },
    {
        id: 'craft_2',
        title: 'IPA Festival',
        category: 'craft',
        time: '15:00',
        price: '20€',
        indoor: false,
        coordinate: { latitude: 53.5610, longitude: 9.9590 },
        date: setTime(nextSunday, 15, 0),
    },

    // --- MORE FOOD ---
    {
        id: 'restaurant_2',
        title: 'Sushi All You Can Eat',
        category: 'restaurant',
        time: '18:00',
        price: '30€',
        indoor: true,
        coordinate: { latitude: 53.5560, longitude: 9.9850 },
        date: setTime(tomorrow, 18, 0),
    },
    {
        id: 'cafe_2',
        title: 'Latte Art Workshop',
        category: 'cafe',
        time: '11:00',
        price: '25€',
        indoor: true,
        coordinate: { latitude: 53.5680, longitude: 9.9620 },
        date: setTime(nextSaturday, 11, 0),
    },
    {
        id: 'brunch_2',
        title: 'Champagne Breakfast',
        category: 'brunch',
        time: '09:00',
        price: '35€',
        indoor: true,
        coordinate: { latitude: 53.5500, longitude: 9.9950 },
        date: setTime(nextSunday, 9, 0),
    },
    {
        id: 'streetfood_2',
        title: 'Asian Night Market',
        category: 'streetfood',
        time: '18:00',
        price: 'Free',
        indoor: false,
        coordinate: { latitude: 53.5520, longitude: 9.9820 },
        date: setTime(nextFriday, 18, 0),
    },

    // --- MORE ENTERTAINMENT ---
    {
        id: 'comedy_2',
        title: 'Improv Comedy Show',
        category: 'comedy',
        time: '21:00',
        price: '18€',
        indoor: true,
        coordinate: { latitude: 53.5540, longitude: 9.9750 },
        date: setTime(nextSaturday, 21, 0),
    },
    {
        id: 'quiz_2',
        title: 'Music Quiz Night',
        category: 'quiz',
        time: '20:00',
        price: 'Free',
        indoor: true,
        coordinate: { latitude: 53.5580, longitude: 9.9680 },
        date: setTime(today, 20, 0),
    },
    {
        id: 'show_1',
        title: 'Magic Show Extravaganza',
        category: 'show',
        time: '19:30',
        price: '25€',
        indoor: true,
        coordinate: { latitude: 53.5460, longitude: 9.9720 },
        date: setTime(nextFriday, 19, 30),
    },
    {
        id: 'theater_2',
        title: 'Shakespeare im Park',
        category: 'theater',
        time: '20:00',
        price: '12€',
        indoor: false,
        coordinate: { latitude: 53.5670, longitude: 9.9550 },
        date: setTime(nextSaturday, 20, 0),
    },
    {
        id: 'kino_2',
        title: 'Open Air Cinema',
        category: 'kino',
        time: '21:00',
        price: '8€',
        indoor: false,
        coordinate: { latitude: 53.5640, longitude: 9.9480 },
        date: setTime(nextFriday, 21, 0),
    },

    // --- MORE SPECIAL EVENTS ---
    {
        id: 'openair_1',
        title: 'Summer Open Air Concert',
        category: 'openair',
        time: '16:00',
        price: '25€',
        indoor: false,
        coordinate: { latitude: 53.5420, longitude: 9.9820 },
        date: setTime(nextSunday, 16, 0),
    },
    {
        id: 'rooftop_2',
        title: 'Skyline Yoga',
        category: 'rooftop',
        time: '07:00',
        price: '15€',
        indoor: false,
        coordinate: { latitude: 53.5505, longitude: 9.9910 },
        date: setTime(nextSaturday, 7, 0),
    },
    {
        id: 'festival_2',
        title: 'Altonale Straßenfest',
        category: 'festival',
        time: '14:00',
        price: 'Free',
        indoor: false,
        coordinate: { latitude: 53.5520, longitude: 9.9350 },
        date: setTime(nextSunday, 14, 0),
        description: 'Hamburgs größtes Stadtteilfest mit Musik, Kunst und Kultur.',
    },
];

// ============================================================================
// Default Map Settings - Hamburg Zentrum
// ============================================================================

export const DEFAULT_MAP_REGION = {
    latitude: 53.5511,
    longitude: 9.9937,
    latitudeDelta: 0.08, // Slightly larger delta to see more events
    longitudeDelta: 0.08,
};

export const DEFAULT_LOCATION = {
    name: 'Hamburg',
    coordinate: {
        latitude: 53.5511,
        longitude: 9.9937,
    },
};

// ============================================================================
// Event Helpers
// ============================================================================

/**
 * Get events for today
 */
export const getTodayEvents = (): Event[] => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    const tm = new Date(t);
    tm.setDate(tm.getDate() + 1);

    return MOCK_EVENTS.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= t && eventDate < tm;
    });
};

/**
 * Get events by category
 */
export const getEventsByCategory = (categoryId: string): Event[] => {
    return MOCK_EVENTS.filter(event => event.category === categoryId);
};

/**
 * Get indoor events
 */
export const getIndoorEvents = (): Event[] => {
    return MOCK_EVENTS.filter(event => event.indoor);
};

/**
 * Get outdoor events
 */
export const getOutdoorEvents = (): Event[] => {
    return MOCK_EVENTS.filter(event => !event.indoor);
};
