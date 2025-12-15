/**
 * Event Detail Screen
 * 
 * Zeigt alle Details eines einzelnen Events an.
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams } from 'expo-router';

import { Brand } from '../../constants/brand';
import { MOCK_EVENTS } from '../../data/mockEvents';

import { EventHeader } from '../../components/event/EventHeader';
import { EventTitle } from '../../components/event/EventTitle';
import { EventQuickInfo } from '../../components/event/EventQuickInfo';
import { EventDescription } from '../../components/event/EventDescription';
import { EventDetailsInfo } from '../../components/event/EventDetailsInfo';
import { EventError } from '../../components/event/EventError';

export default function EventDetailScreen() {
    const params = useLocalSearchParams();
    const eventId = params.id as string;

    // Find event from mock data
    const event = MOCK_EVENTS.find((e) => e.id === eventId);

    // If event not found, show error
    if (!event) {
        return <EventError />;
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            <EventHeader category={event.category} />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <EventTitle title={event.title} price={event.price} />

                <EventQuickInfo event={event} />

                <EventDescription description={event.description || ''} />

                <EventDetailsInfo event={event} />

                {/* Bottom Spacing */}
                <View style={{ height: Brand.spacing.huge }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Brand.colors.gray[50],
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Brand.spacing.xl,
        paddingTop: Brand.spacing.xl,
    },
});
