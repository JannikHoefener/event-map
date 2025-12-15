/**
 * Filter Utilities
 * 
 * Funktionen zum Filtern von Events basierend auf verschiedenen Kriterien.
 */

import { Event, ActiveFilters, WhenFilter, TimeOfDay } from '../types';
import {
    getToday,
    getTomorrow,
    getDayAfterTomorrow,
    getNextFriday,
    getNextSaturday,
    getNextSunday,
    getMondayAfterWeekend,
    isInDateRange,
    matchesAnyTimeOfDay,
} from './dates';

// ============================================================================
// Main Filter Function
// ============================================================================

/**
 * Filtert Events basierend auf den aktiven Filtern.
 */
export function filterEvents(events: Event[], filters: ActiveFilters): Event[] {
    return events.filter(event => {
        // 1. Filter by Indoor/Outdoor
        if (!matchesIndoorFilter(event, filters.indoor)) {
            return false;
        }

        // 2. Filter by Date (When)
        if (!matchesWhenFilter(event.date, filters)) {
            return false;
        }

        // 3. Filter by Time of Day
        if (!matchesTimeOfDayFilter(event.date, filters.timeOfDay)) {
            return false;
        }

        // 4. Filter by Category
        if (!matchesCategoryFilter(event.category, filters.categories)) {
            return false;
        }

        return true;
    });
}

// ============================================================================
// Individual Filter Functions
// ============================================================================

/**
 * Prüft ob ein Event dem Indoor/Outdoor Filter entspricht.
 */
export function matchesIndoorFilter(
    event: Event,
    indoorFilter: 'any' | 'indoor' | 'outdoor'
): boolean {
    if (indoorFilter === 'any') return true;

    const isIndoor = indoorFilter === 'indoor';
    return event.indoor === isIndoor;
}

/**
 * Prüft ob ein Datum dem "Wann" Filter entspricht.
 */
export function matchesWhenFilter(
    eventDate: Date,
    filters: Pick<ActiveFilters, 'when' | 'dateFrom' | 'dateTo'>
): boolean {
    const { when, dateFrom, dateTo } = filters;

    if (when === 'any') return true;

    const today = getToday();
    const tomorrow = getTomorrow();
    const dayAfterTomorrow = getDayAfterTomorrow();

    switch (when) {
        case 'today':
            return eventDate >= today && eventDate < tomorrow;

        case 'tomorrow':
            return eventDate >= tomorrow && eventDate < dayAfterTomorrow;

        case 'friday': {
            const friday = getNextFriday();
            const nextDay = new Date(friday);
            nextDay.setDate(nextDay.getDate() + 1);
            return eventDate >= friday && eventDate < nextDay;
        }

        case 'saturday': {
            const saturday = getNextSaturday();
            const nextDay = new Date(saturday);
            nextDay.setDate(nextDay.getDate() + 1);
            return eventDate >= saturday && eventDate < nextDay;
        }

        case 'sunday': {
            const sunday = getNextSunday();
            const nextDay = new Date(sunday);
            nextDay.setDate(nextDay.getDate() + 1);
            return eventDate >= sunday && eventDate < nextDay;
        }

        case 'dayAfterTomorrow': {
            const nextDay = new Date(dayAfterTomorrow);
            nextDay.setDate(nextDay.getDate() + 1);
            return eventDate >= dayAfterTomorrow && eventDate < nextDay;
        }

        case 'weekend': {
            const saturday = getNextSaturday();
            const monday = getMondayAfterWeekend();
            return eventDate >= saturday && eventDate < monday;
        }

        case 'nextWeek': {
            const today = getToday();
            const nextWeekStart = new Date(today);
            nextWeekStart.setDate(today.getDate() + 7);
            const nextWeekEnd = new Date(nextWeekStart);
            nextWeekEnd.setDate(nextWeekStart.getDate() + 7);
            return eventDate >= nextWeekStart && eventDate < nextWeekEnd;
        }

        case 'custom':
            return isInDateRange(eventDate, dateFrom, dateTo);

        default:
            return true;
    }
}

/**
 * Prüft ob ein Datum dem Tageszeit-Filter entspricht.
 */
export function matchesTimeOfDayFilter(
    eventDate: Date,
    timeOfDay: TimeOfDay[] | undefined
): boolean {
    if (!timeOfDay || timeOfDay.length === 0) return true;

    const hour = eventDate.getHours();
    return matchesAnyTimeOfDay(hour, timeOfDay);
}

/**
 * Prüft ob eine Kategorie dem Kategorie-Filter entspricht.
 * Enthält spezielle Logik für verwandte Kategorien (z.B. music & party).
 */
export function matchesCategoryFilter(
    eventCategory: string,
    selectedCategories: string[]
): boolean {
    if (selectedCategories.length === 0) return true;

    const eventCat = eventCategory.toLowerCase();

    return selectedCategories.some(cat => {
        // Spezielle Zuordnungen für verwandte Kategorien
        if (cat === 'music' && (eventCat === 'music' || eventCat === 'party')) {
            return true;
        }
        if (cat === 'food' && eventCat === 'food') {
            return true;
        }
        if (cat === 'art' && eventCat === 'art') {
            return true;
        }

        // Exakter Match
        return eventCat === cat;
    });
}

// ============================================================================
// Filter State Helpers
// ============================================================================

/**
 * Prüft ob irgendein Filter aktiv ist.
 */
export function hasActiveFilters(filters: ActiveFilters): boolean {
    return (
        filters.when !== 'any' ||
        filters.indoor !== 'any' ||
        filters.categories.length > 0 ||
        filters.dateFrom !== null ||
        filters.dateTo !== null ||
        (filters.timeOfDay && filters.timeOfDay.length > 0)
    );
}

/**
 * Zählt die Anzahl der aktiven Filter.
 */
export function countActiveFilters(filters: ActiveFilters): number {
    let count = 0;

    if (filters.when !== 'any') count++;
    if (filters.indoor !== 'any') count++;
    if (filters.categories.length > 0) count++;
    if (filters.dateFrom !== null || filters.dateTo !== null) count++;
    if (filters.timeOfDay && filters.timeOfDay.length > 0) count++;

    return count;
}

/**
 * Erstellt ein leeres/zurückgesetztes Filter-Objekt.
 */
export function createEmptyFilters(): ActiveFilters {
    return {
        when: 'any',
        indoor: 'any',
        categories: [],
        dateFrom: null,
        dateTo: null,
        timeOfDay: [],
    };
}

// ============================================================================
// Category Toggle Helper
// ============================================================================

/**
 * Togglet eine Kategorie in der Kategorie-Liste.
 */
export function toggleCategory(
    categories: string[],
    categoryId: string
): string[] {
    if (categories.includes(categoryId)) {
        return categories.filter(c => c !== categoryId);
    }
    return [...categories, categoryId];
}

/**
 * Togglet eine Tageszeit in der Tageszeit-Liste.
 */
export function toggleTimeOfDay(
    timeOfDay: TimeOfDay[],
    slot: TimeOfDay
): TimeOfDay[] {
    if (timeOfDay.includes(slot)) {
        return timeOfDay.filter(t => t !== slot);
    }
    return [...timeOfDay, slot];
}
