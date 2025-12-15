/**
 * BlurPill Component
 * 
 * Pill-förmige Komponente mit Blur-Effekt für Header-Elemente.
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { Brand } from '../../constants/brand';

interface BlurPillProps {
    children: React.ReactNode;
    style?: ViewStyle;
    intensity?: number;
    tint?: 'light' | 'dark' | 'default';
}

export function BlurPill({
    children,
    style,
    intensity = 80,
    tint = 'light',
}: BlurPillProps) {
    return (
        <BlurView
            intensity={intensity}
            tint={tint}
            style={[styles.pill, style]}
        >
            {children}
        </BlurView>
    );
}

interface LocationPillProps {
    icon: React.ReactNode;
    text: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export function LocationPill({
    icon,
    text,
    style,
    textStyle,
}: LocationPillProps) {
    return (
        <BlurPill style={style}>
            {icon}
            <Text style={[styles.locationText, textStyle]}>{text}</Text>
        </BlurPill>
    );
}

const styles = StyleSheet.create({
    pill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Brand.components.pill.paddingHorizontal,
        paddingVertical: Brand.components.pill.paddingVertical,
        borderRadius: Brand.components.pill.borderRadius,
        overflow: 'hidden',
        gap: Brand.spacing.sm,
        backgroundColor: Brand.theme.light.surfaceBlurLight,
    },
    locationText: {
        fontSize: Brand.typography.fontSize.lg,
        fontWeight: Brand.typography.fontWeight.semibold,
        color: Brand.theme.light.text,
    },
});

export default BlurPill;
