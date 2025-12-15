/**
 * FilterModal Component (Refactored)
 * 
 * Modal zur manuellen Auswahl von Event-Filtern.
 * Verwendet wiederverwendbare UI-Komponenten.
 */

import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Platform, Modal, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import { Brand } from '../../constants/brand';
import { ActiveFilters, TimeOfDay } from '../../types';
import { CATEGORIES, TIME_SLOTS, INDOOR_OPTIONS, DAY_PRESETS, getCategoryColor } from '../../data/categories';
import { createEmptyFilters, toggleCategory, toggleTimeOfDay } from '../../utils/filters';
import { formatDateShort } from '../../utils/dates';
import {
    BottomSheet,
    ModalHeader,
    SectionTitle,
    Chip,
    Button,
} from '../ui';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: ActiveFilters) => void;
    initialFilters: ActiveFilters;
}

export default function FilterModal({
    visible,
    onClose,
    onApply,
    initialFilters,
}: FilterModalProps) {
    const [filters, setFilters] = useState<ActiveFilters>(initialFilters);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datePickerMode, setDatePickerMode] = useState<'from' | 'to'>('from');

    useEffect(() => {
        if (visible) {
            setFilters(initialFilters);
        }
    }, [visible, initialFilters]);

    const handleReset = () => {
        setFilters(createEmptyFilters());
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
                    : { dateTo: selectedDate }
                ),
            }));
        }
    };

    const handleWhenSelect = (id: string) => {
        setFilters(prev => ({
            ...prev,
            when: prev.when === id ? 'any' : id as ActiveFilters['when'],
            dateFrom: null,
            dateTo: null,
        }));
    };

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
        <BottomSheet visible={visible} onClose={onClose}>
            {/* Header */}
            <ModalHeader
                title="Filter"
                rightAction={{
                    label: 'Löschen',
                    onPress: handleReset,
                }}
            />

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

                {/* Tag (Day) */}
                <SectionTitle title="Tag" marginTop={0} />
                <View style={styles.chipContainer}>
                    {DAY_PRESETS.main.map((day) => (
                        <Chip
                            key={day.id}
                            label={day.label}
                            active={filters.when === day.id}
                            onPress={() => handleWhenSelect(day.id)}
                        />
                    ))}
                </View>

                {/* Date Range */}
                <SectionTitle title="Oder wähle eine Zeitspanne:" />
                <View style={styles.dateRangeRow}>
                    {/* From Date */}
                    <TouchableOpacity
                        style={styles.datePickerCard}
                        onPress={() => {
                            setDatePickerMode('from');
                            setShowDatePicker(true);
                        }}
                    >
                        <Text style={styles.datePickerLabel}>von:</Text>
                        <View style={[styles.dateChip, filters.dateFrom && styles.activeDateChip]}>
                            {filters.dateFrom ? (
                                <Text style={[styles.dateChipText, styles.activeDateChipText]}>
                                    {formatDateShort(filters.dateFrom)}
                                </Text>
                            ) : (
                                <Calendar size={20} color={Brand.theme.light.tabIconDefault} />
                            )}
                        </View>
                    </TouchableOpacity>

                    {/* To Date */}
                    <TouchableOpacity
                        style={styles.datePickerCard}
                        onPress={() => {
                            setDatePickerMode('to');
                            setShowDatePicker(true);
                        }}
                    >
                        <Text style={styles.datePickerLabel}>bis:</Text>
                        <View style={[styles.dateChip, filters.dateTo && styles.activeDateChip]}>
                            {filters.dateTo ? (
                                <Text style={[styles.dateChipText, styles.activeDateChipText]}>
                                    {formatDateShort(filters.dateTo)}
                                </Text>
                            ) : (
                                <Calendar size={20} color={Brand.theme.light.tabIconDefault} />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Time of Day */}
                <SectionTitle title="Tageszeit" />
                <View style={styles.chipContainer}>
                    {TIME_SLOTS.map((timeSlot) => (
                        <Chip
                            key={timeSlot.id}
                            label={timeSlot.label}
                            active={filters.timeOfDay?.includes(timeSlot.id) || false}
                            onPress={() => handleToggleTimeOfDay(timeSlot.id)}
                        />
                    ))}
                </View>

                {/* Indoor/Outdoor */}
                <SectionTitle title="Drinnen/Draußen" />
                <View style={styles.chipContainer}>
                    {INDOOR_OPTIONS.map((option) => (
                        <Chip
                            key={option.id}
                            label={option.label}
                            active={filters.indoor === option.id}
                            onPress={() => setFilters({ ...filters, indoor: option.id })}
                        />
                    ))}
                </View>

                {/* Categories */}
                <SectionTitle title="Kategorie" />
                <View style={styles.chipContainer}>
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

                {/* Bottom Spacer */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Button
                    label="Anwenden"
                    onPress={() => onApply(filters)}
                    variant="primary"
                    size="lg"
                    fullWidth
                />
            </View>

            {/* Date Picker */}
            {renderDatePickerModal()}
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    /* chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.sm,
    }, */
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.sm,
        marginBottom: Brand.spacing.md,
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
        gap: Brand.spacing.sm,
    },
    datePickerLabel: {
        fontSize: Brand.typography.fontSize.md,
        fontWeight: Brand.typography.fontWeight.semibold,
        color: Brand.theme.light.text,
    },
    dateChip: {
        paddingHorizontal: Brand.spacing.md,
        paddingVertical: Brand.spacing.md,
        backgroundColor: Brand.colors.gray[50],
        borderRadius: Brand.radius.chip,
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeDateChip: {
        backgroundColor: Brand.colors.accent,
    },
    dateChipText: {
        fontSize: Brand.typography.fontSize.base,
        fontWeight: Brand.typography.fontWeight.semibold,
        color: Brand.theme.light.text,
    },
    activeDateChipText: {
        color: Brand.colors.white,
    },
    footer: {
        position: 'absolute',
        bottom: Brand.spacing.huge,
        left: 0,
        right: 0,
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
