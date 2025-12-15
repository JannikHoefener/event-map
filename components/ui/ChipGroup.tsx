/**
 * ChipGroup Component
 * 
 * Container für eine Gruppe von Chips mit flexiblem Layout.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Brand } from '../../constants/brand';
import Chip from './Chip';

interface ChipItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
}

interface ChipGroupProps {
    items: ChipItem[];
    selectedIds: string[];
    onSelect: (id: string) => void;
    style?: ViewStyle;
    chipStyle?: ViewStyle;
    multiSelect?: boolean;
    layout?: 'wrap' | 'row' | 'grid';
    gap?: number;
}

export default function ChipGroup({
    items,
    selectedIds,
    onSelect,
    style,
    chipStyle,
    multiSelect = true,
    layout = 'wrap',
    gap = Brand.spacing.sm,
}: ChipGroupProps) {
    const handlePress = (id: string) => {
        onSelect(id);
    };

    const layoutStyles = {
        wrap: styles.wrapLayout,
        row: styles.rowLayout,
        grid: styles.gridLayout,
    };

    return (
        <View style={[layoutStyles[layout], { gap }, style]}>
            {items.map((item) => (
                <Chip
                    key={item.id}
                    label={item.label}
                    icon={item.icon}
                    active={selectedIds.includes(item.id)}
                    onPress={() => handlePress(item.id)}
                    style={{
                        ...(layout === 'grid' ? styles.gridItem : {}),
                        ...chipStyle,
                    }}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapLayout: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    rowLayout: {
        flexDirection: 'row',
    },
    gridLayout: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItem: {
        flex: 1,
        minWidth: '30%',
    },
});
