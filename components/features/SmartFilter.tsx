import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Calendar, CloudSun, Music, Coffee, Utensils, Palette, Check } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';

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
    };
}

export default function SmartFilter({ visible, onClose, onApply, initialFilters }: SmartFilterProps) {
    const [step, setStep] = useState<FilterStep>('when');
    const [filters, setFilters] = useState(initialFilters || {
        when: 'today', // today, tomorrow, weekend, any
        indoor: 'any', // indoor, outdoor, any
        categories: [] as string[],
    });

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
                            <View style={styles.optionsGrid}>
                                {['today', 'tomorrow', 'weekend', 'any'].map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.optionCard,
                                            filters.when === option && styles.selectedCard
                                        ]}
                                        onPress={() => setFilters({ ...filters, when: option })}
                                    >
                                        <Calendar size={24} color={filters.when === option ? 'white' : Colors.light.primary} />
                                        <Text style={[styles.optionText, filters.when === option && styles.selectedText]}>
                                            {option === 'today' && 'Heute'}
                                            {option === 'tomorrow' && 'Morgen'}
                                            {option === 'weekend' && 'Wochenende'}
                                            {option === 'any' && 'Egal'}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
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
                                    { id: 'music', label: 'Musik', icon: Music },
                                    { id: 'food', label: 'Essen', icon: Utensils },
                                    { id: 'art', label: 'Kunst', icon: Palette },
                                    { id: 'party', label: 'Party', icon: Music }, // Reusing Music for now
                                ].map((cat) => (
                                    <TouchableOpacity
                                        key={cat.id}
                                        style={[
                                            styles.categoryChip,
                                            filters.categories.includes(cat.id) && styles.selectedCategory
                                        ]}
                                        onPress={() => toggleCategory(cat.id)}
                                    >
                                        <cat.icon size={16} color={filters.categories.includes(cat.id) ? 'white' : Colors.light.text} />
                                        <Text style={[styles.categoryText, filters.categories.includes(cat.id) && styles.selectedText]}>
                                            {cat.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
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
});
