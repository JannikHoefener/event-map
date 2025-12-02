import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, List, Filter, Navigation, Sparkles, X } from 'lucide-react-native';
import { Colors } from '../constants/Colors';
import SmartFilter from '../components/features/SmartFilter';
import FilterModal from '../components/features/FilterModal';
import ItemCard from '../components/ui/ItemCard';

const { width, height } = Dimensions.get('window');

// Mock Data for Events
const EVENTS = [
    {
        id: '1',
        title: 'Rooftop Jazz Night',
        coordinate: { latitude: 53.5511, longitude: 9.9937 },
        category: 'Music',
        price: '20€',
        time: 'Tonight, 20:00',
        indoor: true,
    },
    {
        id: '2',
        title: 'Street Food Festival',
        coordinate: { latitude: 53.5561, longitude: 9.9837 },
        category: 'Food',
        price: 'Free',
        time: 'Tomorrow, 12:00',
        indoor: false,
    },
    {
        id: '3',
        title: 'Modern Art Gallery',
        coordinate: { latitude: 53.5461, longitude: 10.0037 },
        category: 'Art',
        price: '15€',
        time: 'Today, 14:00',
        indoor: true,
    },
    {
        id: '4',
        title: 'Techno Bunker',
        coordinate: { latitude: 53.5611, longitude: 9.9637 },
        category: 'Party',
        price: '10€',
        time: 'Tonight, 23:00',
        indoor: true,
    },
    {
        id: '5',
        title: 'Park Yoga',
        coordinate: { latitude: 53.5711, longitude: 10.0137 },
        category: 'Health',
        price: '5€',
        time: 'Tomorrow, 10:00',
        indoor: false,
    },
];

import EventList from '../components/features/EventList';

