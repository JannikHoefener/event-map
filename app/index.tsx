/**
 * Home Screen (Refactored)
 * 
 * Hauptbildschirm der Event-Map App mit Karten- und Listenansicht.
 */

import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, List, Filter, Navigation, Sparkles, X, ChevronDown, ChevronUp } from 'lucide-react-native';
import { router } from 'expo-router';

// Brand & Config
import { Brand } from '../constants/brand';

// Types
import { Event, ActiveFilters, ViewMode, DEFAULT_FILTERS, WhenFilter } from '../types';

// Data
import { MOCK_EVENTS, DEFAULT_MAP_REGION, DEFAULT_LOCATION } from '../data/mockEvents';
import { getCategoryColor, DAY_PRESETS } from '../data/categories';

// Utils
import { filterEvents } from '../utils/filters';

// Components
import SmartFilter from '../components/features/SmartFilter';
import FilterModal from '../components/features/FilterModal';
import EventList from '../components/features/EventList';
import { ItemCard, LocationPill, ActionBar, Chip, Button } from '../components/ui';

const { width, height } = Dimensions.get('window');

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

    // Get Filter Display Text
    const getWhenDisplayText = () => {
        switch (activeFilters.when) {
            case 'today': return 'Heute';
            case 'tomorrow': return 'Morgen';
            case 'weekend': return 'Wochenende';
            default: return 'Wann?';
        }
    };

    const getIndoorDisplayText = () => {
        switch (activeFilters.indoor) {
            case 'indoor': return 'Drinnen';
            case 'outdoor': return 'Draußen';
            default: return 'Drinnen/Draußen?';
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Main Content: Map or List */}
            {viewMode === 'map' ? (
                <MapView
                    style={styles.map}
                    provider={PROVIDER_DEFAULT}
                    initialRegion={DEFAULT_MAP_REGION}
                    onPress={handleMapPress}
                >
                    {filteredEvents.map((event) => (
                        <Marker
                            key={event.id}
                            coordinate={event.coordinate}
                            onPress={(e) => {
                                e.stopPropagation();
                                handleMarkerPress(event);
                            }}
                        >
                            <View style={styles.markerContainer}>
                                <View
                                    style={[
                                        styles.markerBubble,
                                        {
                                            backgroundColor: getCategoryColor(event.category),
                                        },
                                    ]}
                                >
                                    <MapPin size={16} color="white" />
                                </View>
                                <View style={styles.markerArrow} />
                            </View>
                        </Marker>
                    ))}
                </MapView>
            ) : (
                <EventList events={filteredEvents} onEventPress={handleEventPress} />
            )}

            {/* Top Bar / Header Area */}
            <SafeAreaView style={styles.topContainer} pointerEvents="box-none">
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: Brand.spacing.xs }}>
                        {/* Location Pill */}
                        <LocationPill
                            icon={<Navigation size={16} color={Brand.theme.light.text} />}
                            text={DEFAULT_LOCATION.name}
                        />

                        {/* Wann Filter Pill with Toggle */}
                        <TouchableOpacity
                            style={[
                                styles.whenFilterPill,
                                activeFilters.when !== 'any' && styles.activeFilterChip,
                            ]}
                            onPress={() => setIsWhenExpanded(!isWhenExpanded)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    activeFilters.when !== 'any' && styles.activeFilterText,
                                ]}
                            >
                                {getWhenDisplayText()}
                            </Text>
                            {isWhenExpanded ? (
                                <ChevronUp size={16} color={activeFilters.when !== 'any' ? 'white' : Brand.theme.light.text} />
                            ) : (
                                <ChevronDown size={16} color={activeFilters.when !== 'any' ? 'white' : Brand.theme.light.text} />
                            )}
                        </TouchableOpacity>
                    </View>
                    {/* Agent Button */}
                    <TouchableOpacity
                        style={styles.agentButton}
                        onPress={() => setIsAgentVisible(true)}
                    >
                        <LinearGradient
                            colors={Brand.colors.agentGradient}
                            style={styles.agentGradient}
                        >
                            <Sparkles size={20} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Expandable Day Chips */}
                {isWhenExpanded && (
                    <View style={styles.expandedDayChips}>
                        {DAY_PRESETS.main.map((day) => (
                            <Chip
                                key={day.id}
                                label={day.label}
                                active={activeFilters.when === day.id}
                                onPress={() => {
                                    setActiveFilters(prev => ({
                                        ...prev,
                                        when: prev.when === day.id ? 'any' : day.id,
                                        dateFrom: null,
                                        dateTo: null,
                                    }));
                                }}
                            />
                        ))}
                    </View>
                )}
            </SafeAreaView>

            {/* Bottom Action Bar */}
            <ActionBar actions={actionBarItems} />

            {/* Selected Event Card */}
            {selectedEvent && viewMode === 'map' && (
                <View style={styles.eventCardContainer}>
                    <BlurView intensity={100} tint="light" style={styles.eventCardWrapper}>
                        <ItemCard
                            event={selectedEvent}
                            compact={true}
                            style={{ elevation: 0, shadowOpacity: 0 }}
                            onPress={() => handleEventPress(selectedEvent)}
                        />
                    </BlurView>
                </View>
            )}

            {/* No Results Overlay */}
            {filteredEvents.length === 0 && (
                <View style={styles.noResultsContainer}>
                    <BlurView intensity={90} tint="light" style={styles.noResultsBlur}>
                        <View style={styles.noResultsContent}>
                            <View style={styles.noResultsIconCircle}>
                                <Filter size={32} color={Brand.colors.primary} />
                            </View>
                            <Text style={styles.noResultsTitle}>Keine Events gefunden</Text>
                            <Text style={styles.noResultsText}>
                                Leider passen keine Events zu deinen aktuellen Filtern.
                                Versuch es doch mal mit weniger Einschränkungen.
                            </Text>
                            <Button
                                label="Filter anpassen"
                                onPress={() => setIsFilterModalVisible(true)}
                                variant="primary"
                                fullWidth
                            />
                        </View>
                    </BlurView>
                </View>
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
    map: {
        width: width,
        height: height,
        ...StyleSheet.absoluteFillObject,
    },
    topContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Brand.spacing.lg,
        paddingTop: Platform.OS === 'android' ? Brand.spacing.huge : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Brand.spacing.md,
        gap: Brand.spacing.sm,
    },
    whenFilterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Brand.spacing.xs,
        paddingHorizontal: Brand.spacing.lg,
        paddingVertical: Brand.spacing.md,
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.pill,
        ...Brand.shadows.md,
    },
    agentButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        ...Brand.shadows.lg,
    },
    agentGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    expandedDayChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.sm,
        marginTop: Brand.spacing.md,
    },
    quickFilters: {
        flexDirection: 'row',
        marginTop: Brand.spacing.lg,
    },
    filterChip: {
        paddingHorizontal: Brand.spacing.xl,
        paddingVertical: Brand.spacing.md,
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.pill,
        ...Brand.shadows.md,
    },
    activeFilterChip: {
        backgroundColor: Brand.colors.primary,
    },
    filterText: {
        fontFamily: Brand.typography.headings.label.fontFamily,
        fontSize: Brand.typography.headings.label.fontSize,
        fontWeight: Brand.typography.headings.label.fontWeight,
        color: Brand.theme.light.text,
    },
    activeFilterText: {
        color: Brand.colors.white,
    },
    markerContainer: {
        alignItems: 'center',
    },
    markerBubble: {
        padding: Brand.spacing.sm,
        borderRadius: Brand.radius.chip,
        borderWidth: 2,
        borderColor: Brand.colors.white,
    },
    markerArrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: Brand.colors.white,
        marginTop: -2,
    },
    eventCardContainer: {
        position: 'absolute',
        bottom: 110, // Above bottom bar
        left: Brand.spacing.lg, // Reduced margins
        right: Brand.spacing.lg,
        ...Brand.shadows.xl,
    },
    eventCardWrapper: {
        borderRadius: Brand.radius.xl,
        overflow: 'hidden',
        // Removed padding to let the card fill the space
        backgroundColor: 'transparent', // Let ItemCard background show
    },
    noResultsContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        padding: Brand.spacing.xl,
    },
    noResultsBlur: {
        width: '100%',
        maxWidth: 340,
        borderRadius: Brand.radius.xl,
        overflow: 'hidden',
        ...Brand.shadows.lg,
    },
    noResultsContent: {
        padding: Brand.spacing.xl,
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    noResultsIconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: Brand.colors.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Brand.spacing.lg,
    },
    noResultsTitle: {
        fontFamily: Brand.typography.headings.h3.fontFamily,
        fontSize: Brand.typography.headings.h3.fontSize,
        fontWeight: Brand.typography.headings.h3.fontWeight,
        color: Brand.theme.light.text,
        marginBottom: Brand.spacing.sm,
        textAlign: 'center',
    },
    noResultsText: {
        fontFamily: Brand.typography.headings.body.fontFamily,
        fontSize: Brand.typography.headings.body.fontSize,
        color: Brand.theme.light.textSecondary,
        textAlign: 'center',
        marginBottom: Brand.spacing.xl,
        lineHeight: 20,
    },
});
