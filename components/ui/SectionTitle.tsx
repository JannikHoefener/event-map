/**
 * SectionTitle Component
 * 
 * Wiederverwendbare Überschrift für Sektionen in Modals und Screens.
 */

import React from 'react';
import { Text, StyleSheet, TextStyle, ViewStyle, View } from 'react-native';
import { Brand } from '../../constants/brand';

interface SectionTitleProps {
    title: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    subtitle?: string;
    size?: 'sm' | 'md' | 'lg';
    marginTop?: number;
    marginBottom?: number;
}

export default function SectionTitle({
    title,
    style,
    textStyle,
    subtitle,
    size = 'md',
    marginTop,
    marginBottom,
}: SectionTitleProps) {
    const sizeStyles = {
        sm: styles.titleSm,
        md: styles.titleMd,
        lg: styles.titleLg,
    };

    return (
        <View
            style={[
                styles.container,
                marginTop !== undefined && { marginTop },
                marginBottom !== undefined && { marginBottom },
                style,
            ]}
        >
            <Text style={[styles.title, sizeStyles[size], textStyle]}>
                {title}
            </Text>
            {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Brand.spacing.md,
        marginBottom: Brand.spacing.md,
    },
    title: {
        fontWeight: Brand.typography.fontWeight.bold,
        color: Brand.theme.light.text,
    },
    titleSm: {
        fontSize: 14,
    },
    titleMd: {
        fontSize: 16,
    },
    titleLg: {
        fontSize: 18,
    },
    subtitle: {
        fontSize: 13,
        color: Brand.theme.light.textSecondary,
        marginTop: 4,
    },
});
