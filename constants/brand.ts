/**
 * Brand Configuration
 * 
 * Zentrale Design-Tokens für das Event-Map Projekt.
 * Farbpalette: Rust Red & Rose Dust
 */

// ============================================================================
// Brand Colors - Rust Red & Rose Dust Palette
// ============================================================================

export const BrandColors = {
    // Primary Colors - Rust Red
    primary: '#B73B00',         // Main brand color
    primaryLight: '#D45A20',    // Lighter variant
    primaryDark: '#8A2C00',     // Darker variant
    primaryMuted: '#C95A30',    // Muted version for subtle uses

    // Secondary Colors - Rose Dust
    secondary: '#D4CAC7',       // Main secondary
    secondaryLight: '#E8E2E0',  // Lighter variant
    secondaryDark: '#B8ABA7',   // Darker variant

    // Accent - Use primary for consistency
    accent: '#B73B00',          // Same as primary for unified look
    accentLight: '#D45A20',
    accentDark: '#8A2C00',

    // Agent/AI Gradient - Warm rust tones
    agentGradient: ['#B73B00', '#D45A20'] as const,

    // Neutral Colors
    white: '#FFFFFF',
    black: '#1A1A1A',

    // Warm Gray Scale (tinted towards Rose Dust)
    gray: {
        50: '#FAF9F9',    // Very light, warm white
        100: '#F5F3F2',   // Light warm gray
        200: '#E8E4E3',   // Rose Dust light
        300: '#D4CAC7',   // Rose Dust (secondary)
        400: '#B8ABA7',   // Medium warm gray
        500: '#9A8F8B',   // Mid gray
        600: '#7A706C',   // Darker gray
        700: '#5A524F',   // Dark gray
        800: '#3A3533',   // Very dark
        900: '#1A1817',   // Almost black
    },
} as const;

// ============================================================================
// Theme Colors (Light & Dark Mode)
// ============================================================================

export const ThemeColors = {
    light: {
        text: '#1A1817',                    // Warm black
        textSecondary: '#7A706C',           // Muted gray
        textMuted: '#9A8F8B',               // Even more muted
        background: '#FFFFFF',
        backgroundSecondary: '#FAF9F9',     // Warm white
        backgroundTertiary: '#F5F3F2',      // Slightly darker
        card: '#FFFFFF',
        cardHighlight: '#FAF9F9',
        border: '#E8E4E3',
        divider: 'rgba(26,24,23,0.1)',
        overlay: 'rgba(26,24,23,0.5)',
        overlayLight: 'rgba(26,24,23,0.3)',
        surface: '#FFFFFF',
        surfaceBlur: 'rgba(255,255,255,0.95)',
        surfaceBlurLight: 'rgba(255,255,255,0.8)',
        surfaceBlurStrong: 'rgba(255,255,255,0.9)',
        success: '#4A9B5C',                 // Warm green
        error: '#C44536',                   // Warm red
        warning: '#D4A030',                 // Warm yellow
        tabIconDefault: '#B8ABA7',          // Rose Dust dark
        tabIconSelected: '#B73B00',         // Rust Red
        primary: '#B73B00',
    },
    dark: {
        text: '#FAF9F9',
        textSecondary: '#B8ABA7',
        textMuted: '#9A8F8B',
        background: '#1A1817',
        backgroundSecondary: '#2A2625',
        backgroundTertiary: '#3A3533',
        card: '#2A2625',
        cardHighlight: '#3A3533',
        border: '#4A4543',
        divider: 'rgba(250,249,249,0.1)',
        overlay: 'rgba(0,0,0,0.7)',
        overlayLight: 'rgba(0,0,0,0.5)',
        surface: '#2A2625',
        surfaceBlur: 'rgba(42,38,37,0.95)',
        surfaceBlurLight: 'rgba(42,38,37,0.8)',
        surfaceBlurStrong: 'rgba(42,38,37,0.9)',
        success: '#5AAE6C',
        error: '#E05545',
        warning: '#E4B040',
        tabIconDefault: '#7A706C',
        tabIconSelected: '#D45A20',
        primary: '#D45A20',
    },
} as const;

// ============================================================================
// Spacing
// ============================================================================

export const Spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
} as const;

// ============================================================================
// Border Radius
// ============================================================================

export const BorderRadius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    full: 9999,
    pill: 30,
    chip: 20,
    card: 16,
    modal: 24,
    button: 30,
} as const;

// ============================================================================
// Typography
// ============================================================================

export const Typography = {
    // Font Sizes
    fontSize: {
        xs: 11,
        sm: 12,
        md: 13,
        base: 14,
        lg: 16,
        xl: 18,
        xxl: 22,
        xxxl: 24,
        title: 28,
    },

    // Font Weights
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
        extrabold: '800' as const,
    },

    // Line Heights
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
} as const;

// ============================================================================
// Shadows
// ============================================================================

export const Shadows = {
    none: {
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    sm: {
        shadowColor: '#1A1817',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#1A1817',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    lg: {
        shadowColor: '#1A1817',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    xl: {
        shadowColor: '#1A1817',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    colored: (color: string) => ({
        shadowColor: color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    }),
} as const;

// ============================================================================
// Animation Durations
// ============================================================================

export const Animations = {
    fast: 150,
    normal: 250,
    slow: 350,
    verySlow: 500,
} as const;

// ============================================================================
// Component Specific Tokens
// ============================================================================

export const ComponentTokens = {
    // Chips
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: BorderRadius.chip,
        backgroundColor: BrandColors.gray[100],
        activeBackgroundColor: BrandColors.primary,
        fontSize: Typography.fontSize.base,
        fontWeight: Typography.fontWeight.semibold,
    },

    // Cards
    card: {
        padding: Spacing.lg,
        borderRadius: BorderRadius.card,
        backgroundColor: BrandColors.white,
        ...Shadows.md,
    },

    // Buttons
    button: {
        primary: {
            backgroundColor: BrandColors.primary,
            textColor: BrandColors.white,
            paddingVertical: Spacing.lg,
            borderRadius: BorderRadius.button,
        },
        secondary: {
            backgroundColor: BrandColors.gray[100],
            textColor: ThemeColors.light.text,
            paddingVertical: Spacing.lg,
            borderRadius: BorderRadius.lg,
        },
        dark: {
            backgroundColor: ThemeColors.light.text,
            textColor: BrandColors.white,
            paddingVertical: Spacing.lg,
            borderRadius: BorderRadius.lg,
        },
    },

    // Modal
    modal: {
        borderRadius: BorderRadius.modal,
        handleWidth: 40,
        handleHeight: 4,
        handleColor: BrandColors.gray[300],
    },

    // Pill (Location, etc.)
    pill: {
        paddingHorizontal: Spacing.lg,
        paddingVertical: 10,
        borderRadius: BorderRadius.pill,
    },

    // Action Bar
    actionBar: {
        padding: 6,
        borderRadius: BorderRadius.pill,
        maxWidth: 300,
    },

    // Step Indicator
    stepIndicator: {
        dotSize: 10,
        activeScale: 1.2,
        lineHeight: 2,
    },

    // Map Markers
    marker: {
        indoor: BrandColors.primary,
        outdoor: BrandColors.primaryLight,
    },
} as const;

// ============================================================================
// Export combined theme for convenience
// ============================================================================

export const Brand = {
    colors: BrandColors,
    theme: ThemeColors,
    spacing: Spacing,
    radius: BorderRadius,
    typography: Typography,
    shadows: Shadows,
    animations: Animations,
    components: ComponentTokens,
} as const;

export default Brand;
