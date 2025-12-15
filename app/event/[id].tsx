/**
 * Event Detail Screen
 * 
 * Zeigt alle Details eines einzelnen Events an.
 */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, router } from 'expo-router';
import {
    ArrowLeft,
    Clock,
    MapPin,
    Calendar,
    Euro,
    Tag,
    Home,
    Sun,
    Moon,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Brand & Config
import { Brand } from '../../constants/brand';

// Types
import { Event } from '../../types';

// Data
import { MOCK_EVENTS } from '../../data/mockEvents';
import { getCategoryColor, getCategoryLabel } from '../../data/categories';

const { width } = Dimensions.get('window');

export default function EventDetailScreen() {
    const params = useLocalSearchParams();
    const eventId = params.id as string;

    // Find event from mock data
    const event = MOCK_EVENTS.find((e) => e.id === eventId);

    // If event not found, show error
    if (!event) {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar style="dark" />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Event nicht gefunden</Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.backButtonText}>Zurück</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('de-DE', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    const categoryColor = getCategoryColor(event.category);

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Header with Gradient */}
            <LinearGradient
                colors={[categoryColor, categoryColor + 'CC', categoryColor + '88']}
                style={styles.headerGradient}
            >
                {/* Back Button */}
                <SafeAreaView edges={['top']}>
                    <TouchableOpacity
                        style={styles.backButtonContainer}
                        onPress={() => router.back()}
                    >
                        <View style={styles.backButtonInner}>
                            <ArrowLeft size={24} color={Brand.colors.white} />
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>

                {/* Category Badge */}
                <View style={styles.headerContent}>
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>
                            {getCategoryLabel(event.category)}
                        </Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Content */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
                <View style={styles.titleSection}>
                    <Text style={styles.title}>{event.title}</Text>
                    <View style={styles.priceContainer}>
                        <Euro size={20} color={Brand.colors.primary} />
                        <Text style={styles.price}>{event.price}</Text>
                    </View>
                </View>

                {/* Quick Info Cards */}
                <View style={styles.quickInfoGrid}>
                    {/* Date Card */}
                    <View style={styles.quickInfoCard}>
                        <View style={[styles.iconCircle, { backgroundColor: categoryColor + '20' }]}>
                            <Calendar size={20} color={categoryColor} />
                        </View>
                        <View style={styles.quickInfoText}>
                            <Text style={styles.quickInfoLabel}>Datum</Text>
                            <Text style={styles.quickInfoValue}>
                                {formatDate(event.date)}
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

                {/* Description Section */}
                {event.description && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Beschreibung</Text>
                        <View style={styles.descriptionCard}>
                            <Text style={styles.descriptionText}>{event.description}</Text>
                        </View>
                    </View>
                )}

                {/* Details Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Event-Details</Text>
                    <View style={styles.detailsCard}>
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
    headerGradient: {
        height: 260,
        paddingTop: Platform.OS === 'android' ? 40 : 0,
    },
    backButtonContainer: {
        paddingHorizontal: Brand.spacing.lg,
        paddingTop: Brand.spacing.md,
    },
    backButtonInner: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    headerContent: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: Brand.spacing.xl,
        paddingBottom: Brand.spacing.xl,
    },
    categoryBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingHorizontal: Brand.spacing.lg,
        paddingVertical: Brand.spacing.sm,
        borderRadius: Brand.radius.pill,
        alignSelf: 'flex-start',
        ...Brand.shadows.sm,
    },
    categoryBadgeText: {
        fontFamily: Brand.typography.headings.label.fontFamily,
        fontSize: Brand.typography.headings.label.fontSize,
        fontWeight: Brand.typography.headings.label.fontWeight,
        color: Brand.theme.light.text,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: Brand.spacing.xl,
        paddingTop: Brand.spacing.xl,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: Brand.spacing.xl,
    },
    title: {
        flex: 1,
        fontFamily: Brand.typography.headings.h2.fontFamily,
        fontSize: Brand.typography.headings.h2.fontSize,
        fontWeight: Brand.typography.headings.h2.fontWeight,
        color: Brand.theme.light.text,
        marginRight: Brand.spacing.md,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Brand.spacing.xs,
        backgroundColor: Brand.colors.primary + '10',
        paddingHorizontal: Brand.spacing.lg,
        paddingVertical: Brand.spacing.sm,
        borderRadius: Brand.radius.pill,
    },
    price: {
        fontFamily: Brand.typography.headings.h4.fontFamily,
        fontSize: Brand.typography.headings.h4.fontSize,
        fontWeight: Brand.typography.headings.h4.fontWeight,
        color: Brand.colors.primary,
    },
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
    descriptionCard: {
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.card,
        padding: Brand.spacing.xl,
        ...Brand.shadows.sm,
    },
    descriptionText: {
        fontFamily: Brand.typography.headings.body.fontFamily,
        fontSize: Brand.typography.headings.body.fontSize,
        lineHeight: 22, // 14 * 1.6 = 22.4, rounded to 22
        color: Brand.theme.light.text,
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Brand.spacing.xl,
    },
    errorText: {
        fontFamily: Brand.typography.headings.h3.fontFamily,
        fontSize: Brand.typography.headings.h3.fontSize,
        color: Brand.theme.light.text,
        marginBottom: Brand.spacing.xl,
    },
    backButton: {
        backgroundColor: Brand.colors.primary,
        paddingHorizontal: Brand.spacing.xl,
        paddingVertical: Brand.spacing.md,
        borderRadius: Brand.radius.pill,
    },
    backButtonText: {
        fontFamily: Brand.typography.headings.label.fontFamily,
        fontSize: Brand.typography.headings.label.fontSize,
        fontWeight: Brand.typography.headings.label.fontWeight,
        color: Brand.colors.white,
    },
});
