/**
 * ActionBar Component
 * 
 * Bottom Action Bar mit Blur-Effekt für primäre Aktionen.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { Brand } from '../../constants/brand';

interface ActionItem {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
}

interface ActionBarProps {
    actions: ActionItem[];
    style?: ViewStyle;
    showDividers?: boolean;
}

export default function ActionBar({
    actions,
    style,
    showDividers = true,
}: ActionBarProps) {
    return (
        <View style={[styles.container, style]}>
            <BlurView intensity={90} tint="light" style={styles.bar}>
                {actions.map((action, index) => (
                    <React.Fragment key={index}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={action.onPress}
                            activeOpacity={0.7}
                        >
                            {action.icon}
                            <Text style={styles.actionText}>{action.label}</Text>
                        </TouchableOpacity>

                        {showDividers && index < actions.length - 1 && (
                            <View style={styles.divider} />
                        )}
                    </React.Fragment>
                ))}
            </BlurView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: Brand.spacing.huge,
        left: Brand.spacing.xl,
        right: Brand.spacing.xl,
        alignItems: 'center',
    },
    bar: {
        flexDirection: 'row',
        backgroundColor: Brand.theme.light.surfaceBlurStrong,
        borderRadius: Brand.components.actionBar.borderRadius,
        padding: Brand.components.actionBar.padding,
        overflow: 'hidden',
        width: '100%',
        maxWidth: Brand.components.actionBar.maxWidth,
        ...Brand.shadows.xl,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Brand.spacing.md,
        gap: Brand.spacing.sm,
    },
    actionText: {
        fontSize: Brand.typography.fontSize.lg,
        fontWeight: Brand.typography.fontWeight.semibold,
        color: Brand.theme.light.text,
    },
    divider: {
        width: 1,
        height: '60%',
        backgroundColor: Brand.theme.light.divider,
        alignSelf: 'center',
    },
});
