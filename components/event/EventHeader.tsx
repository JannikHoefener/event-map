import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

import { Brand } from '../../constants/brand';
import { getCategoryColor, getCategoryLabel } from '../../data/categories';

interface EventHeaderProps {
    category: string;
}

export const EventHeader: React.FC<EventHeaderProps> = ({ category }) => {
    const categoryColor = getCategoryColor(category);

    return (
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
                        {getCategoryLabel(category)}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
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
});
