import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Filter } from 'lucide-react-native';
import { Brand } from '../../constants/brand';
import Button from './Button';

interface NoResultsOverlayProps {
    onAdjustFilters: () => void;
}

export const NoResultsOverlay: React.FC<NoResultsOverlayProps> = ({ onAdjustFilters }) => {
    return (
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
                        onPress={onAdjustFilters}
                        variant="primary"
                        fullWidth
                    />
                </View>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
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
