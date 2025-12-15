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
import { getCategoryColor, getCategoryLabel, getCategoryEmoji } from '../../data/categories';

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
    const categoryColor = getCategoryColor(event.category);
    const categoryEmoji = getCategoryEmoji(event.category);

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
            {/* Compact Mode: Colored Icon Box */}
            {compact && (
                <View style={[
                    styles.compactIconContainer,
                    { backgroundColor: categoryColor + '15' } // 15% opacity
                ]}>
                    <Text style={styles.compactEmoji}>
                        {categoryEmoji}
                    </Text>
                </View>
            )}

            {/* Image Placeholder (nur in voller Ansicht) */}
            {!compact && (
                <View style={[
                    styles.imagePlaceholder,
                    { backgroundColor: categoryColor + '15' }
                ]}>
                    {/* Large Emoji Icon */}
                    <Text style={styles.emojiIcon}>
                        {categoryEmoji}
                    </Text>

                    {/* Category Badge */}
                    <Text style={[
                        styles.categoryBadge,
                        { backgroundColor: categoryColor }
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
        paddingLeft: Brand.spacing.md, // Add padding left for the icon container
    },
    compactIconContainer: {
        width: 56,
        height: 56,
        borderRadius: Brand.radius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Brand.spacing.xs, // Space to content
    },
    compactEmoji: {
        fontSize: 28,
    },
    imagePlaceholder: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Brand.spacing.md,
        position: 'relative',
    },
    emojiIcon: {
        fontSize: 48,
        marginBottom: Brand.spacing.sm,
    },
    categoryBadge: {
        position: 'absolute',
        bottom: Brand.spacing.md,
        left: Brand.spacing.md,
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
