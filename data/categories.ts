/**
 * Categories & Filter Options
 * 
 * Zentrale Definitionen für Event-Kategorien und Filter-Optionen.
 * Fokus auf Aktivitäten und Ausgeh-Events.
 */

import { Category, TimeSlot, WhenFilter, IndoorFilter, TimeOfDay } from '../types';

// ============================================================================
// Event Categories - Activity-focused
// ============================================================================

export const CATEGORIES: Category[] = [
    // Nightlife & Party
    { id: 'party', label: 'Party', emoji: '�', displayLabel: '� Party' },
    { id: 'club', label: 'Club', emoji: '🪩', displayLabel: '🪩 Club' },
    { id: 'konzert', label: 'Konzert', emoji: '�', displayLabel: '� Konzert' },
    { id: 'livemusik', label: 'Live Musik', emoji: '🎤', displayLabel: '🎤 Live Musik' },
    { id: 'dj', label: 'DJ Set', emoji: '🎧', displayLabel: '🎧 DJ Set' },

    // Drinks & Bars
    { id: 'bar', label: 'Bar', emoji: '🍹', displayLabel: '🍹 Bar' },
    { id: 'cocktails', label: 'Cocktails', emoji: '🍸', displayLabel: '🍸 Cocktails' },
    { id: 'bier', label: 'Bier', emoji: '🍺', displayLabel: '🍺 Bier' },
    { id: 'wein', label: 'Wein', emoji: '�', displayLabel: '� Wein' },
    { id: 'craft', label: 'Craft Beer', emoji: '�', displayLabel: '� Craft Beer' },

    // Food & Dining
    { id: 'restaurant', label: 'Restaurant', emoji: '🍽️', displayLabel: '🍽️ Restaurant' },
    { id: 'cafe', label: 'Café', emoji: '☕', displayLabel: '☕ Café' },
    { id: 'brunch', label: 'Brunch', emoji: '🥐', displayLabel: '🥐 Brunch' },
    { id: 'streetfood', label: 'Street Food', emoji: '🌮', displayLabel: '🌮 Street Food' },

    // Entertainment & Culture
    { id: 'comedy', label: 'Comedy', emoji: '😂', displayLabel: '😂 Comedy' },
    { id: 'quiz', label: 'Quiz Night', emoji: '🧠', displayLabel: '🧠 Quiz Night' },
    { id: 'karaoke', label: 'Karaoke', emoji: '�️', displayLabel: '�️ Karaoke' },
    { id: 'show', label: 'Show', emoji: '🎭', displayLabel: '🎭 Show' },
    { id: 'theater', label: 'Theater', emoji: '🎪', displayLabel: '🎪 Theater' },
    { id: 'kino', label: 'Kino', emoji: '🎬', displayLabel: '🎬 Kino' },

    // Sports & Activities
    { id: 'sport', label: 'Sport Event', emoji: '⚽', displayLabel: '⚽ Sport Event' },
    { id: 'games', label: 'Games', emoji: '�', displayLabel: '� Games' },
    { id: 'darts', label: 'Darts', emoji: '🎯', displayLabel: '🎯 Darts' },
    { id: 'billard', label: 'Billard', emoji: '🎱', displayLabel: '🎱 Billard' },

    // Art & Culture
    { id: 'kunst', label: 'Kunst', emoji: '�', displayLabel: '� Kunst' },
    { id: 'ausstellung', label: 'Ausstellung', emoji: '🖼️', displayLabel: '🖼️ Ausstellung' },
    { id: 'lesung', label: 'Lesung', emoji: '📚', displayLabel: '📚 Lesung' },

    // Special Events
    { id: 'festival', label: 'Festival', emoji: '🎪', displayLabel: '🎪 Festival' },
    { id: 'markt', label: 'Markt', emoji: '🛍️', displayLabel: '🛍️ Markt' },
    { id: 'openair', label: 'Open Air', emoji: '�', displayLabel: '� Open Air' },
    { id: 'rooftop', label: 'Rooftop', emoji: '🌆', displayLabel: '🌆 Rooftop' },

    // Social
    { id: 'dating', label: 'Dating Event', emoji: '💕', displayLabel: '💕 Dating' },
    { id: 'networking', label: 'Networking', emoji: '🤝', displayLabel: '🤝 Networking' },
    { id: 'workshop', label: 'Workshop', emoji: '🛠️', displayLabel: '🛠️ Workshop' },
];

// ============================================================================
// Popular/Featured Categories (Quick Access)
// ============================================================================

export const POPULAR_CATEGORIES: string[] = [
    'party',
    'konzert',
    'bar',
    'cocktails',
    'bier',
    'cafe',
    'restaurant',
    'quiz',
    'comedy',
    'livemusik',
];

// Get popular categories as full objects
export const getPopularCategories = (): Category[] => {
    return POPULAR_CATEGORIES
        .map(id => CATEGORIES.find(cat => cat.id === id))
        .filter((cat): cat is Category => cat !== undefined);
};

// ============================================================================
// Time Slots
// ============================================================================

export const TIME_SLOTS: TimeSlot[] = [
    { id: 'morning', label: 'Morgens', time: '6-12 Uhr', emoji: '🌅' },
    { id: 'afternoon', label: 'Mittags', time: '12-18 Uhr', emoji: '☀️' },
    { id: 'evening', label: 'Abends', time: '18-22 Uhr', emoji: '🌆' },
    { id: 'night', label: 'Nachts', time: '22-6 Uhr', emoji: '🌙' },
];

