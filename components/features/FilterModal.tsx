import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Check } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: any) => void;
    initialFilters: {
        when: string;
        indoor: string;
        categories: string[];
    };
}

export default function FilterModal({ visible, onClose, onApply, initialFilters }: FilterModalProps) {
    const [filters, setFilters] = useState(initialFilters);

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
                        <View style={styles.chipContainer}>
                            {['Heute', 'Morgen', 'Mittwoch', 'Donnerstag'].map((day) => {
                                const id = day === 'Heute' ? 'today' : day === 'Morgen' ? 'tomorrow' : day.toLowerCase();
                                const isActive = filters.when === id;
                                return (
                                    <TouchableOpacity
                                        key={day}
                                        style={[styles.chip, isActive && styles.activeChip]}
                                        onPress={() => setFilters({ ...filters, when: isActive ? 'any' : id })}
                                    >
                                        <Text style={[styles.chipText, isActive && styles.activeChipText]}>{day}</Text>
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
                        <Text style={styles.sectionTitle}>Uhrzeit</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
                            {['00:00', '00:30', '01:00', '01:30', '02:00'].map((time) => (
                                <TouchableOpacity key={time} style={styles.chip}>
                                    <Text style={styles.chipText}>{time}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

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
        paddingHorizontal: 16,
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
});
