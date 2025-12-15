/**
 * OptionCard Component
 * 
 * Auswahl-Karte für Wizard-Schritte (z.B. Tag, Indoor/Outdoor).
 */

import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ViewStyle } from 'react-native';
import { Brand } from '../../constants/brand';

interface OptionCardProps {
    label: string;
    sublabel?: string;
    icon?: React.ReactNode;
    selected?: boolean;
    onPress: () => void;
    style?: ViewStyle;
    variant?: 'default' | 'date' | 'full';
}

export default function OptionCard({
    label,
    sublabel,
    icon,
    selected = false,
    onPress,
    style,
    variant = 'default',
}: OptionCardProps) {
    return (
        <TouchableOpacity
            style={[
                styles.card,
                variant === 'date' && styles.dateCard,
                variant === 'full' && styles.fullCard,
                selected && styles.selectedCard,
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {icon && (
                <View style={styles.iconContainer}>
                    {icon}
                </View>
            )}
            <Text
                style={[
                    styles.label,
                    variant === 'date' && styles.dateLabel,
                    selected && styles.selectedText,
                ]}
            >
                {label}
            </Text>
            {sublabel && (
                <Text style={[styles.sublabel, selected && styles.selectedText]}>
                    {sublabel}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        aspectRatio: 1.4,
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.card,
        padding: Brand.spacing.lg,
        justifyContent: 'center',
        alignItems: 'center',
        gap: Brand.spacing.md,
        borderWidth: 1,
        borderColor: Brand.colors.gray[100],
        ...Brand.shadows.sm,
    },
    dateCard: {
        flex: 1,
        aspectRatio: undefined,
        padding: Brand.spacing.md,
        gap: Brand.spacing.xs,
    },
    fullCard: {
        width: '100%',
    },
    selectedCard: {
        backgroundColor: Brand.colors.primary,
        borderColor: Brand.colors.primary,
    },
    iconContainer: {
        marginBottom: Brand.spacing.xs,
    },
    label: {
        fontSize: Brand.typography.fontSize.lg,
        fontWeight: Brand.typography.fontWeight.semibold,
        color: Brand.theme.light.text,
        textAlign: 'center',
    },
    dateLabel: {
        fontSize: Brand.typography.fontSize.sm,
    },
    sublabel: {
        fontSize: Brand.typography.fontSize.xs,
        fontWeight: Brand.typography.fontWeight.regular,
        color: Brand.theme.light.tabIconDefault,
        textAlign: 'center',
    },
    selectedText: {
        color: Brand.colors.white,
    },
});
