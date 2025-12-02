import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Check, Calendar } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: any) => void;
    initialFilters: {
        when: string;
        indoor: string;
        categories: string[];
        dateFrom?: Date | null;
        dateTo?: Date | null;
        timeOfDay?: string[];
    };
}

export default function FilterModal({ visible, onClose, onApply, initialFilters }: FilterModalProps) {
    const [filters, setFilters] = useState(initialFilters);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datePickerMode, setDatePickerMode] = useState<'from' | 'to'>('from');

    useEffect(() => {
        if (visible) {
            setFilters(initialFilters);
        }
    }, [visible, initialFilters]);

    const handleReset = () => {
        setFilters({
            when: 'any',
            indoor: 'any',
            categories: [],
        });
    };

    const toggleCategory = (cat: string) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };


    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.backdrop} onPress={onClose} />

                <View style={styles.modalContainer}>
                    <View style={styles.handle} />

                    <View style={styles.header}>
                        <Text style={styles.title}>Filter</Text>
                        <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
                            <Text style={styles.resetText}>Löschen</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                        {/* Tag (Day) */}
                        <Text style={styles.sectionTitle}>Tag</Text>

                        {/* First Row: Heute, Morgen, Übermorgen */}
                        <View style={styles.dateRow}>
                            {['Heute', 'Morgen', 'Übermorgen'].map((day) => {
                                const today = new Date();
                                const tomorrow = new Date(today);
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                const dayAfterTomorrow = new Date(today);
                                dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

                                const id = day === 'Heute' ? 'today'
                                    : day === 'Morgen' ? 'tomorrow'
                                        : 'dayAfterTomorrow';

                                const getLabel = () => {
                                    if (day === 'Heute') return `Heute`;
                                    if (day === 'Morgen') return `Morgen`;
                                    if (day === 'Übermorgen') return `Übermorgen`;
                                    return day;
                                };

                                const isActive = filters.when === id;
                                return (
                                    <TouchableOpacity
                                        key={day}
                                        style={[styles.dateChip, isActive && styles.activeChip]}
                                        onPress={() => setFilters({
                                            ...filters,
                                            when: isActive ? 'any' : id,
                                            dateFrom: null,
                                            dateTo: null
                                        })}
                                    >
                                        <Text style={[styles.chipText, isActive && styles.activeChipText]}>{getLabel()}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Second Row: Wochenende, Egal */}
                        <View style={styles.chipContainer}>
                            {['Wochenende', 'Egal'].map((day) => {
                                const id = day === 'Wochenende' ? 'weekend' : 'any';
                                const isActive = filters.when === id;
                                return (
                                    <TouchableOpacity
                                        key={day}
                                        style={[styles.chip, isActive && styles.activeChip]}
                                        onPress={() => setFilters({
                                            ...filters,
                                            when: isActive ? 'any' : id,
                                            dateFrom: null,
                                            dateTo: null
                                        })}
                                    >
                                        <Text style={[styles.chipText, isActive && styles.activeChipText]}>{day}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Date Range */}
                        <Text style={styles.sectionTitle}>Oder wähle eine Zeitspanne:</Text>
                        <View style={styles.dateRangeRow}>
                            <TouchableOpacity
                                style={styles.datePickerCard}
                                onPress={() => {
                                    setDatePickerMode('from');
                                    setShowDatePicker(true);
                                }}
                            >
                                <View style={styles.datePickerHeader}>
                                    <Text style={styles.datePickerLabel}>von:</Text>
                                </View>
                                <View style={[styles.chip, filters.dateFrom && styles.activeChip]}>
                                    {filters.dateFrom ? (
                                        <Text style={[styles.chipText, filters.dateFrom && styles.activeChipText]}>
                                            {filters.dateFrom.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}
                                        </Text>
                                    ) : (
                                        <Calendar size={20} color={Colors.light.tabIconDefault} />
                                    )}
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.datePickerCard}
                                onPress={() => {
                                    setDatePickerMode('to');
                                    setShowDatePicker(true);
                                }}
                            >
                                <View style={styles.datePickerHeader}>
                                    <Text style={styles.datePickerLabel}>bis:</Text>
                                </View>
                                <View style={[styles.chip, filters.dateTo && styles.activeChip]}>
                                    {filters.dateTo ? (
                                        <Text style={[styles.chipText, filters.dateTo && styles.activeChipText]}>
                                            {filters.dateTo.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}
                                        </Text>
                                    ) : (
                                        <Calendar size={20} color={Colors.light.tabIconDefault} />
                                    )}
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Time of Day */}
                        <Text style={styles.sectionTitle}>Tageszeit</Text>
                        <View style={styles.chipContainer}>
                            {[
                                { id: 'morning', label: '🌅 Morgens'/* , time: '06:00-12:00' */ },
                                { id: 'afternoon', label: '☀️ Mittags'/* , time: '12:00-18:00' */ },
                                { id: 'evening', label: '🌙 Abends'/* , time: '18:00-00:00' */ }
                            ].map((timeSlot) => {
                                const isActive = filters.timeOfDay?.includes(timeSlot.id) || false;
                                return (
                                    <TouchableOpacity
                                        key={timeSlot.id}
                                        style={[styles.chip, isActive && styles.activeChip]}
                                        onPress={() => {
                                            const currentTimeOfDay = filters.timeOfDay || [];
                                            const newTimeOfDay = currentTimeOfDay.includes(timeSlot.id)
                                                ? currentTimeOfDay.filter(t => t !== timeSlot.id)
                                                : [...currentTimeOfDay, timeSlot.id];
                                            setFilters({ ...filters, timeOfDay: newTimeOfDay });
                                        }}
                                    >
                                        <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                                            {timeSlot.label} {timeSlot.time}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Drinnen/Draußen */}
                        <Text style={styles.sectionTitle}>Drinnen/Draußen</Text>
                        <View style={styles.chipContainer}>
                            {[
                                { label: 'Drinnen', id: 'indoor' },
                                { label: 'Draußen', id: 'outdoor' },
                                { label: 'Egal', id: 'any' }
                            ].map((option) => {
                                const isActive = filters.indoor === option.id;
                                return (
                                    <TouchableOpacity
                                        key={option.id}
                                        style={[styles.chip, isActive && styles.activeChip]}
                                        onPress={() => setFilters({ ...filters, indoor: option.id })}
                                    >
                                        <Text style={[styles.chipText, isActive && styles.activeChipText]}>{option.label}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Uhrzeit (Time) - Mockup for now */}
                        {/* <Text style={styles.sectionTitle}>Uhrzeit</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                            {['00:00', '00:30', '01:00', '01:30', '02:00'].map((time) => (
                                <TouchableOpacity key={time} style={styles.chip}>
                                    <Text style={styles.chipText}>{time}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView> */}

                        {/* Kategorie */}
                        <Text style={styles.sectionTitle}>Kategorie</Text>
                        <View style={styles.chipContainer}>
                            {[
                                '🎵 Musik',
                                '☕ Café',
                                '🍰 Desserts',
                                '🥤 Drinks',
                                '🔥 Grill & BBQ',
                                '🍕 Pizza',
                                '🍳 Frühstück',
                                '🥗 Vegan',
                                '🍔 Burger',
                                '🇮🇹 Italienisch',
                                '🍝 Pasta',
                                '🥣 Bowls',
                                '🥗 Healthy',
                                '🍜 Asiatisch',
                                '🍟 Fast Food',
                                '🦞 Seafood',
                                '🍣 Sushi',
                                '🥨 Deutsch',
                                '🎨 Kunst',
                                '🎉 Party',
                            ].map((cat) => {
                                const label = cat.split(' ').slice(1).join(' ');
                                const id = label.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_');
                                const isActive = filters.categories.includes(id);

                                return (
                                    <TouchableOpacity
                                        key={id}
                                        style={[styles.chip, isActive && styles.activeChip]}
                                        onPress={() => toggleCategory(id)}
                                    >
                                        <Text style={[styles.chipText, isActive && styles.activeChipText]}>{cat}</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <View style={{ height: 100 }} />
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.applyButton} onPress={() => onApply(filters)}>
                            <Text style={styles.applyButtonText}>Anwenden</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* DateTimePicker */}
            {showDatePicker && (
                Platform.OS === 'ios' ? (
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
                            <View style={styles.iosDatePickerContainer} onStartShouldSetResponder={() => true}>
                                <View style={styles.iosDatePickerHeader}>
                                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                                        <Text style={styles.iosDatePickerDone}>Fertig</Text>
                                    </TouchableOpacity>
                                </View>
                                <DateTimePicker
                                    value={datePickerMode === 'from' ? (filters.dateFrom || new Date()) : (filters.dateTo || new Date())}
                                    mode="date"
                                    display="inline"
                                    onChange={(event, selectedDate) => {
                                        if (selectedDate) {
                                            if (datePickerMode === 'from') {
                                                setFilters({
                                                    ...filters,
                                                    when: 'custom',
                                                    dateFrom: selectedDate
                                                });
                                            } else {
                                                setFilters({
                                                    ...filters,
                                                    when: 'custom',
                                                    dateTo: selectedDate
                                                });
                                            }
                                        }
                                    }}
                                    style={styles.iosDatePicker}
                                    themeVariant="light"
                                />
                            </View>
                        </TouchableOpacity>
                    </Modal>
                ) : (
                    <DateTimePicker
                        value={datePickerMode === 'from' ? (filters.dateFrom || new Date()) : (filters.dateTo || new Date())}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                if (datePickerMode === 'from') {
                                    setFilters({
                                        ...filters,
                                        when: 'custom',
                                        dateFrom: selectedDate
                                    });
                                } else {
                                    setFilters({
                                        ...filters,
                                        when: 'custom',
                                        dateTo: selectedDate
                                    });
                                }
                            }
                        }}
                    />
                )
            )}
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        height: '85%',
        padding: 20,
        paddingBottom: 40,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: Colors.light.text,
    },
    resetButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
    },
    resetText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
    },
    content: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.light.text,
        marginBottom: 12,
        marginTop: 12,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    horizontalScroll: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    chip: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#F9FAFB',
        borderRadius: 20,
        marginRight: 8,
    },
    activeChip: {
        backgroundColor: '#34D399', // Greenish color from screenshot
    },
    chipText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
    },
    activeChipText: {
        color: 'white',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
    },
    applyButton: {
        backgroundColor: '#34D399',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#34D399',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    applyButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    dateRangeRow: {
        flexDirection: 'row',
        gap: 12,
    },
    datePickerCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        gap: 8,
        
    },
    dateRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    dateChip: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#F9FAFB',
        borderRadius: 20,
        alignItems: 'center',
    },
    datePickerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 6,
    },
    datePickerLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.light.text,
    },
    iosDatePickerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iosDatePickerContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    iosDatePickerHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    iosDatePickerDone: {
        color: Colors.light.primary,
        fontWeight: '600',
        fontSize: 16,
    },
    iosDatePicker: {
        height: 320,
    },
});
