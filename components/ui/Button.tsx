/**
 * Button Component
 * 
 * Wiederverwendbare Button-Komponente mit verschiedenen Varianten.
 */

import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    ActivityIndicator,
    View,
} from 'react-native';
import { Brand } from '../../constants/brand';

type ButtonVariant = 'primary' | 'secondary' | 'dark' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function Button({
    label,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    style,
    textStyle,
}: ButtonProps) {
    const isDisabled = disabled || loading;

    const buttonStyles: ViewStyle[] = [
        styles.button,
        styles[`button_${variant}`],
        styles[`button_${size}`],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
    ].filter(Boolean) as ViewStyle[];

    const textStyles: TextStyle[] = [
        styles.text,
        styles[`text_${variant}`],
        styles[`text_${size}`],
        isDisabled && styles.disabledText,
        textStyle,
    ].filter(Boolean) as TextStyle[];

    const renderContent = () => {
        if (loading) {
            return (
                <ActivityIndicator
                    size="small"
                    color={variant === 'primary' || variant === 'dark'
                        ? Brand.colors.white
                        : Brand.theme.light.text
                    }
                />
            );
        }

        return (
            <View style={styles.content}>
                {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
                <Text style={textStyles}>{label}</Text>
                {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
            </View>
        );
    };

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={isDisabled}
        >
            {renderContent()}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Brand.radius.lg,
    },
    fullWidth: {
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
    text: {
        fontWeight: Brand.typography.fontWeight.semibold,
    },
    disabled: {
        opacity: 0.5,
    },
    disabledText: {
        opacity: 0.7,
    },

    // Variants
    button_primary: {
        backgroundColor: Brand.colors.accent,
        ...Brand.shadows.colored(Brand.colors.accent),
    },
    button_secondary: {
        backgroundColor: Brand.colors.gray[100],
    },
    button_dark: {
        backgroundColor: Brand.theme.light.text,
    },
    button_ghost: {
        backgroundColor: 'transparent',
    },
    button_outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Brand.colors.gray[200],
    },

    text_primary: {
        color: Brand.colors.white,
    },
    text_secondary: {
        color: Brand.theme.light.text,
    },
    text_dark: {
        color: Brand.colors.white,
    },
    text_ghost: {
        color: Brand.theme.light.text,
    },
    text_outline: {
        color: Brand.theme.light.text,
    },

    // Sizes
    button_sm: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: Brand.radius.md,
    },
    button_md: {
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    button_lg: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: Brand.radius.button,
    },

    text_sm: {
        fontSize: 14,
    },
    text_md: {
        fontSize: 16,
    },
    text_lg: {
        fontSize: 18,
        fontWeight: Brand.typography.fontWeight.bold,
    },
});
