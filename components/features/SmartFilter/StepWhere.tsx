import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Coffee, CloudSun } from 'lucide-react-native';
import { Brand } from '../../../constants/brand';
import { ActiveFilters } from '../../../types';
import { OptionCard } from '../../ui';

interface StepWhereProps {
    filters: ActiveFilters;
    onUpdateFilters: (filters: ActiveFilters) => void;
}

export const StepWhere: React.FC<StepWhereProps> = ({ filters, onUpdateFilters }) => {
    return (
        <View style={styles.optionsGrid}>
            <OptionCard
                label="Drinnen"
                icon={<Coffee size={24} color={filters.indoor === 'indoor' ? 'white' : Brand.colors.primary} />}
                selected={filters.indoor === 'indoor'}
                onPress={() => onUpdateFilters({ ...filters, indoor: 'indoor' })}
            />
            <OptionCard
                label="Draußen"
                icon={<CloudSun size={24} color={filters.indoor === 'outdoor' ? 'white' : Brand.colors.primary} />}
                selected={filters.indoor === 'outdoor'}
                onPress={() => onUpdateFilters({ ...filters, indoor: 'outdoor' })}
            />
            <OptionCard
                label="Egal"
                selected={filters.indoor === 'any'}
                onPress={() => onUpdateFilters({ ...filters, indoor: 'any' })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.md,
    },
});