// ============================================================================
// Indoor/Outdoor Options
// ============================================================================

export const INDOOR_OPTIONS: { id: IndoorFilter; label: string; emoji: string }[] = [
    { id: 'any', label: 'Egal', emoji: '🌍' },
    { id: 'indoor', label: 'Drinnen', emoji: '🏠' },
    { id: 'outdoor', label: 'Draußen', emoji: '🌳' },
];

// ============================================================================
// Day Presets (Quick Filters)
// ============================================================================

export const DAY_PRESETS = {
    // Hauptauswahl: Heute, Morgen, Fr, Sa, So (ohne Egal - togglebar)
    main: [
        { id: 'today' as WhenFilter, label: 'Heute' },
        { id: 'tomorrow' as WhenFilter, label: 'Morgen' },
        { id: 'friday' as WhenFilter, label: 'Fr' },
        { id: 'saturday' as WhenFilter, label: 'Sa' },
        { id: 'sunday' as WhenFilter, label: 'So' },
    ],
    // Legacy support (für Kompatibilität)
    firstRow: [
        { id: 'any' as WhenFilter, label: 'Egal' },
        { id: 'today' as WhenFilter, label: 'Heute' },
        { id: 'tomorrow' as WhenFilter, label: 'Morgen' },

    ],
    secondRow: [
        { id: 'friday' as WhenFilter, label: 'Fr' },
        { id: 'saturday' as WhenFilter, label: 'Sa' },
        { id: 'sunday' as WhenFilter, label: 'So' },

    ],
};

// ============================================================================
// Category Groups (for organized display)
// ============================================================================

export const CATEGORY_GROUPS = {
    nightlife: {
        title: 'Nightlife & Party',
        emoji: '🎉',
        color: '#1E3A5F',  // Dark Blue
        ids: ['party', 'club', 'konzert', 'livemusik', 'dj'],
    },
    drinks: {
        title: 'Drinks & Bars',
        emoji: '🍹',
        color: '#9B2335',  // Wine Red / Burgundy
        ids: ['bar', 'cocktails', 'bier', 'wein', 'craft'],
    },
    food: {
        title: 'Food & Dining',
        emoji: '🍽️',
        color: '#D4763B',  // Warm Orange
        ids: ['restaurant', 'cafe', 'brunch', 'streetfood'],
    },
    entertainment: {
        title: 'Entertainment',
        emoji: '🎭',
        color: '#7B3F8F',  // Purple
        ids: ['comedy', 'quiz', 'karaoke', 'show', 'theater', 'kino'],
    },
    activities: {
        title: 'Aktivitäten',
        emoji: '🎮',
        color: '#2D8C5A',  // Green
        ids: ['sport', 'games', 'darts', 'billard'],
    },
    culture: {
        title: 'Kunst & Kultur',
        emoji: '🎨',
        color: '#C76B98',  // Pink / Rose
        ids: ['kunst', 'ausstellung', 'lesung'],
    },
    special: {
        title: 'Special Events',
        emoji: '🌟',
        color: '#D4A030',  // Gold
        ids: ['festival', 'markt', 'openair', 'rooftop'],
    },
    social: {
        title: 'Social',
        emoji: '🤝',
        color: '#3498DB',  // Light Blue
        ids: ['dating', 'networking', 'workshop'],
    },
};

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get category by ID
 */
export const getCategoryById = (id: string): Category | undefined => {
    return CATEGORIES.find(cat => cat.id === id);
};

/**
 * Get categories by IDs
 */
export const getCategoriesByIds = (ids: string[]): Category[] => {
    return ids
        .map(id => getCategoryById(id))
        .filter((cat): cat is Category => cat !== undefined);
};

/**
 * Get category display label by ID
 */
export const getCategoryLabel = (id: string): string => {
    const category = getCategoryById(id);
    return category?.displayLabel || id;
};

/**
 * Get category emoji by ID
 */
export const getCategoryEmoji = (id: string): string => {
    const category = getCategoryById(id);
    return category?.emoji || '📍';
};

/**
 * Get time slot by ID
 */
export const getTimeSlotById = (id: TimeOfDay): TimeSlot | undefined => {
    return TIME_SLOTS.find(slot => slot.id === id);
};

/**
 * Get time slot label by ID
 */
export const getTimeSlotLabel = (id: TimeOfDay): string => {
    const slot = getTimeSlotById(id);
    return slot?.label || id;
};

/**
 * Get categories by group
 */
export const getCategoriesByGroup = (groupKey: keyof typeof CATEGORY_GROUPS): Category[] => {
    const group = CATEGORY_GROUPS[groupKey];
    return getCategoriesByIds(group.ids);
};

/**
 * Get category group by category ID
 */
export const getCategoryGroup = (categoryId: string): keyof typeof CATEGORY_GROUPS | null => {
    for (const [key, group] of Object.entries(CATEGORY_GROUPS)) {
        if (group.ids.includes(categoryId)) {
            return key as keyof typeof CATEGORY_GROUPS;
        }
    }
    return null;
};

/**
 * Get category color by category ID
 * Returns the group color for the category
 */
export const getCategoryColor = (categoryId: string): string => {
    const groupKey = getCategoryGroup(categoryId);
    if (groupKey) {
        return CATEGORY_GROUPS[groupKey].color;
    }
    // Default color (Rust Red from brand)
    return '#B73B00';
};

/**
 * Get group color by group key
 */
export const getGroupColor = (groupKey: keyof typeof CATEGORY_GROUPS): string => {
    return CATEGORY_GROUPS[groupKey].color;
};
