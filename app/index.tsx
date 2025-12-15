/**
 * Home Screen (Refactored)
 * 
 * Hauptbildschirm der Event-Map App mit Karten- und Listenansicht.
 */

import React, { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Filter, List, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';

// Brand & Config
import { Brand } from '../constants/brand';

// Types
import { Event, ActiveFilters, ViewMode, DEFAULT_FILTERS } from '../types';

// Data
import { MOCK_EVENTS, DEFAULT_LOCATION } from '../data/mockEvents';

// Utils
import { filterEvents } from '../utils/filters';

// Components
import SmartFilter from '../components/features/SmartFilter';
import FilterModal from '../components/features/FilterModal';
import EventList from '../components/features/EventList';
import { ActionBar } from '../components/ui';
import { EventMap } from '../components/features/Map/EventMap';
import { HomeHeader } from '../components/features/Home/HomeHeader';
import { SelectedEventOverlay } from '../components/features/Map/SelectedEventOverlay';
import { NoResultsOverlay } from '../components/ui/NoResultsOverlay';

export default function HomeScreen() {
    // State
    const [viewMode, setViewMode] = useState<ViewMode>('map');
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [isAgentVisible, setIsAgentVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>(DEFAULT_FILTERS);
    const [isWhenExpanded, setIsWhenExpanded] = useState(false);

    // Filtered Events
    const filteredEvents = useMemo(() => {
        return filterEvents(MOCK_EVENTS, activeFilters);
    }, [activeFilters]);

    // Handlers
    const handleApplyFilters = (newFilters: ActiveFilters) => {
        setActiveFilters(newFilters);
        setIsFilterModalVisible(false);
        setIsAgentVisible(false);
    };

    const handleMarkerPress = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleMapPress = () => {
        setSelectedEvent(null);
    };

    const handleEventPress = (event: Event) => {
        router.push(`/event/${event.id}`);
    };

    const handleSelectPreset = (presetId: string) => {
        setActiveFilters(prev => ({
            ...prev,
            when: prev.when === presetId ? 'any' : presetId as any,
            dateFrom: null,
            dateTo: null,
        }));
    };

    // Action Bar Items
    const actionBarItems = [
        {
            icon: <Filter size={20} color={Brand.theme.light.text} />,
            label: 'Filter',
            onPress: () => setIsFilterModalVisible(true),
        },
        {
            icon: viewMode === 'map'
                ? <List size={20} color={Brand.theme.light.text} />
                : <MapPin size={20} color={Brand.theme.light.text} />,
            label: viewMode === 'map' ? 'Liste' : 'Karte',
            onPress: () => setViewMode(viewMode === 'map' ? 'list' : 'map'),
        },
    ];

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Main Content: Map or List */}
            {viewMode === 'map' ? (
                <EventMap
                    events={filteredEvents}
                    onMapPress={handleMapPress}
                    onMarkerPress={handleMarkerPress}
                />
            ) : (
                <EventList events={filteredEvents} onEventPress={handleEventPress} />
            )}

            {/* Top Bar / Header Area */}
            <HomeHeader
                locationName={DEFAULT_LOCATION.name}
                activeFilters={activeFilters}
                isWhenExpanded={isWhenExpanded}
                onToggleWhen={() => setIsWhenExpanded(!isWhenExpanded)}
                onAgentPress={() => setIsAgentVisible(true)}
                onSelectPreset={handleSelectPreset}
            />

            {/* Bottom Action Bar */}
            <ActionBar actions={actionBarItems} />

            {/* Selected Event Card */}
            {selectedEvent && viewMode === 'map' && (
                <SelectedEventOverlay
                    event={selectedEvent}
                    onPress={handleEventPress}
                />
            )}

            {/* No Results Overlay */}
            {filteredEvents.length === 0 && (
                <NoResultsOverlay onAdjustFilters={() => setIsFilterModalVisible(true)} />
            )}

            {/* Smart Filter (Agent) */}
            <SmartFilter
                visible={isAgentVisible}
                onClose={() => setIsAgentVisible(false)}
                onApply={handleApplyFilters}
                initialFilters={activeFilters}
            />

            {/* Manual Filter Modal */}
            <FilterModal
                visible={isFilterModalVisible}
                onClose={() => setIsFilterModalVisible(false)}
                onApply={handleApplyFilters}
                initialFilters={activeFilters}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Brand.colors.white,
    },
});
