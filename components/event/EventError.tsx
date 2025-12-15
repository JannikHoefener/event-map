import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Brand } from '../../constants/brand';

export const EventError: React.FC = () => {
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
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Brand.colors.gray[50],
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
