import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { Brand } from '../../../constants/brand';
import { ActiveFilters, TimeOfDay } from '../../../types';
import { DAY_PRESETS, TIME_SLOTS } from '../../../data/categories';
import { toggleTimeOfDay } from '../../../utils/filters';
import { SectionTitle, Chip } from '../../ui';

interface StepWhenProps {
    filters: ActiveFilters;
    onUpdateFilters: (updater: (prev: ActiveFilters) => ActiveFilters) => void;
    onShowDatePicker: (mode: 'from' | 'to') => void;
}

export const StepWhen: React.FC<StepWhenProps> = ({
    filters,
    onUpdateFilters,
    onShowDatePicker,
}) => {
    const handleToggleTimeOfDay = (timeSlotId: TimeOfDay) => {
        onUpdateFilters(prev => ({
            ...prev,
            timeOfDay: toggleTimeOfDay(prev.timeOfDay || [], timeSlotId),
        }));
    };

    return (
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
                            onUpdateFilters(prev => ({
                                ...prev,
                                // Toggle: If same day is clicked again, set to 'any'
                                when: prev.when === day.id ? 'any' : day.id as any,
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
                        onPress={() => onShowDatePicker('from')}
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
                        onPress={() => onShowDatePicker('to')}
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
};

const styles = StyleSheet.create({
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.sm,
        marginBottom: Brand.spacing.md,
    },
    dateRangeRow: {
        flexDirection: 'row',
        gap: Brand.spacing.md,
    },
    datePickerColumn: {
        flex: 1,
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
});
