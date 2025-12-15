/**
 * EventList Component (Refactored)
 * 
 * Listenansicht für Events.
 */

import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Brand } from '../../constants/brand';
import { Event } from '../../types';
import { ItemCard } from '../ui';

interface EventListProps {
    events: Event[];
    onEventPress?: (event: Event) => void;
}

export default function EventList({ events, onEventPress }: EventListProps) {
    const renderItem = ({ item }: { item: Event }) => (
        <View style={styles.itemWrapper}>
            <ItemCard
                event={item}
                onPress={() => onEventPress?.(item)}
            />
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
        backgroundColor: Brand.colors.gray[50],
    },
    listContent: {
        padding: Brand.spacing.lg,
        paddingTop: 120, // Space for header
        paddingBottom: 100, // Space for bottom bar
    },
    itemWrapper: {
        marginBottom: Brand.spacing.lg,
    },
});
