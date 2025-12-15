/**
 * ModalHeader Component
 * 
 * Wiederverwendbarer Header für Modals mit Titel und optionalen Aktionen.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { X } from 'lucide-react-native';
import { Brand } from '../../constants/brand';

interface ModalHeaderProps {
    title: string;
    onClose?: () => void;
    rightAction?: {
        label: string;
        onPress: () => void;
    };
    showCloseButton?: boolean;
    style?: ViewStyle;
}

export default function ModalHeader({
    title,
    onClose,
    rightAction,
    showCloseButton = false,
    style,
}: ModalHeaderProps) {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.actions}>
                {rightAction && (
                    <TouchableOpacity
                        onPress={rightAction.onPress}
                        style={styles.actionButton}
                    >
                        <Text style={styles.actionText}>{rightAction.label}</Text>
                    </TouchableOpacity>
                )}

                {showCloseButton && onClose && (
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                    >
                        <X size={20} color={Brand.theme.light.text} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Brand.spacing.xxl,
    },
    title: {
        fontFamily: Brand.typography.headings.h2.fontFamily,
        fontSize: Brand.typography.headings.h2.fontSize,
        fontWeight: Brand.typography.headings.h2.fontWeight,
        letterSpacing: Brand.typography.headings.h2.letterSpacing,
        color: Brand.theme.light.text,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Brand.spacing.md,
    },
    actionButton: {
        paddingHorizontal: Brand.spacing.lg,
        paddingVertical: Brand.spacing.sm,
        backgroundColor: Brand.colors.gray[100],
        borderRadius: Brand.radius.chip,
    },
    actionText: {
        fontFamily: Brand.typography.headings.label.fontFamily,
        fontSize: Brand.typography.headings.label.fontSize,
        fontWeight: Brand.typography.headings.label.fontWeight,
        color: Brand.theme.light.text,
    },
    closeButton: {
        padding: Brand.spacing.sm,
        backgroundColor: Brand.colors.gray[100],
        borderRadius: Brand.radius.chip,
    },
});
