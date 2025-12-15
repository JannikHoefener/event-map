/**
 * Categories Data
 * 
 * Zentrale Definition aller Event-Kategorien.
 */

import { Category, TimeSlot } from '../types';

// ============================================================================
// Event Categories
// ============================================================================

export const CATEGORIES: Category[] = [
    { id: 'musik', label: 'Musik', emoji: '🎵', displayLabel: '🎵 Musik' },
    { id: 'café', label: 'Café', emoji: '☕', displayLabel: '☕ Café' },
    { id: 'desserts', label: 'Desserts', emoji: '🍰', displayLabel: '🍰 Desserts' },
    { id: 'drinks', label: 'Drinks', emoji: '🥤', displayLabel: '🥤 Drinks' },
    { id: 'grill_bbq', label: 'Grill & BBQ', emoji: '🔥', displayLabel: '🔥 Grill & BBQ' },
    { id: 'pizza', label: 'Pizza', emoji: '🍕', displayLabel: '🍕 Pizza' },
    { id: 'frühstück', label: 'Frühstück', emoji: '🍳', displayLabel: '🍳 Frühstück' },
    { id: 'vegan', label: 'Vegan', emoji: '🥗', displayLabel: '🥗 Vegan' },
    { id: 'burger', label: 'Burger', emoji: '🍔', displayLabel: '🍔 Burger' },
    { id: 'italienisch', label: 'Italienisch', emoji: '🇮🇹', displayLabel: '🇮🇹 Italienisch' },
    { id: 'pasta', label: 'Pasta', emoji: '🍝', displayLabel: '🍝 Pasta' },
    { id: 'bowls', label: 'Bowls', emoji: '🥣', displayLabel: '🥣 Bowls' },
    { id: 'healthy', label: 'Healthy', emoji: '🥗', displayLabel: '🥗 Healthy' },
    { id: 'asiatisch', label: 'Asiatisch', emoji: '🍜', displayLabel: '🍜 Asiatisch' },
    { id: 'fast_food', label: 'Fast Food', emoji: '🍟', displayLabel: '🍟 Fast Food' },
    { id: 'seafood', label: 'Seafood', emoji: '🦞', displayLabel: '🦞 Seafood' },
    { id: 'sushi', label: 'Sushi', emoji: '🍣', displayLabel: '🍣 Sushi' },
    { id: 'deutsch', label: 'Deutsch', emoji: '🥨', displayLabel: '🥨 Deutsch' },
    { id: 'kunst', label: 'Kunst', emoji: '🎨', displayLabel: '🎨 Kunst' },
    { id: 'party', label: 'Party', emoji: '🎉', displayLabel: '🎉 Party' },
];

// ============================================================================
// Time Slots
// ============================================================================

export const TIME_SLOTS: TimeSlot[] = [
    { id: 'morning', label: '🌅 Morgens', time: '06:00-12:00' },
    { id: 'afternoon', label: '☀️ Mittags', time: '12:00-18:00' },
    { id: 'evening', label: '🌙 Abends', time: '18:00-00:00' },
];

// ============================================================================
// Indoor/Outdoor Options
// ============================================================================

export const INDOOR_OPTIONS = [
    { id: 'indoor', label: 'Drinnen' },
    { id: 'outdoor', label: 'Draußen' },
    { id: 'any', label: 'Egal' },
] as const;

// ============================================================================
// Day Presets
// ============================================================================

export const DAY_PRESETS = {
    firstRow: [
        { id: 'today', label: 'Heute' },
        { id: 'tomorrow', label: 'Morgen' },
        { id: 'dayAfterTomorrow', label: 'Übermorgen' },
    ],
    secondRow: [
        { id: 'weekend', label: 'Wochenende' },
        { id: 'any', label: 'Egal' },
    ],
} as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Findet eine Kategorie anhand ihrer ID.
 */
export function getCategoryById(id: string): Category | undefined {
    return CATEGORIES.find(cat => cat.id === id);
}

/**
 * Gibt alle Kategorie-Labels zurück (für Anzeigezwecke).
 */
export function getCategoryDisplayLabels(): string[] {
    return CATEGORIES.map(cat => cat.displayLabel);
}

/**
 * Konvertiert einen Display-Label zurück zur Kategorie-ID.
 */
export function getCategoryIdFromDisplayLabel(displayLabel: string): string {
    const label = displayLabel.split(' ').slice(1).join(' ');
    return label.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_');
}

/**
 * Findet einen TimeSlot anhand seiner ID.
 */
export function getTimeSlotById(id: string): TimeSlot | undefined {
    return TIME_SLOTS.find(slot => slot.id === id);
}
