/**
 * SmartFilter Component (Refactored)
 * 
 * KI-gesteuerter Filter-Wizard mit Schritt-für-Schritt Navigation.
 * Verwendet wiederverwendbare UI-Komponenten.
 */

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Modal,
} from 'react-native';
import { BlurView } from 'expo-blur';
import DateTimePicker from '@react-native-community/datetimepicker';
import { X, Calendar, Coffee, CloudSun } from 'lucide-react-native';
import { Brand } from '../../constants/brand';
import { ActiveFilters, FilterStep, TimeOfDay } from '../../types';
import { CATEGORIES, TIME_SLOTS, DAY_PRESETS, getCategoryColor } from '../../data/categories';
import { toggleCategory, toggleTimeOfDay } from '../../utils/filters';
import { getDayLabel } from '../../utils/dates';
import {
    StepIndicator,
    Button,
    Chip,
    OptionCard,
    SectionTitle,
} from '../ui';

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

    const handleToggleCategory = (categoryId: string) => {
        setFilters(prev => ({
            ...prev,
            categories: toggleCategory(prev.categories, categoryId),
        }));
    };

    const handleToggleTimeOfDay = (timeSlotId: TimeOfDay) => {
        setFilters(prev => ({
            ...prev,
            timeOfDay: toggleTimeOfDay(prev.timeOfDay || [], timeSlotId),
        }));
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

    // Render Step 1: When
    const renderWhenStep = () => (
        <>
            {/* Tag Section */}
            <SectionTitle title="Tag" marginTop={0} />

            {/* Day Presets - Single Row */}
            <View style={styles.chipContainer}>
                {DAY_PRESETS.main.map((day) => (
                    <Chip
                        key={day.id}
                        label={day.label}
                        active={filters.when === day.id}
                        onPress={() =>
                            setFilters(prev => ({
                                ...prev,
                                // Toggle: If same day is clicked again, set to 'any'
                                when: prev.when === day.id ? 'any' : day.id,
                                dateFrom: null,
                                dateTo: null,
                            }))
                        }
                    />
                ))}
            </View>

            {/* Date Range */}
            <SectionTitle title="Oder wähle eine Zeitspanne:" marginTop={Brand.spacing.lg} />
            <View style={styles.dateRangeRow}>
                {/* From Date */}
                <View style={styles.datePickerColumn}>
                    <Text style={styles.datePickerLabel}>von:</Text>
                    <TouchableOpacity
                        style={[styles.datePicker, filters.dateFrom && styles.datePickerActive]}
                        onPress={() => {
                            setDatePickerMode('from');
                            setShowDatePicker(true);
                        }}
                    >
                        {filters.dateFrom ? (
                            <Text style={[styles.datePickerText, styles.datePickerTextActive]}>
                                {filters.dateFrom.toLocaleDateString('de-DE', {
                                    day: '2-digit',
                                    month: '2-digit',
                                })}
                            </Text>
                        ) : (
                            <Calendar size={24} color={Brand.theme.light.tabIconDefault} />
                        )}
                    </TouchableOpacity>
                </View>

                {/* To Date */}
                <View style={styles.datePickerColumn}>
                    <Text style={styles.datePickerLabel}>bis:</Text>
                    <TouchableOpacity
                        style={[styles.datePicker, filters.dateTo && styles.datePickerActive]}
                        onPress={() => {
                            setDatePickerMode('to');
                            setShowDatePicker(true);
                        }}
                    >
                        {filters.dateTo ? (
                            <Text style={[styles.datePickerText, styles.datePickerTextActive]}>
                                {filters.dateTo.toLocaleDateString('de-DE', {
                                    day: '2-digit',
                                    month: '2-digit',
                                })}
                            </Text>
                        ) : (
                            <Calendar size={24} color={Brand.theme.light.tabIconDefault} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Time of Day */}
            <SectionTitle title="Tageszeit" marginTop={Brand.spacing.lg} />
            <View style={styles.timeChipsRow}>
                {TIME_SLOTS.map((timeSlot) => (
                    <Chip
                        key={timeSlot.id}
                        label={timeSlot.label}
                        active={filters.timeOfDay?.includes(timeSlot.id) || false}
                        onPress={() => handleToggleTimeOfDay(timeSlot.id)}
                    />
                ))}
            </View>
        </>
    );

    // Render Step 2: Where (Indoor/Outdoor)
    const renderWhereStep = () => (
        <View style={styles.optionsGrid}>
            <OptionCard
                label="Drinnen"
                icon={<Coffee size={24} color={filters.indoor === 'indoor' ? 'white' : Brand.colors.primary} />}
                selected={filters.indoor === 'indoor'}
                onPress={() => setFilters({ ...filters, indoor: 'indoor' })}
            />
            <OptionCard
                label="Draußen"
                icon={<CloudSun size={24} color={filters.indoor === 'outdoor' ? 'white' : Brand.colors.primary} />}
                selected={filters.indoor === 'outdoor'}
                onPress={() => setFilters({ ...filters, indoor: 'outdoor' })}
            />
            <OptionCard
                label="Egal"
                selected={filters.indoor === 'any'}
                onPress={() => setFilters({ ...filters, indoor: 'any' })}
            />
        </View>
    );

    // Render Step 3: What (Categories)
    const renderWhatStep = () => (
        <View style={styles.categoriesGrid}>
            {CATEGORIES.map((cat) => (
                <Chip
                    key={cat.id}
                    label={cat.displayLabel}
                    active={filters.categories.includes(cat.id)}
                    activeColor={getCategoryColor(cat.id)}
                    onPress={() => handleToggleCategory(cat.id)}
                />
            ))}
        </View>
    );

    // Render Date Picker Modal (iOS)
    const renderDatePickerModal = () => {
        if (!showDatePicker) return null;

        if (Platform.OS === 'ios') {
            return (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={showDatePicker}
                    onRequestClose={() => setShowDatePicker(false)}
                >
                    <TouchableOpacity
                        style={styles.iosDatePickerOverlay}
                        activeOpacity={1}
                        onPress={() => setShowDatePicker(false)}
                    >
                        <View
                            style={styles.iosDatePickerContainer}
                            onStartShouldSetResponder={() => true}
                        >
                            <View style={styles.iosDatePickerHeader}>
                                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                    <Text style={styles.iosDatePickerDone}>Fertig</Text>
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                value={
                                    datePickerMode === 'from'
                                        ? filters.dateFrom || new Date()
                                        : filters.dateTo || new Date()
                                }
                                mode="date"
                                display="inline"
                                onChange={handleDateChange}
                                style={styles.iosDatePicker}
                                themeVariant="light"
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            );
        }

        return (
            <DateTimePicker
                value={
                    datePickerMode === 'from'
                        ? filters.dateFrom || new Date()
                        : filters.dateTo || new Date()
                }
                mode="date"
                display="default"
                onChange={handleDateChange}
            />
        );
    };

    return (
        <View style={styles.overlay}>
            <BlurView intensity={40} tint="dark" style={styles.backdrop} />

            <View style={styles.modalContainer}>
                <BlurView intensity={100} tint="light" style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>{STEP_TITLES[step]}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={20} color={Brand.theme.light.text} />
                        </TouchableOpacity>
                    </View>

                    {/* Step Indicator */}
                    <StepIndicator steps={3} currentStep={currentStepIndex} />

                    {/* Content - scrollable with max height */}
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        {step === 'when' && renderWhenStep()}
                        {step === 'where' && renderWhereStep()}
                        {step === 'what' && renderWhatStep()}
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
                {renderDatePickerModal()}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Brand.spacing.xl,
    },
    title: {
        fontFamily: Brand.typography.headings.h2.fontFamily,
        fontSize: Brand.typography.headings.h2.fontSize,
        fontWeight: Brand.typography.headings.h2.fontWeight,
        letterSpacing: Brand.typography.headings.h2.letterSpacing,
        color: Brand.theme.light.text,
    },
    closeButton: {
        padding: Brand.spacing.sm,
        backgroundColor: Brand.colors.gray[100],
        borderRadius: Brand.radius.chip,
    },
    scrollView: {
        maxHeight: 350, // Limit height to keep modal on screen
    },
    scrollContent: {
        paddingVertical: Brand.spacing.md,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.sm,
        marginBottom: Brand.spacing.md,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.md,
    },
    dateRow: {
        flexDirection: 'row',
        gap: Brand.spacing.sm,
        marginBottom: Brand.spacing.md,
    },
    dateRangeRow: {
        flexDirection: 'row',
        gap: Brand.spacing.md,
    },
    datePickerCard: {
        flex: 1,
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.md,
        padding: Brand.spacing.md,
        gap: Brand.spacing.sm,
        borderWidth: 1,
        borderColor: Brand.colors.gray[100],
        ...Brand.shadows.sm,
    },
    datePickerColumn: {
        flex: 1,
    },
    datePickerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Brand.spacing.xs,
    },
    datePickerLabel: {
        fontSize: Brand.typography.fontSize.base,
        fontWeight: Brand.typography.fontWeight.medium,
        color: Brand.theme.light.text,
        marginBottom: Brand.spacing.sm,
    },
    datePicker: {
        backgroundColor: Brand.colors.gray[50],
        borderRadius: Brand.radius.lg,
        paddingVertical: Brand.spacing.md,
        paddingHorizontal: Brand.spacing.xl,
        borderWidth: 1,
        borderColor: Brand.colors.gray[100],
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    datePickerActive: {
        backgroundColor: Brand.colors.primary,
        borderColor: Brand.colors.primary,
    },
    datePickerText: {
        fontSize: Brand.typography.fontSize.lg,
        fontWeight: Brand.typography.fontWeight.semibold,
        color: Brand.theme.light.text,
        textAlign: 'center',
    },
    datePickerTextActive: {
        color: Brand.colors.white,
    },
    timeChipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.sm,
    },
    timeOfDayChips: {
        flexDirection: 'row',
        gap: Brand.spacing.md,
    },
    timeOfDayChip: {
        flex: 1,
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.md,
        padding: Brand.spacing.md,
        alignItems: 'center',
        gap: Brand.spacing.xs,
        borderWidth: 1,
        borderColor: Brand.colors.gray[200],
    },
    timeOfDayLabel: {
        fontSize: Brand.typography.fontSize.base,
        fontWeight: Brand.typography.fontWeight.semibold,
        color: Brand.theme.light.text,
    },
    timeOfDayTime: {
        fontSize: Brand.typography.fontSize.xs,
        fontWeight: Brand.typography.fontWeight.regular,
        color: Brand.theme.light.tabIconDefault,
    },
    selectedCategory: {
        backgroundColor: Brand.colors.primary,
        borderColor: Brand.colors.primary,
    },
    selectedText: {
        color: Brand.colors.white,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.md,
    },
    footer: {
        flexDirection: 'row',
        marginTop: Brand.spacing.xxl,
        gap: Brand.spacing.md,
    },

    // iOS Date Picker
    iosDatePickerOverlay: {
        flex: 1,
        backgroundColor: Brand.theme.light.overlayLight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Brand.spacing.xl,
    },
    iosDatePickerContainer: {
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.lg,
        padding: Brand.spacing.lg,
        width: '100%',
        maxWidth: 400,
        ...Brand.shadows.xl,
    },
    iosDatePickerHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: Brand.spacing.sm,
        paddingBottom: Brand.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Brand.colors.gray[100],
    },
    iosDatePickerDone: {
        color: Brand.colors.primary,
        fontWeight: Brand.typography.fontWeight.semibold,
        fontSize: Brand.typography.fontSize.lg,
    },
    iosDatePicker: {
        height: 320,
    },
});
