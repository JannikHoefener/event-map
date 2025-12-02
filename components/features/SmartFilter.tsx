import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Calendar, CloudSun, Music, Coffee, Utensils, Palette, Check } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

type FilterStep = 'when' | 'where' | 'what';

interface SmartFilterProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: any) => void;
    initialFilters?: {
        when: string;
        indoor: string;
        categories: string[];
        dateFrom?: Date | null;
        dateTo?: Date | null;
        timeOfDay?: string[];
    };
}

export default function SmartFilter({ visible, onClose, onApply, initialFilters }: SmartFilterProps) {
    const [step, setStep] = useState<FilterStep>('when');
    const [filters, setFilters] = useState(initialFilters || {
        when: 'today', // today, tomorrow, weekend, any
        indoor: 'any', // indoor, outdoor, any
        categories: [] as string[],
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [datePickerMode, setDatePickerMode] = useState<'from' | 'to'>('from');

    React.useEffect(() => {
        if (visible && initialFilters) {
            setFilters(initialFilters);
            setStep('when'); // Reset step to start when reopening
        }
    }, [visible, initialFilters]);

    if (!visible) return null;

    const handleNext = () => {
        if (step === 'when') setStep('where');
        else if (step === 'where') setStep('what');
        else onApply(filters);
    };

    const handleBack = () => {
        if (step === 'what') setStep('where');
        else if (step === 'where') setStep('when');
    };

    const toggleCategory = (cat: string) => {
        setFilters(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };

    const renderStepIndicator = () => (
        <View style={styles.stepIndicator}>
            <View style={[styles.stepDot, step === 'when' && styles.activeDot, (step === 'where' || step === 'what') && styles.completedDot]} />
            <View style={[styles.stepLine, (step === 'where' || step === 'what') && styles.completedLine]} />
            <View style={[styles.stepDot, step === 'where' && styles.activeDot, step === 'what' && styles.completedDot]} />
            <View style={[styles.stepLine, step === 'what' && styles.completedLine]} />
            <View style={[styles.stepDot, step === 'what' && styles.activeDot]} />
        </View>
    );

    return (
        <View style={styles.overlay}>
            <BlurView intensity={40} tint="dark" style={styles.backdrop} />

            <View style={styles.modalContainer}>
                <BlurView intensity={100} tint="light" style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {step === 'when' && 'Wann hast du Zeit?'}
                            {step === 'where' && 'Drinnen oder Draußen?'}
                            {step === 'what' && 'Worauf hast du Lust?'}
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={20} color={Colors.light.text} />
                        </TouchableOpacity>
                    </View>

                    {renderStepIndicator()}

                    {/* Content */}
                    <ScrollView contentContainerStyle={styles.scrollContent}>

                        {/* STEP 1: WHEN */}
                        {step === 'when' && (
                            <>
                                {/* Quick Presets - First Row: Heute, Morgen, Übermorgen */}
                                <View style={styles.dateRow}>
                                    {['today', 'tomorrow', 'dayAfterTomorrow'].map((option) => {
                                        const today = new Date();
                                        const tomorrow = new Date(today);
                                        tomorrow.setDate(tomorrow.getDate() + 1);
                                        const dayAfterTomorrow = new Date(today);
                                        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

                                        const getLabel = () => {
                                            if (option === 'today') return `Heute (${today.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })})`;
                                            if (option === 'tomorrow') return `Morgen (${tomorrow.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })})`;
                                            if (option === 'dayAfterTomorrow') return `Übermorgen (${dayAfterTomorrow.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })})`;
                                            return '';
                                        };

                                        return (
                                            <TouchableOpacity
                                                key={option}
                                                style={[
                                                    styles.dateOptionCard,
                                                    filters.when === option && styles.selectedCard
                                                ]}
                                                onPress={() => {
                                                    setFilters({
                                                        ...filters,
                                                        when: option,
                                                        dateFrom: null,
                                                        dateTo: null
                                                    });
                                                }}
                                            >
                                                <Calendar size={20} color={filters.when === option ? 'white' : Colors.light.primary} />
                                                <Text style={[styles.dateOptionText, filters.when === option && styles.selectedText]}>
                                                    {getLabel()}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>

                                {/* Second Row: Wochenende, Egal */}
                                <View style={styles.optionsGrid}>
                                    {['weekend', 'any'].map((option) => {
                                        const getLabel = () => {
                                            if (option === 'weekend') return 'Wochenende';
                                            return 'Egal';
                                        };

                                        return (
                                            <TouchableOpacity
                                                key={option}
                                                style={[
                                                    styles.optionCard,
                                                    filters.when === option && styles.selectedCard
                                                ]}
                                                onPress={() => {
                                                    setFilters({
                                                        ...filters,
                                                        when: option,
                                                        dateFrom: null,
                                                        dateTo: null
                                                    });
                                                }}
                                            >
                                                <Calendar size={24} color={filters.when === option ? 'white' : Colors.light.primary} />
                                                <Text style={[styles.optionText, filters.when === option && styles.selectedText]}>
                                                    {getLabel()}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>

                                {/* Date Range Selector */}
                                <Text style={styles.dateRangeTitle}>Oder wähle eine Zeitspanne:</Text>
                                <View style={styles.dateRangeRow}>
                                    {/* From Date & Time */}
                                    <TouchableOpacity
                                        style={styles.datePickerCard}
                                        onPress={() => {
                                            setDatePickerMode('from');
                                            setShowDatePicker(true);
                                        }}
                                    >
                                        <View style={styles.datePickerHeader}>
                                            <Calendar size={14} color={Colors.light.primary} />
                                            <Text style={styles.datePickerLabel}>von:</Text>
                                        </View>
                                        <View style={styles.datePicker}>
                                            {filters.dateFrom ? (
                                                <Text style={styles.datePickerText}>
                                                    {filters.dateFrom.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                </Text>
                                            ) : (
                                                <Calendar size={24} color={Colors.light.tabIconDefault} />
                                            )}
                                        </View>
                                    </TouchableOpacity>

                                    {/* To Date & Time */}
                                    <TouchableOpacity
                                        style={styles.datePickerCard}
                                        onPress={() => {
                                            setDatePickerMode('to');
                                            setShowDatePicker(true);
                                        }}
                                    >
                                        <View style={styles.datePickerHeader}>
                                            <Calendar size={14} color={Colors.light.primary} />
                                            <Text style={styles.datePickerLabel}>bis:</Text>
                                        </View>
                                        <View style={styles.datePicker}>
                                            {filters.dateTo ? (
                                                <Text style={styles.datePickerText}>
                                                    {filters.dateTo.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                                </Text>
                                            ) : (
                                                <Calendar size={24} color={Colors.light.tabIconDefault} />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {/* Time of Day Selection */}
                                <Text style={styles.dateRangeTitle}>Tageszeit:</Text>
                                <View style={styles.timeOfDayChips}>
                                    {[
                                        { id: 'morning', label: '🌅 Morgens', time: '06:00-12:00' },
                                        { id: 'afternoon', label: '☀️ Mittags', time: '12:00-18:00' },
                                        { id: 'evening', label: '🌙 Abends', time: '18:00-00:00' }
                                    ].map((timeSlot) => {
                                        const isActive = filters.timeOfDay?.includes(timeSlot.id) || false;
                                        return (
                                            <TouchableOpacity
                                                key={timeSlot.id}
                                                style={[styles.timeOfDayChip, isActive && styles.selectedCategory]}
                                                onPress={() => {
                                                    const currentTimeOfDay = filters.timeOfDay || [];
                                                    const newTimeOfDay = currentTimeOfDay.includes(timeSlot.id)
                                                        ? currentTimeOfDay.filter(t => t !== timeSlot.id)
                                                        : [...currentTimeOfDay, timeSlot.id];
                                                    setFilters({ ...filters, timeOfDay: newTimeOfDay });
                                                }}
                                            >
                                                <Text style={[styles.timeOfDayLabel, isActive && styles.selectedText]}>
                                                    {timeSlot.label}
                                                </Text>
                                                <Text style={[styles.timeOfDayTime, isActive && styles.selectedText]}>
                                                    {timeSlot.time}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </>
                        )}

                        {/* STEP 2: WHERE (Indoor/Outdoor) */}
                        {step === 'where' && (
                            <View style={styles.optionsGrid}>
                                <TouchableOpacity
                                    style={[styles.optionCard, filters.indoor === 'indoor' && styles.selectedCard]}
                                    onPress={() => setFilters({ ...filters, indoor: 'indoor' })}
                                >
                                    <Coffee size={24} color={filters.indoor === 'indoor' ? 'white' : Colors.light.primary} />
                                    <Text style={[styles.optionText, filters.indoor === 'indoor' && styles.selectedText]}>Drinnen</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.optionCard, filters.indoor === 'outdoor' && styles.selectedCard]}
                                    onPress={() => setFilters({ ...filters, indoor: 'outdoor' })}
                                >
                                    <CloudSun size={24} color={filters.indoor === 'outdoor' ? 'white' : Colors.light.primary} />
                                    <Text style={[styles.optionText, filters.indoor === 'outdoor' && styles.selectedText]}>Draußen</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.optionCard, filters.indoor === 'any' && styles.selectedCard]}
                                    onPress={() => setFilters({ ...filters, indoor: 'any' })}
                                >
                                    <Text style={[styles.optionText, filters.indoor === 'any' && styles.selectedText]}>Egal</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* STEP 3: WHAT */}
                        {step === 'what' && (
                            <View style={styles.categoriesGrid}>
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
                                    return (
                                        <TouchableOpacity
                                            key={id}
                                            style={[
                                                styles.categoryChip,
                                                filters.categories.includes(id) && styles.selectedCategory
                                            ]}
                                            onPress={() => toggleCategory(id)}
                                        >
                                            <Text style={[styles.categoryText, filters.categories.includes(id) && styles.selectedText]}>
                                                {cat}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        )}

                    </ScrollView>

                    {/* Footer Actions */}
                    <View style={styles.footer}>
                        {step !== 'when' && (
                            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                                <Text style={styles.backButtonText}>Zurück</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            onPress={handleNext}
                            style={[styles.primaryButton, step === 'when' && { flex: 1 }]}
                        >
                            <Text style={styles.primaryButtonText}>
                                {step === 'what' ? 'Ergebnisse anzeigen' : 'Weiter'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </BlurView>

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
        padding: 16,
        paddingBottom: 40,
    },
    modalContent: {
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.light.text,
    },
    closeButton: {
        padding: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
    },
    stepIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        paddingHorizontal: 40,
    },
    stepDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#E5E7EB',
    },
    activeDot: {
        backgroundColor: Colors.light.primary,
        transform: [{ scale: 1.2 }],
    },
    completedDot: {
        backgroundColor: Colors.light.primary,
    },
    stepLine: {
        flex: 1,
        height: 2,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 4,
    },
    completedLine: {
        backgroundColor: Colors.light.primary,
    },
    scrollContent: {
        paddingVertical: 10,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    dateRow: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    dateOptionCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        gap: 6,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    dateOptionText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.light.text,
        textAlign: 'center',
    },
    optionCard: {
        width: '48%',
        aspectRatio: 1.4,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    selectedCard: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
    optionText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    selectedText: {
        color: 'white',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        gap: 8,
    },
    selectedCategory: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.light.text,
    },
    footer: {
        flexDirection: 'row',
        marginTop: 24,
        gap: 12,
    },
    backButton: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        backgroundColor: '#F3F4F6',
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: Colors.light.text, // Dark button for contrast
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
    dateRangeTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
        marginBottom: 12,
        marginTop: 24,
    },
    dateRangeRow: {
        flexDirection: 'row',
        gap: 12,
    },
    datePickerCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        gap: 8,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    datePickerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    datePickerLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.light.text,
    },
    dateLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: Colors.light.tabIconDefault,
    },
    datePicker: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    datePickerText: {
        fontSize: 13,
        fontWeight: '500',
        color: Colors.light.text,
        textAlign: 'center',
    },
    fullWidthCard: {
        width: '100%',
    },
    timeOfDaySection: {
        marginTop: 24,
    },
    timeOfDayChips: {
        flexDirection: 'row',
        gap: 12,
    },
    timeOfDayChip: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        gap: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    timeOfDayLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
    },
    timeOfDayTime: {
        fontSize: 11,
        fontWeight: '400',
        color: Colors.light.tabIconDefault,
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
