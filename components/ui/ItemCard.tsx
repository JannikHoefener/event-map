/**
 * ItemCard Component
 * 
 * Event-Card für die Anzeige von Events in Liste und auf der Karte.
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';
import { Brand } from '../../constants/brand';
import { Event } from '../../types';
import { getCategoryColor, getCategoryLabel } from '../../data/categories';

interface ItemCardProps {
    event: Event;
    onPress?: () => void;
    style?: ViewStyle;
    compact?: boolean;
}

export default function ItemCard({
    event,
    onPress,
    style,
    compact = false,
}: ItemCardProps) {
    return (
        <TouchableOpacity
            style={[
                styles.card,
                compact && styles.compactCard,
                style,
            ]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            {/* Image Placeholder (nur in voller Ansicht) */}
            {!compact && (
                <View style={styles.imagePlaceholder}>
                    <Text style={[
                        styles.categoryBadge,
                        { backgroundColor: getCategoryColor(event.category) }
                    ]}>
                        {getCategoryLabel(event.category)}
                    </Text>
                </View>
            )}

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={1}>
                        {event.title}
                    </Text>
                    <Text style={styles.price}>{event.price}</Text>
                </View>

                <View style={styles.details}>
                    <View style={styles.detailRow}>
                        <Clock size={14} color={Brand.theme.light.tabIconDefault} />
                        <Text style={styles.detailText}>{event.time}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <MapPin size={14} color={Brand.theme.light.tabIconDefault} />
                        <Text style={styles.detailText}>
                            {event.indoor ? 'Indoor' : 'Outdoor'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.card,
        overflow: 'hidden',
        ...Brand.shadows.md,
    },
    compactCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagePlaceholder: {
        height: 120,
        backgroundColor: Brand.colors.gray[200],
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: Brand.spacing.md,
    },
    categoryBadge: {
        backgroundColor: Brand.colors.accent,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: Brand.radius.sm,
        overflow: 'hidden',
        color: Brand.colors.white,
        fontSize: Brand.typography.fontSize.sm,
        fontWeight: Brand.typography.fontWeight.semibold,
    },
    content: {
        padding: Brand.spacing.lg,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Brand.spacing.sm,
    },
    title: {
        fontFamily: Brand.typography.headings.h4.fontFamily,
        fontSize: Brand.typography.headings.h4.fontSize,
        fontWeight: Brand.typography.headings.h4.fontWeight,
        color: Brand.theme.light.text,
        flex: 1,
        marginRight: Brand.spacing.sm,
    },
    price: {
        fontFamily: Brand.typography.headings.subtitle.fontFamily,
        fontSize: Brand.typography.headings.subtitle.fontSize,
        fontWeight: Brand.typography.headings.subtitle.fontWeight,
        color: Brand.colors.primary,
    },
    details: {
        flexDirection: 'row',
        gap: Brand.spacing.lg,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Brand.spacing.xs,
    },
    detailText: {
        fontFamily: Brand.typography.headings.caption.fontFamily,
        fontSize: Brand.typography.headings.caption.fontSize,
        color: Brand.theme.light.tabIconDefault,
    },
});
