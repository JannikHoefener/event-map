/**
 * Chip Component
 * 
 * Wiederverwendbarer Chip für Filter, Tags und Auswahl-Optionen.
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Brand } from '../../constants/brand';

interface ChipProps {
    label: string;
    active?: boolean;
    onPress?: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'date' | 'category';
    disabled?: boolean;
}

export default function Chip({
    label,
    active = false,
    onPress,
    style,
    textStyle,
    icon,
    size = 'md',
    variant = 'default',
    disabled = false,
}: ChipProps) {
    const sizeStyles = {
        sm: { paddingHorizontal: 10, paddingVertical: 6 },
        md: { paddingHorizontal: 16, paddingVertical: 10 },
        lg: { paddingHorizontal: 20, paddingVertical: 12 },
    };

    const sizeFontStyles = {
        sm: { fontSize: 12 },
        md: { fontSize: 14 },
        lg: { fontSize: 16 },
    };

    return (
        <TouchableOpacity
            style={[
                styles.chip,
                sizeStyles[size],
                variant === 'date' && styles.dateChip,
                active && styles.activeChip,
                disabled && styles.disabledChip,
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled || !onPress}
        >
            {icon}
            <Text
                style={[
                    styles.chipText,
                    sizeFontStyles[size],
                    active && styles.activeChipText,
                    disabled && styles.disabledChipText,
                    textStyle,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Brand.colors.gray[50],
        borderRadius: Brand.radius.chip,
        borderWidth: 1,
        borderColor: Brand.colors.gray[100],
        gap: 8,
    },
    dateChip: {
        flex: 1,
        justifyContent: 'center',
    },
    activeChip: {
        backgroundColor: Brand.colors.accent,
        borderColor: Brand.colors.accent,
    },
    disabledChip: {
        opacity: 0.5,
    },
    chipText: {
        fontWeight: Brand.typography.fontWeight.semibold,
        color: Brand.theme.light.text,
    },
    activeChipText: {
        color: Brand.colors.white,
    },
    disabledChipText: {
        color: Brand.colors.gray[400],
    },
});
