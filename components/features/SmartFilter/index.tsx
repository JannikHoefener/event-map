/**
 * SmartFilter Component (Refactored)
 * 
 * KI-gesteuerter Filter-Wizard mit Schritt-für-Schritt Navigation.
 * Verwendet wiederverwendbare UI-Komponenten.
 */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Brand } from '../../../constants/brand';
import { ActiveFilters, FilterStep } from '../../../types';
import { StepIndicator, Button } from '../../ui';
import { SmartFilterHeader } from './SmartFilterHeader';
import { StepWhen } from './StepWhen';
import { StepWhere } from './StepWhere';
import { StepWhat } from './StepWhat';
import { DatePickerModal } from '../../ui/DatePickerModal';

interface SmartFilterProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: ActiveFilters) => void;
    initialFilters?: ActiveFilters;
}

const STEP_ORDER: FilterStep[] = ['when', 'where', 'what'];

const STEP_TITLES: Record<FilterStep, string> = {
    when: 'Wann hast du Zeit?',
    where: 'Drinnen oder Draußen?',
    what: 'Worauf hast du Lust?',
};

export default function SmartFilter({
    visible,
    onClose,
    onApply,
    initialFilters,
}: SmartFilterProps) {
    const [step, setStep] = useState<FilterStep>('when');
    const [filters, setFilters] = useState<ActiveFilters>(
        initialFilters || {
            when: 'today',
            indoor: 'any',
            categories: [],
            dateFrom: null,
            dateTo: null,
            timeOfDay: [],
        }
    );
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datePickerMode, setDatePickerMode] = useState<'from' | 'to'>('from');

    useEffect(() => {
        if (visible && initialFilters) {
            setFilters(initialFilters);
            setStep('when');
        }
    }, [visible, initialFilters]);

    if (!visible) return null;

    const currentStepIndex = STEP_ORDER.indexOf(step);

    const handleNext = () => {
        if (step === 'when') setStep('where');
        else if (step === 'where') setStep('what');
        else onApply(filters);
    };

    const handleBack = () => {
        if (step === 'what') setStep('where');
        else if (step === 'where') setStep('when');
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS !== 'ios') {
            setShowDatePicker(false);
        }

        if (selectedDate) {
            setFilters(prev => ({
                ...prev,
                when: 'custom',
                ...(datePickerMode === 'from'
                    ? { dateFrom: selectedDate }
                    : { dateTo: selectedDate }),
            }));
        }
    };

    return (
        <View style={styles.overlay}>
            <BlurView intensity={40} tint="dark" style={styles.backdrop} />

            <View style={styles.modalContainer}>
                <BlurView intensity={100} tint="light" style={styles.modalContent}>
                    {/* Header */}
                    <SmartFilterHeader
                        title={STEP_TITLES[step]}
                        onClose={onClose}
                    />

                    {/* Step Indicator */}
                    <StepIndicator steps={3} currentStep={currentStepIndex} />

                    {/* Content - scrollable with max height */}
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {step === 'when' && (
                            <StepWhen
                                filters={filters}
                                onUpdateFilters={setFilters}
                                onShowDatePicker={(mode) => {
                                    setDatePickerMode(mode);
                                    setShowDatePicker(true);
                                }}
                            />
                        )}
                        {step === 'where' && (
                            <StepWhere
                                filters={filters}
                                onUpdateFilters={setFilters}
                            />
                        )}
                        {step === 'what' && (
                            <StepWhat
                                filters={filters}
                                onUpdateFilters={setFilters}
                            />
                        )}
                    </ScrollView>

                    {/* Footer Actions */}
                    <View style={styles.footer}>
                        {step !== 'when' && (
                            <Button
                                label="Zurück"
                                onPress={handleBack}
                                variant="secondary"
                                size="lg"
                            />
                        )}
                        <Button
                            label={step === 'what' ? 'Ergebnisse anzeigen' : 'Weiter'}
                            onPress={handleNext}
                            variant={step === 'what' ? 'primary' : 'dark'}
                            size="lg"
                            style={step === 'when' ? { flex: 1 } : undefined}
                        />
                    </View>
                </BlurView>

                {/* Date Picker */}
                <DatePickerModal
                    visible={showDatePicker}
                    onClose={() => setShowDatePicker(false)}
                    date={
                        datePickerMode === 'from'
                            ? filters.dateFrom || new Date()
                            : filters.dateTo || new Date()
                    }
                    onChange={handleDateChange}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        zIndex: 1000,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        padding: Brand.spacing.lg,
        paddingBottom: Brand.spacing.huge,
    },
    modalContent: {
        borderRadius: Brand.radius.modal,
        overflow: 'hidden',
        backgroundColor: Brand.theme.light.surfaceBlur,
        padding: Brand.spacing.xxl,
    },
    scrollView: {
        maxHeight: 350, // Limit height to keep modal on screen
    },
    scrollContent: {
        paddingVertical: Brand.spacing.md,
    },
    footer: {
        flexDirection: 'row',
        marginTop: Brand.spacing.xxl,
        gap: Brand.spacing.md,
    },
});
