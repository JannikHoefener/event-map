/**
 * StepIndicator Component
 * 
 * Fortschrittsanzeige für mehrstufige Prozesse/Wizards.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Brand } from '../../constants/brand';

interface StepIndicatorProps {
    steps: number;
    currentStep: number;
    style?: ViewStyle;
    activeColor?: string;
    inactiveColor?: string;
}

export default function StepIndicator({
    steps,
    currentStep,
    style,
    activeColor = Brand.colors.primary,
    inactiveColor = Brand.colors.gray[200],
}: StepIndicatorProps) {
    const renderSteps = () => {
        const elements = [];

        for (let i = 0; i < steps; i++) {
            const isActive = i === currentStep;
            const isCompleted = i < currentStep;

            // Dot
            elements.push(
                <View
                    key={`dot-${i}`}
                    style={[
                        styles.dot,
                        { backgroundColor: isActive || isCompleted ? activeColor : inactiveColor },
                        isActive && styles.activeDot,
                    ]}
                />
            );

            // Line (except after last dot)
            if (i < steps - 1) {
                elements.push(
                    <View
                        key={`line-${i}`}
                        style={[
                            styles.line,
                            { backgroundColor: isCompleted ? activeColor : inactiveColor },
                        ]}
                    />
                );
            }
        }

        return elements;
    };

    return (
        <View style={[styles.container, style]}>
            {renderSteps()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Brand.spacing.huge,
        marginBottom: Brand.spacing.xxl,
    },
    dot: {
        width: Brand.components.stepIndicator.dotSize,
        height: Brand.components.stepIndicator.dotSize,
        borderRadius: Brand.components.stepIndicator.dotSize / 2,
    },
    activeDot: {
        transform: [{ scale: Brand.components.stepIndicator.activeScale }],
    },
    line: {
        flex: 1,
        height: Brand.components.stepIndicator.lineHeight,
        marginHorizontal: Brand.spacing.xs,
    },
});
