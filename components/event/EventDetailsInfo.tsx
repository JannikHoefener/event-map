import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Tag, Euro, Home, Sun } from 'lucide-react-native';
import { Brand } from '../../constants/brand';
import { getCategoryLabel } from '../../data/categories';
import { Event } from '../../types';

interface EventDetailsInfoProps {
    event: Event;
}

export const EventDetailsInfo: React.FC<EventDetailsInfoProps> = ({ event }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Event-Details</Text>
            <View style={styles.detailsCard}>
                {/* Category */}
                <View style={styles.detailRow}>
                    <View style={styles.detailIconContainer}>
                        <Tag size={18} color={Brand.theme.light.tabIconDefault} />
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>Kategorie</Text>
                        <Text style={styles.detailValue}>
                            {getCategoryLabel(event.category)}
                        </Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Price */}
                <View style={styles.detailRow}>
                    <View style={styles.detailIconContainer}>
                        <Euro size={18} color={Brand.theme.light.tabIconDefault} />
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>Preis</Text>
                        <Text style={styles.detailValue}>{event.price}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Location Type */}
                <View style={styles.detailRow}>
                    <View style={styles.detailIconContainer}>
                        {event.indoor ? (
                            <Home size={18} color={Brand.theme.light.tabIconDefault} />
                        ) : (
                            <Sun size={18} color={Brand.theme.light.tabIconDefault} />
                        )}
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>Veranstaltungsort</Text>
                        <Text style={styles.detailValue}>
                            {event.indoor ? 'Indoor Event' : 'Outdoor Event'}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        marginBottom: Brand.spacing.xl,
    },
    sectionTitle: {
        fontFamily: Brand.typography.headings.h4.fontFamily,
        fontSize: Brand.typography.headings.h4.fontSize,
        fontWeight: Brand.typography.headings.h4.fontWeight,
        color: Brand.theme.light.text,
        marginBottom: Brand.spacing.md,
    },
    detailsCard: {
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.card,
        padding: Brand.spacing.xl,
        ...Brand.shadows.sm,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Brand.colors.gray[100],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Brand.spacing.md,
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        fontFamily: Brand.typography.headings.caption.fontFamily,
        fontSize: Brand.typography.fontSize.xs,
        color: Brand.theme.light.tabIconDefault,
        marginBottom: 2,
    },
    detailValue: {
        fontFamily: Brand.typography.headings.label.fontFamily,
        fontSize: Brand.typography.fontSize.md,
        fontWeight: Brand.typography.fontWeight.medium,
        color: Brand.theme.light.text,
    },
    divider: {
        height: 1,
        backgroundColor: Brand.colors.gray[200],
        marginVertical: Brand.spacing.lg,
    },
});
