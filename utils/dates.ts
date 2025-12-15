/**
 * Date Utilities
 * 
 * Hilfsfunktionen für Datums-Operationen.
 */

// ============================================================================
// Date Creation Helpers
// ============================================================================

/**
 * Erstellt ein Datum relativ zum heutigen Tag.
 * @param days - Anzahl der Tage in der Zukunft
 * @param hours - Stunde des Tages (0-23)
 * @param minutes - Minuten (optional, Standard: 0)
 */
export function getRelativeDate(days: number, hours: number, minutes: number = 0): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(hours, minutes, 0, 0);
    return date;
}

/**
 * Gibt das heutige Datum um Mitternacht zurück.
 */
export function getToday(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

/**
 * Gibt das morgige Datum um Mitternacht zurück.
 */
export function getTomorrow(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
}

/**
 * Gibt das übermorgen Datum um Mitternacht zurück.
 */
export function getDayAfterTomorrow(): Date {
    const day = new Date();
    day.setDate(day.getDate() + 2);
    day.setHours(0, 0, 0, 0);
    return day;
}

/**
 * Gibt den nächsten Freitag um Mitternacht zurück.
 */
export function getNextFriday(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay();
    // Friday is 5, calculate days until next Friday
    const daysUntilFriday = dayOfWeek === 5 ? 0 : (5 - dayOfWeek + 7) % 7;
    const friday = new Date(today);
    friday.setDate(today.getDate() + daysUntilFriday);
    return friday;
}

/**
 * Gibt den nächsten Samstag um Mitternacht zurück.
 */
export function getNextSaturday(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay();
    // Saturday is 6
    const daysUntilSaturday = dayOfWeek === 6 ? 0 : (6 - dayOfWeek + 7) % 7;
    const saturday = new Date(today);
    saturday.setDate(today.getDate() + daysUntilSaturday);
    return saturday;
}

/**
 * Gibt den nächsten Sonntag um Mitternacht zurück.
 */
export function getNextSunday(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayOfWeek = today.getDay();
    // Sunday is 0
    const daysUntilSunday = dayOfWeek === 0 ? 0 : (7 - dayOfWeek) % 7;
    const sunday = new Date(today);
    sunday.setDate(today.getDate() + daysUntilSunday);
    return sunday;
}

/**
 * Gibt den Montag nach dem nächsten Wochenende zurück.
 */
export function getMondayAfterWeekend(): Date {
    const saturday = getNextSaturday();
    const monday = new Date(saturday);
    monday.setDate(saturday.getDate() + 2);
    return monday;
}

// ============================================================================
// Date Comparison Helpers
// ============================================================================

/**
 * Prüft ob ein Datum heute ist.
 */
export function isToday(date: Date): boolean {
    const today = getToday();
    const tomorrow = getTomorrow();
    return date >= today && date < tomorrow;
}

/**
 * Prüft ob ein Datum morgen ist.
 */
export function isTomorrow(date: Date): boolean {
    const tomorrow = getTomorrow();
    const dayAfter = getDayAfterTomorrow();
    return date >= tomorrow && date < dayAfter;
}

/**
 * Prüft ob ein Datum am Wochenende ist.
 */
export function isWeekend(date: Date): boolean {
    const saturday = getNextSaturday();
    const monday = getMondayAfterWeekend();
    return date >= saturday && date < monday;
}

/**
 * Prüft ob ein Datum in einem bestimmten Zeitraum liegt.
 */
export function isInDateRange(date: Date, from: Date | null, to: Date | null): boolean {
    if (from) {
        const fromDate = new Date(from);
        fromDate.setHours(0, 0, 0, 0);
        if (date < fromDate) return false;
    }
    if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999);
        if (date > toDate) return false;
    }
    return true;
}

// ============================================================================
// Time of Day Helpers
// ============================================================================

import { TimeOfDay } from '../types';

/**
 * Gibt die Tageszeit für eine bestimmte Stunde zurück.
 */
export function getTimeOfDay(hour: number): TimeOfDay {
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'night'; // 22:00 - 06:00
}

/**
 * Prüft ob eine Stunde zu einer bestimmten Tageszeit gehört.
 */
export function matchesTimeOfDay(hour: number, timeOfDay: TimeOfDay): boolean {
    if (timeOfDay === 'morning') return hour >= 6 && hour < 12;
    if (timeOfDay === 'afternoon') return hour >= 12 && hour < 18;
    if (timeOfDay === 'evening') return hour >= 18 && hour < 22;
    if (timeOfDay === 'night') return hour >= 22 || hour < 6;
    return false;
}

/**
 * Prüft ob eine Stunde zu mindestens einer der angegebenen Tageszeiten gehört.
 */
export function matchesAnyTimeOfDay(hour: number, timesOfDay: TimeOfDay[]): boolean {
    if (timesOfDay.length === 0) return true; // Falls keine Tageszeit ausgewählt, alle anzeigen
    return timesOfDay.some(time => matchesTimeOfDay(hour, time));
}

// ============================================================================
// Formatting Helpers
// ============================================================================

/**
 * Formatiert ein Datum im deutschen Format (DD.MM.)
 */
export function formatDateShort(date: Date): string {
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit'
    });
}

/**
 * Formatiert ein Datum im deutschen Format (DD.MM.YYYY)
 */
export function formatDateFull(date: Date): string {
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Gibt den deutschen Namen für einen Wochentag zurück.
 */
export function getWeekdayName(date: Date): string {
    return date.toLocaleDateString('de-DE', { weekday: 'long' });
}

/**
 * Erstellt ein Label für schnelle Datumsauswahl.
 */
export function getDayLabel(option: 'today' | 'tomorrow' | 'dayAfterTomorrow'): string {
    const today = getToday();
    const tomorrow = getTomorrow();
    const dayAfterTomorrow = getDayAfterTomorrow();

    if (option === 'today') {
        return `Heute (${formatDateShort(today)})`;
    }
    if (option === 'tomorrow') {
        return `Morgen (${formatDateShort(tomorrow)})`;
    }
    return `Übermorgen (${formatDateShort(dayAfterTomorrow)})`;
}
