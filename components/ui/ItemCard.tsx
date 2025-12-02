import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';

interface Event {
    id: string;
    title: string;
    category: string;
    price: string;
    time: string;
    indoor: boolean;
}

interface ItemCardProps {
    event: Event;
    onPress?: () => void;
    style?: ViewStyle;
    compact?: boolean;
}

export default function ItemCard({ event, onPress, style, compact = false }: ItemCardProps) {
    return (
        <TouchableOpacity
            style={[styles.card, compact && styles.compactCard, style]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            {!compact && (
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.categoryBadge}>{event.category}</Text>
                </View>
            )}

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
                    <Text style={styles.price}>{event.price}</Text>
                </View>

                <View style={styles.details}>
                    <View style={styles.detailRow}>
                        <Clock size={14} color={Colors.light.tabIconDefault} />
                        <Text style={styles.detailText}>{event.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <MapPin size={14} color={Colors.light.tabIconDefault} />
                        <Text style={styles.detailText}>{event.indoor ? 'Indoor' : 'Outdoor'}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    compactCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagePlaceholder: {
        height: 120,
        backgroundColor: '#E5E7EB',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: 12,
    },
    categoryBadge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        padding: 16,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.light.text,
        flex: 1,
        marginRight: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.primary,
    },
    details: {
        flexDirection: 'row',
        gap: 16,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    detailText: {
        fontSize: 14,
        color: Colors.light.tabIconDefault,
    },
});