export default function HomeScreen() {
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [isAgentVisible, setIsAgentVisible] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [activeFilters, setActiveFilters] = useState({
        when: 'any',
        indoor: 'any',
        categories: [] as string[],
    });

    const filteredEvents = useMemo(() => {
        return EVENTS.filter(event => {
            // Filter by Indoor/Outdoor
            if (activeFilters.indoor !== 'any') {
                const isIndoor = activeFilters.indoor === 'indoor';
                if (event.indoor !== isIndoor) return false;
            }

            // Filter by Category (if any selected)
            if (activeFilters.categories.length > 0) {
                // Simple mapping for demo purposes
                const eventCat = event.category.toLowerCase();
                // Check if any selected category matches
                const matches = activeFilters.categories.some(cat =>
                    (cat === 'music' && (eventCat === 'music' || eventCat === 'party')) ||
                    (cat === 'food' && eventCat === 'food') ||
                    (cat === 'art' && eventCat === 'art')
                );
                if (!matches) return false;
            }

            return true;
        });
    }, [activeFilters]);

    const handleApplyFilters = (newFilters: any) => {
        setActiveFilters(newFilters);
        setIsFilterModalVisible(false);
        setIsAgentVisible(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />

            {/* Main Content: Map or List */}
            {viewMode === 'map' ? (
                <MapView
                    style={styles.map}
                    provider={PROVIDER_DEFAULT}
                    initialRegion={{
                        latitude: 53.5511,
                        longitude: 9.9937,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    onPress={() => setSelectedEvent(null)}
                >
                    {filteredEvents.map((event) => (
                        <Marker
                            key={event.id}
                            coordinate={event.coordinate}
                            onPress={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                            }}
                        >
                            <View style={styles.markerContainer}>
                                <View style={[styles.markerBubble, { backgroundColor: event.indoor ? Colors.light.primary : Colors.light.secondary }]}>
                                    <MapPin size={16} color="white" />
                                </View>
                                <View style={styles.markerArrow} />
                            </View>
                        </Marker>
                    ))}
                </MapView>
            ) : (
                <EventList events={filteredEvents} />
            )}

            {/* Top Bar / Header Area */}
            <SafeAreaView style={styles.topContainer} pointerEvents="box-none">
                <View style={styles.header}>
                    <BlurView intensity={80} tint="light" style={styles.locationPill}>
                        <Navigation size={16} color={Colors.light.text} />
                        <Text style={styles.locationText}>Hamburg, DE</Text>
                    </BlurView>

                    <TouchableOpacity
                        style={styles.agentButton}
                        onPress={() => setIsAgentVisible(true)}
                    >
                        <LinearGradient
                            colors={[Colors.light.primary, '#8B5CF6']}
                            style={styles.agentGradient}
                        >
                            <Sparkles size={20} color="white" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Smart Filters (Quick Access) */}
                <View style={styles.quickFilters}>
                    <TouchableOpacity
                        style={[styles.filterChip, activeFilters.when !== 'any' && styles.activeFilterChip]}
                        onPress={() => setIsFilterModalVisible(true)}
                    >
                        <Text style={[styles.filterText, activeFilters.when !== 'any' && styles.activeFilterText]}>
                            {activeFilters.when === 'today' ? 'Heute' :
                                activeFilters.when === 'tomorrow' ? 'Morgen' :
                                    activeFilters.when === 'weekend' ? 'Wochenende' : 'Wann?'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.filterChip, { marginLeft: 8 }, activeFilters.indoor !== 'any' && styles.activeFilterChip]}
                        onPress={() => setIsFilterModalVisible(true)}
                    >
                        <Text style={[styles.filterText, activeFilters.indoor !== 'any' && styles.activeFilterText]}>
                            {activeFilters.indoor === 'indoor' ? 'Drinnen' :
                                activeFilters.indoor === 'outdoor' ? 'Draußen' : 'Drinnen/Draußen?'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomContainer} pointerEvents="box-none">
                <BlurView intensity={90} tint="light" style={styles.bottomBar}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setIsFilterModalVisible(true)}
                    >
                        <Filter size={20} color={Colors.light.text} />
                        <Text style={styles.actionText}>Filter</Text>
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                    >
                        {viewMode === 'map' ? (
                            <List size={20} color={Colors.light.text} />
                        ) : (
                            <MapPin size={20} color={Colors.light.text} />
                        )}
                        <Text style={styles.actionText}>{viewMode === 'map' ? 'Liste' : 'Karte'}</Text>
                    </TouchableOpacity>
                </BlurView>
            </View>

            {/* Selected Event Card (Bottom Sheet style) */}
            {selectedEvent && viewMode === 'map' && (
                <View style={styles.eventCardContainer}>
                    <BlurView intensity={100} tint="light" style={styles.eventCardWrapper}>
                        <View style={styles.eventCardHeader}>
                            <View style={styles.handle} />
                            <TouchableOpacity
                                onPress={() => setSelectedEvent(null)}
                                style={styles.closeCardButton}
                            >
                                <X size={20} color={Colors.light.tabIconDefault} />
                            </TouchableOpacity>
                        </View>
                        <ItemCard
                            event={selectedEvent}
                            compact={true}
                            style={{ elevation: 0, shadowOpacity: 0 }}
                        />
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
        backgroundColor: '#fff',
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
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    locationPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
        overflow: 'hidden',
        gap: 8,
        backgroundColor: 'rgba(255,255,255,0.7)',
    },
    locationText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    agentButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    agentGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quickFilters: {
        flexDirection: 'row',
        marginTop: 16,
    },
    filterChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.light.text,
    },
    activeFilterChip: {
        backgroundColor: Colors.light.primary,
    },
    activeFilterText: {
        color: 'white',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    bottomBar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 30,
        padding: 6,
        overflow: 'hidden',
        width: '100%',
        maxWidth: 300,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 8,
    },
    actionText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.light.text,
    },
    divider: {
        width: 1,
        height: '60%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        alignSelf: 'center',
    },
    markerContainer: {
        alignItems: 'center',
    },
    markerBubble: {
        padding: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'white',
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
        borderTopColor: 'white',
        marginTop: -2,
    },
    eventCardContainer: {
        position: 'absolute',
        bottom: 110, // Above bottom bar
        left: 20,
        right: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    eventCardWrapper: {
        borderRadius: 20,
        padding: 16,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    eventCardHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#E5E7EB',
        borderRadius: 2,
    },
    closeCardButton: {
        position: 'absolute',
        right: 0,
        top: -4,
        padding: 4,
    },
});
