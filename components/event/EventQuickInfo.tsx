import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Calendar, Clock, Home, Sun, MapPin } from 'lucide-react-native';
import { Brand } from '../../constants/brand';
import { formatDateLong } from '../../utils/dates';
import { Event } from '../../types';
import { getCategoryColor } from '../../data/categories';

const { width } = Dimensions.get('window');

interface EventQuickInfoProps {
    event: Event;
}

export const EventQuickInfo: React.FC<EventQuickInfoProps> = ({ event }) => {
    const categoryColor = getCategoryColor(event.category);

    return (
        <View style={styles.quickInfoGrid}>
            {/* Date Card */}
            <View style={styles.quickInfoCard}>
                <View style={[styles.iconCircle, { backgroundColor: categoryColor + '20' }]}>
                    <Calendar size={20} color={categoryColor} />
                </View>
                <View style={styles.quickInfoText}>
                    <Text style={styles.quickInfoLabel}>Datum</Text>
                    <Text style={styles.quickInfoValue}>
                        {formatDateLong(event.date)}
                    </Text>
                </View>
            </View>

            {/* Time Card */}
            <View style={styles.quickInfoCard}>
                <View style={[styles.iconCircle, { backgroundColor: categoryColor + '20' }]}>
                    <Clock size={20} color={categoryColor} />
                </View>
                <View style={styles.quickInfoText}>
                    <Text style={styles.quickInfoLabel}>Uhrzeit</Text>
                    <Text style={styles.quickInfoValue}>{event.time}</Text>
                </View>
            </View>

            {/* Location Type Card */}
            <View style={styles.quickInfoCard}>
                <View style={[styles.iconCircle, { backgroundColor: categoryColor + '20' }]}>
                    {event.indoor ? (
                        <Home size={20} color={categoryColor} />
                    ) : (
                        <Sun size={20} color={categoryColor} />
                    )}
                </View>
                <View style={styles.quickInfoText}>
                    <Text style={styles.quickInfoLabel}>Ort</Text>
                    <Text style={styles.quickInfoValue}>
                        {event.indoor ? 'Indoor' : 'Outdoor'}
                    </Text>
                </View>
            </View>

            {/* Coordinates Card */}
            <View style={styles.quickInfoCard}>
                <View style={[styles.iconCircle, { backgroundColor: categoryColor + '20' }]}>
                    <MapPin size={20} color={categoryColor} />
                </View>
                <View style={styles.quickInfoText}>
                    <Text style={styles.quickInfoLabel}>Koordinaten</Text>
                    <Text style={styles.quickInfoValue} numberOfLines={1}>
                        {event.coordinate.latitude.toFixed(4)}, {event.coordinate.longitude.toFixed(4)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    quickInfoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.md,
        marginBottom: Brand.spacing.xl,
    },
    quickInfoCard: {
        flex: 1,
        minWidth: (width - Brand.spacing.xl * 2 - Brand.spacing.md) / 2,
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.card,
        padding: Brand.spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: Brand.spacing.md,
        ...Brand.shadows.sm,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quickInfoText: {
        flex: 1,
    },
    quickInfoLabel: {
        fontFamily: Brand.typography.headings.caption.fontFamily,
        fontSize: Brand.typography.fontSize.xs,
        color: Brand.theme.light.tabIconDefault,
        marginBottom: 2,
    },
    quickInfoValue: {
        fontFamily: Brand.typography.headings.label.fontFamily,
        fontSize: Brand.typography.fontSize.sm,
        fontWeight: Brand.typography.fontWeight.semibold,
        color: Brand.theme.light.text,
    },
});
