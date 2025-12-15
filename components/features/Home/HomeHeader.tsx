import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Navigation, ChevronDown, ChevronUp, Sparkles } from 'lucide-react-native';
import { Brand } from '../../../constants/brand';
import { ActiveFilters } from '../../../types';
import { LocationPill, Chip } from '../../ui';
import { DAY_PRESETS } from '../../../data/categories';

interface HomeHeaderProps {
    locationName: string;
    activeFilters: ActiveFilters;
    isWhenExpanded: boolean;
    onToggleWhen: () => void;
    onAgentPress: () => void;
    onSelectPreset: (presetId: string) => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
    locationName,
    activeFilters,
    isWhenExpanded,
    onToggleWhen,
    onAgentPress,
    onSelectPreset,
}) => {

    const getWhenDisplayText = () => {
        switch (activeFilters.when) {
            case 'today': return 'Heute';
            case 'tomorrow': return 'Morgen';
            case 'weekend': return 'Wochenende';
            default: return 'Wann?';
        }
    };

    return (
        <SafeAreaView style={styles.topContainer} pointerEvents="box-none">
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: Brand.spacing.xs }}>
                    {/* Location Pill */}
                    <LocationPill
                        icon={<Navigation size={16} color={Brand.theme.light.text} />}
                        text={locationName}
                    />

                    {/* Wann Filter Pill with Toggle */}
                    <TouchableOpacity
                        style={[
                            styles.whenFilterPill,
                            activeFilters.when !== 'any' && styles.activeFilterChip,
                        ]}
                        onPress={onToggleWhen}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                activeFilters.when !== 'any' && styles.activeFilterText,
                            ]}
                        >
                            {getWhenDisplayText()}
                        </Text>
                        {isWhenExpanded ? (
                            <ChevronUp size={16} color={activeFilters.when !== 'any' ? 'white' : Brand.theme.light.text} />
                        ) : (
                            <ChevronDown size={16} color={activeFilters.when !== 'any' ? 'white' : Brand.theme.light.text} />
                        )}
                    </TouchableOpacity>
                </View>
                {/* Agent Button */}
                <TouchableOpacity
                    style={styles.agentButton}
                    onPress={onAgentPress}
                >
                    <LinearGradient
                        colors={Brand.colors.agentGradient}
                        style={styles.agentGradient}
                    >
                        <Sparkles size={20} color="white" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* Expandable Day Chips */}
            {isWhenExpanded && (
                <View style={styles.expandedDayChips}>
                    {DAY_PRESETS.main.map((day: any) => (
                        <Chip
                            key={day.id}
                            label={day.label}
                            active={activeFilters.when === day.id}
                            onPress={() => onSelectPreset(day.id)}
                        />
                    ))}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Brand.spacing.lg,
        paddingTop: Platform.OS === 'android' ? Brand.spacing.huge : 0,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Brand.spacing.md,
        gap: Brand.spacing.sm,
    },
    whenFilterPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Brand.spacing.xs,
        paddingHorizontal: Brand.spacing.lg,
        paddingVertical: Brand.spacing.md,
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.pill,
        ...Brand.shadows.md,
    },
    filterText: {
        fontFamily: Brand.typography.headings.label.fontFamily,
        fontSize: Brand.typography.headings.label.fontSize,
        fontWeight: Brand.typography.headings.label.fontWeight,
        color: Brand.theme.light.text,
    },
    activeFilterChip: {
        backgroundColor: Brand.colors.primary,
    },
    activeFilterText: {
        color: Brand.colors.white,
    },
    agentButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        ...Brand.shadows.lg,
    },
    agentGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    expandedDayChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Brand.spacing.sm,
        marginTop: Brand.spacing.md,
    },
});
