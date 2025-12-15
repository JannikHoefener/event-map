import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { MapPin } from 'lucide-react-native';
import { Brand } from '../../../constants/brand';
import { Event } from '../../../types';
import { getCategoryColor } from '../../../data/categories';
import { DEFAULT_MAP_REGION } from '../../../data/mockEvents';

interface EventMapProps {
    events: Event[];
    onMapPress: () => void;
    onMarkerPress: (event: Event) => void;
    style?: object;
}

export const EventMap: React.FC<EventMapProps> = ({
    events,
    onMapPress,
    onMarkerPress,
    style,
}) => {
    return (
        <MapView
            style={[styles.map, style]}
            provider={PROVIDER_DEFAULT}
            initialRegion={DEFAULT_MAP_REGION}
            onPress={onMapPress}
        >
            {events.map((event) => (
                <Marker
                    key={event.id}
                    coordinate={event.coordinate}
                    onPress={(e) => {
                        e.stopPropagation();
                        onMarkerPress(event);
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
    );
};

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
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
});
