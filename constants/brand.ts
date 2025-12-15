/**
 * Brand Configuration
 * 
 * Zentrale Design-Tokens für das Event-Map Projekt.
 * Hier werden alle Brand-Farben, Spacing, Typography und
 * andere Design-Variablen definiert.
 */

// ============================================================================
// Brand Colors
// ============================================================================

export const BrandColors = {
    // Primary Colors
    primary: '#6C63FF',      // Vibrant Purple/Blue
    primaryLight: '#A5B4FC',
    primaryDark: '#4338CA',

    // Secondary Colors  
    secondary: '#FF6584',    // Soft Red/Pink
    secondaryLight: '#F472B6',
    secondaryDark: '#DB2777',

    // Accent Colors
    accent: '#34D399',       // Green for success/apply buttons
    accentLight: '#6EE7B7',
    accentDark: '#059669',

    // Agent/AI Gradient
    agentGradient: ['#6C63FF', '#8B5CF6'] as const,

    // Neutral Colors
    white: '#FFFFFF',
    black: '#000000',

    // Gray Scale
    gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
    },
} as const;

// ============================================================================
// Theme Colors (Light & Dark Mode)
// ============================================================================

export const ThemeColors = {
    light: {
        text: '#1A1A1A',
        textSecondary: '#6B7280',
        background: '#FFFFFF',
        backgroundSecondary: '#F9FAFB',
        card: '#FFFFFF',
        cardHighlight: '#F8F9FA',
        border: '#E5E7EB',
        divider: 'rgba(0,0,0,0.1)',
        overlay: 'rgba(0,0,0,0.5)',
        overlayLight: 'rgba(0,0,0,0.3)',
        surface: '#FFFFFF',
        surfaceBlur: 'rgba(255,255,255,0.9)',
        surfaceBlurLight: 'rgba(255,255,255,0.7)',
        surfaceBlurStrong: 'rgba(255,255,255,0.8)',
        success: '#34C759',
        error: '#FF3B30',
        warning: '#FFCC00',
        tabIconDefault: '#CCCCCC',
        tabIconSelected: '#2F95DC',
    },
    dark: {
        text: '#FFFFFF',
        textSecondary: '#9CA3AF',
        background: '#0F172A',
        backgroundSecondary: '#1E293B',
        card: '#1E293B',
        cardHighlight: '#334155',
        border: '#334155',
        divider: 'rgba(255,255,255,0.1)',
        overlay: 'rgba(0,0,0,0.7)',
        overlayLight: 'rgba(0,0,0,0.5)',
        surface: '#1E293B',
        surfaceBlur: 'rgba(30,41,59,0.9)',
        surfaceBlurLight: 'rgba(30,41,59,0.7)',
        surfaceBlurStrong: 'rgba(30,41,59,0.8)',
        success: '#4ADE80',
        error: '#F87171',
        warning: '#FBBF24',
        tabIconDefault: '#6B7280',
        tabIconSelected: '#FFFFFF',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    xl: {
        shadowColor: '#000',
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
        backgroundColor: BrandColors.gray[50],
        activeBackgroundColor: BrandColors.accent,
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
            backgroundColor: BrandColors.accent,
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
        handleColor: BrandColors.gray[200],
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
