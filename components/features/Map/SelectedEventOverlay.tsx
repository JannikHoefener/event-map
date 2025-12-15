import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Brand } from '../../../constants/brand';
import { Event } from '../../../types';
import { ItemCard } from '../../ui';

interface SelectedEventOverlayProps {
    event: Event;
    onPress: (event: Event) => void;
}

export const SelectedEventOverlay: React.FC<SelectedEventOverlayProps> = ({
    event,
    onPress,
}) => {
    return (
        <View style={styles.eventCardContainer}>
            <BlurView intensity={100} tint="light" style={styles.eventCardWrapper}>
                <ItemCard
                    event={event}
                    compact={true}
                    style={{ elevation: 0, shadowOpacity: 0 }}
                    onPress={() => onPress(event)}
                />
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    eventCardContainer: {
        position: 'absolute',
        bottom: 110, // Above bottom bar
        left: Brand.spacing.lg,
        right: Brand.spacing.lg,
        ...Brand.shadows.xl,
    },
    eventCardWrapper: {
        borderRadius: Brand.radius.xl,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
});
