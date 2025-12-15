/**
 * Type Definitions
 * 
 * Zentrale Type-Definitionen für das Event-Map Projekt.
 */

// ============================================================================
// Event Types
// ============================================================================

export interface Coordinate {
    latitude: number;
    longitude: number;
}

export interface Event {
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

// ============================================================================
// Filter Types
// ============================================================================

export type WhenFilter =
    | 'any'
    | 'today'
    | 'tomorrow'
    | 'dayAfterTomorrow'
    | 'weekend'
    | 'custom';

export type IndoorFilter = 'any' | 'indoor' | 'outdoor';

export type TimeOfDay = 'morning' | 'afternoon' | 'evening';

export interface ActiveFilters {
    when: WhenFilter;
    indoor: IndoorFilter;
    categories: string[];
    dateFrom: Date | null;
    dateTo: Date | null;
    timeOfDay: TimeOfDay[];
}

export const DEFAULT_FILTERS: ActiveFilters = {
    when: 'any',
    indoor: 'any',
    categories: [],
    dateFrom: null,
    dateTo: null,
    timeOfDay: [],
};

// ============================================================================
// Category Types
// ============================================================================

export interface Category {
    id: string;
    label: string;
    emoji: string;
    displayLabel: string; // Full label with emoji
}

// ============================================================================
// Time Slot Types
// ============================================================================

export interface TimeSlot {
    id: TimeOfDay;
    label: string;
    time: string;
}

// ============================================================================
// Step Types (for multi-step wizards)
// ============================================================================

export type FilterStep = 'when' | 'where' | 'what';

// ============================================================================
// View Types
// ============================================================================

export type ViewMode = 'map' | 'list';

// ============================================================================
// Component Props Types
// ============================================================================

export interface ChipProps {
    label: string;
    active?: boolean;
    onPress?: () => void;
    style?: object;
    textStyle?: object;
    icon?: React.ReactNode;
}

export interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    fullWidth?: boolean;
    style?: object;
}
