import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Brand } from '../../constants/brand';

interface EventDescriptionProps {
    description: string;
}

export const EventDescription: React.FC<EventDescriptionProps> = ({ description }) => {
    if (!description) return null;

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Beschreibung</Text>
            <View style={styles.descriptionCard}>
                <Text style={styles.descriptionText}>{description}</Text>
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
    descriptionCard: {
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.card,
        padding: Brand.spacing.xl,
        ...Brand.shadows.sm,
    },
    descriptionText: {
        fontFamily: Brand.typography.headings.body.fontFamily,
        fontSize: Brand.typography.headings.body.fontSize,
        lineHeight: 22,
        color: Brand.theme.light.text,
    },
});
