import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Euro } from 'lucide-react-native';
import { Brand } from '../../constants/brand';

interface EventTitleProps {
    title: string;
    price: string;
}

export const EventTitle: React.FC<EventTitleProps> = ({ title, price }) => {
    return (
        <View style={styles.titleSection}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.priceContainer}>
                <Euro size={20} color={Brand.colors.primary} />
                <Text style={styles.price}>{price}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});
