/**
 * Mock Events Data
 * 
 * Beispieldaten für Events und Standard-Karteneinstellungen.
 * Fokus auf Aktivitäten und Ausgeh-Events in Hamburg.
 */

import { Event } from '../types';

// ============================================================================
// Mock Events - Activity-focused
// ============================================================================

export const MOCK_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Jazz Night im Knust',
        category: 'livemusik',
        time: '20:00',
        price: '15€',
        indoor: true,
        coordinate: {
            latitude: 53.5605,
            longitude: 9.9614,
        },
        date: new Date(),
    },
    {
        id: '2',
        title: 'Pub Quiz @ Shamrock',
        category: 'quiz',
        time: '19:30',
        price: 'Kostenlos',
        indoor: true,
        coordinate: {
            latitude: 53.5520,
            longitude: 9.9710,
        },
        date: new Date(),
    },
    {
        id: '3',
        title: 'Rooftop Sundowner',
        category: 'rooftop',
        time: '18:00',
        price: '5€',
        indoor: false,
        coordinate: {
            latitude: 53.5495,
            longitude: 9.9900,
        },
        date: new Date(),
    },
    {
        id: '4',
        title: 'Comedy Night im Quatsch',
        category: 'comedy',
        time: '20:30',
        price: '22€',
        indoor: true,
        coordinate: {
            latitude: 53.5540,
            longitude: 9.9750,
        },
        date: new Date(),
    },
    {
        id: '5',
        title: 'Craft Beer Tasting',
        category: 'craft',
        time: '19:00',
        price: '25€',
        indoor: true,
        coordinate: {
            latitude: 53.5580,
            longitude: 9.9680,
        },
        date: new Date(),
    },
    {
        id: '6',
        title: 'Electro Night @ Molotow',
        category: 'club',
        time: '23:00',
        price: '12€',
        indoor: true,
        coordinate: {
            latitude: 53.5495,
            longitude: 9.9635,
        },
        date: new Date(),
    },
    {
        id: '7',
        title: 'Karaoke im Komet',
        category: 'karaoke',
        time: '21:00',
        price: 'Kostenlos',
        indoor: true,
        coordinate: {
            latitude: 53.5630,
            longitude: 9.9590,
        },
        date: new Date(),
    },
    {
        id: '8',
        title: 'Weinprobe Altona',
        category: 'wein',
        time: '18:30',
        price: '35€',
        indoor: true,
        coordinate: {
            latitude: 53.5500,
            longitude: 9.9350,
        },
        date: new Date(),
    },
    {
        id: '9',
        title: 'Open Air Kino',
        category: 'kino',
        time: '21:30',
        price: '10€',
        indoor: false,
        coordinate: {
            latitude: 53.5650,
            longitude: 9.9500,
        },
        date: new Date(),
    },
    {
        id: '10',
        title: 'Indie Konzert @ Uebel & Gefährlich',
        category: 'konzert',
        time: '20:00',
        price: '18€',
        indoor: true,
        coordinate: {
            latitude: 53.5510,
            longitude: 9.9640,
        },
        date: new Date(),
    },
    {
        id: '11',
        title: 'Cocktail Masterclass',
        category: 'cocktails',
        time: '19:00',
        price: '45€',
        indoor: true,
        coordinate: {
            latitude: 53.5570,
            longitude: 9.9555,
        },
        date: new Date(),
    },
    {
        id: '12',
        title: 'Street Food Market',
        category: 'streetfood',
        time: '12:00',
        price: 'Kostenlos',
        indoor: false,
        coordinate: {
            latitude: 53.5480,
            longitude: 9.9780,
        },
        date: new Date(),
    },
    {
        id: '13',
        title: 'Darts Tournament',
        category: 'darts',
        time: '18:00',
        price: '8€',
        indoor: true,
        coordinate: {
            latitude: 53.5555,
            longitude: 9.9620,
        },
        date: new Date(),
    },
    {
        id: '14',
        title: 'Sunday Brunch @ Café Paris',
        category: 'brunch',
        time: '10:00',
        price: '28€',
        indoor: true,
        coordinate: {
            latitude: 53.5505,
            longitude: 9.9920,
        },
        date: new Date(Date.now() + 86400000), // Tomorrow
    },
    {
        id: '15',
        title: 'Vernissage: Urban Art',
        category: 'kunst',
        time: '19:00',
        price: 'Kostenlos',
        indoor: true,
        coordinate: {
            latitude: 53.5590,
            longitude: 9.9480,
        },
        date: new Date(Date.now() + 86400000), // Tomorrow
    },
    {
        id: '16',
        title: 'Speed Dating Eppendorf',
        category: 'dating',
        time: '20:00',
        price: '15€',
        indoor: true,
        coordinate: {
            latitude: 53.5850,
            longitude: 9.9720,
        },
        date: new Date(Date.now() + 172800000), // Day after tomorrow
    },
    {
        id: '17',
        title: 'Flohmarkt Schanzenviertel',
        category: 'markt',
        time: '10:00',
        price: 'Kostenlos',
        indoor: false,
        coordinate: {
            latitude: 53.5620,
            longitude: 9.9610,
        },
        date: new Date(Date.now() + 432000000), // Weekend
    },
    {
        id: '18',
        title: 'All Night Party @ PAL',
        category: 'party',
        time: '23:00',
        price: '15€',
        indoor: true,
        coordinate: {
            latitude: 53.5465,
            longitude: 9.9690,
        },
        date: new Date(Date.now() + 432000000), // Weekend
    },
];

// ============================================================================
// Default Map Settings - Hamburg Zentrum
// ============================================================================

export const DEFAULT_MAP_REGION = {
    latitude: 53.5511,
    longitude: 9.9937,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return MOCK_EVENTS.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today && eventDate < tomorrow;
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
