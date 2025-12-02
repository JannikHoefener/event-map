import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { MapPin, Clock, Euro } from 'lucide-react-native';
import { Colors } from '../../constants/Colors';
import { BlurView } from 'expo-blur';
import ItemCard from '../ui/ItemCard';

interface Event {
    id: string;
    title: string;
    category: string;
    price: string;
    time: string;
    indoor: boolean;
}

interface EventListProps {
    events: Event[];
}

export default function EventList({ events }: EventListProps) {
    const renderItem = ({ item }: { item: Event }) => (
        <View style={{ marginBottom: 16 }}>
            <ItemCard event={item} />
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={events}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    listContent: {
        padding: 16,
        paddingTop: 120, // Space for header
        paddingBottom: 100, // Space for bottom bar
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
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
