/**
 * Mock Events Data
 * 
 * Beispieldaten für die Event-Map Anwendung.
 */

import { Event } from '../types';
import { getRelativeDate } from '../utils/dates';

// ============================================================================
// Mock Events
// ============================================================================

export const MOCK_EVENTS: Event[] = [
    {
        id: '1',
        title: 'Rooftop Jazz Night',
        coordinate: { latitude: 53.5511, longitude: 9.9937 },
        category: 'Music',
        price: '20€',
        time: 'Tonight, 20:00',
        date: getRelativeDate(0, 20), // Today 20:00
        indoor: true,
    },
    {
        id: '2',
        title: 'Street Food Market',
        coordinate: { latitude: 53.5561, longitude: 9.9837 },
        category: 'Food',
        price: 'Free',
        time: 'Tomorrow, 12:00',
        date: getRelativeDate(1, 12), // Tomorrow 12:00
        indoor: false,
    },
    {
        id: '3',
        title: 'Modern Art Gallery',
        coordinate: { latitude: 53.5461, longitude: 10.0037 },
        category: 'Art',
        price: '15€',
        time: 'Today, 14:00',
        date: getRelativeDate(0, 14), // Today 14:00
        indoor: true,
    },
    {
        id: '4',
        title: 'Techno Bunker',
        coordinate: { latitude: 53.5611, longitude: 9.9637 },
        category: 'Party',
        price: '10€',
        time: 'Tonight, 23:00',
        date: getRelativeDate(0, 23), // Today 23:00
        indoor: true,
    },
    {
        id: '5',
        title: 'Park Yoga',
        coordinate: { latitude: 53.5711, longitude: 10.0137 },
        category: 'Health',
        price: '5€',
        time: 'Tomorrow, 10:00',
        date: getRelativeDate(1, 10), // Tomorrow 10:00
        indoor: false,
    },
];

// ============================================================================
// Default Map Region (Hamburg)
// ============================================================================

export const DEFAULT_MAP_REGION = {
    latitude: 53.5511,
    longitude: 9.9937,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

// ============================================================================
// Default Location
// ============================================================================

export const DEFAULT_LOCATION = {
    name: 'Hamburg, DE',
    coordinate: {
        latitude: 53.5511,
        longitude: 9.9937,
    },
};
