import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Brand } from '../../../constants/brand';
import { ActiveFilters } from '../../../types';
import { CATEGORIES, getCategoryColor } from '../../../data/categories';
import { toggleCategory } from '../../../utils/filters';
import { Chip } from '../../ui';

interface StepWhatProps {
    filters: ActiveFilters;
    onUpdateFilters: (updater: (prev: ActiveFilters) => ActiveFilters) => void;
}

export const StepWhat: React.FC<StepWhatProps> = ({ filters, onUpdateFilters }) => {
    const handleToggleCategory = (categoryId: string) => {
        onUpdateFilters(prev => ({
            ...prev,
            categories: toggleCategory(prev.categories, categoryId),
        }));
    };

    return (
        <View style={styles.categoriesGrid}>
            {CATEGORIES.map((cat) => (
                <Chip
                    key={cat.id}
                    label={cat.displayLabel}
                    active={filters.categories.includes(cat.id)}
                    activeColor={getCategoryColor(cat.id)}
                    onPress={() => handleToggleCategory(cat.id)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.md,
    },
});
