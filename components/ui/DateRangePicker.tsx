/**
 * DateRangePicker Component
 * 
 * Komponente zur Auswahl eines Datumszeitraums.
 */

import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';
import { Brand } from '../../constants/brand';
import { formatDateShort, formatDateFull } from '../../utils/dates';

interface DateRangePickerProps {
    dateFrom: Date | null;
    dateTo: Date | null;
    onDateFromChange: (date: Date) => void;
    onDateToChange: (date: Date) => void;
    showFullDate?: boolean;
}

export default function DateRangePicker({
    dateFrom,
    dateTo,
    onDateFromChange,
    onDateToChange,
    showFullDate = false,
}: DateRangePickerProps) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datePickerMode, setDatePickerMode] = useState<'from' | 'to'>('from');

    const handleDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS !== 'ios') {
            setShowDatePicker(false);
        }

        if (selectedDate) {
            if (datePickerMode === 'from') {
                onDateFromChange(selectedDate);
            } else {
                onDateToChange(selectedDate);
            }
        }
    };

    const formatDate = (date: Date | null): string | null => {
        if (!date) return null;
        return showFullDate ? formatDateFull(date) : formatDateShort(date);
    };

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
                        style={styles.iosOverlay}
                        activeOpacity={1}
                        onPress={() => setShowDatePicker(false)}
                    >
                        <View
                            style={styles.iosContainer}
                            onStartShouldSetResponder={() => true}
                        >
                            <View style={styles.iosHeader}>
                                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                    <Text style={styles.iosDone}>Fertig</Text>
                                </TouchableOpacity>
                            </View>
                            <DateTimePicker
                                value={datePickerMode === 'from'
                                    ? (dateFrom || new Date())
                                    : (dateTo || new Date())
                                }
                                mode="date"
                                display="inline"
                                onChange={handleDateChange}
                                style={styles.iosPicker}
                                themeVariant="light"
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            );
        }

        return (
            <DateTimePicker
                value={datePickerMode === 'from'
                    ? (dateFrom || new Date())
                    : (dateTo || new Date())
                }
                mode="date"
                display="default"
                onChange={handleDateChange}
            />
        );
    };

    return (
        <View style={styles.container}>
            {/* From Date */}
            <TouchableOpacity
                style={styles.dateCard}
                onPress={() => {
                    setDatePickerMode('from');
                    setShowDatePicker(true);
                }}
            >
                <View style={styles.dateHeader}>
                    <Text style={styles.dateLabel}>von:</Text>
                </View>
                <View style={[styles.dateValue, dateFrom && styles.dateValueActive]}>
                    {dateFrom ? (
                        <Text style={[styles.dateText, dateFrom && styles.dateTextActive]}>
                            {formatDate(dateFrom)}
                        </Text>
                    ) : (
                        <Calendar size={20} color={Brand.theme.light.tabIconDefault} />
                    )}
                </View>
            </TouchableOpacity>

            {/* To Date */}
            <TouchableOpacity
                style={styles.dateCard}
                onPress={() => {
                    setDatePickerMode('to');
                    setShowDatePicker(true);
                }}
            >
                <View style={styles.dateHeader}>
                    <Text style={styles.dateLabel}>bis:</Text>
                </View>
                <View style={[styles.dateValue, dateTo && styles.dateValueActive]}>
                    {dateTo ? (
                        <Text style={[styles.dateText, dateTo && styles.dateTextActive]}>
                            {formatDate(dateTo)}
                        </Text>
                    ) : (
                        <Calendar size={20} color={Brand.theme.light.tabIconDefault} />
                    )}
                </View>
            </TouchableOpacity>

            {renderDatePickerModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: Brand.spacing.md,
    },
    dateCard: {
        flex: 1,
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.md,
        gap: Brand.spacing.sm,
    },
    dateHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Brand.spacing.xs,
        marginBottom: Brand.spacing.xs,
    },
    dateLabel: {
        fontSize: Brand.typography.fontSize.md,
        fontWeight: Brand.typography.fontWeight.semibold,
        color: Brand.theme.light.text,
    },
    dateValue: {
        paddingHorizontal: Brand.spacing.md,
        paddingVertical: Brand.spacing.md,
        backgroundColor: Brand.colors.gray[50],
        borderRadius: Brand.radius.chip,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateValueActive: {
        backgroundColor: Brand.colors.accent,
    },
    dateText: {
        fontSize: Brand.typography.fontSize.base,
        fontWeight: Brand.typography.fontWeight.medium,
        color: Brand.theme.light.text,
    },
    dateTextActive: {
        color: Brand.colors.white,
    },

    // iOS Picker Styles
    iosOverlay: {
        flex: 1,
        backgroundColor: Brand.theme.light.overlayLight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Brand.spacing.xl,
    },
    iosContainer: {
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.lg,
        padding: Brand.spacing.lg,
        width: '100%',
        maxWidth: 400,
        ...Brand.shadows.xl,
    },
    iosHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: Brand.spacing.sm,
        paddingBottom: Brand.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Brand.colors.gray[100],
    },
    iosDone: {
        color: Brand.colors.primary,
        fontWeight: Brand.typography.fontWeight.semibold,
        fontSize: Brand.typography.fontSize.lg,
    },
    iosPicker: {
        height: 320,
    },
});
