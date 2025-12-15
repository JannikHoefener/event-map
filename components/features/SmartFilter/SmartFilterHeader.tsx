import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import { Brand } from '../../../constants/brand';

interface SmartFilterHeaderProps {
    title: string;
    onClose: () => void;
}

export const SmartFilterHeader: React.FC<SmartFilterHeaderProps> = ({ title, onClose }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <X size={20} color={Brand.theme.light.text} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Brand.spacing.xl,
    },
    title: {
        fontFamily: Brand.typography.headings.h2.fontFamily,
        fontSize: Brand.typography.headings.h2.fontSize,
        fontWeight: Brand.typography.headings.h2.fontWeight,
        letterSpacing: Brand.typography.headings.h2.letterSpacing,
        color: Brand.theme.light.text,
    },
    closeButton: {
        padding: Brand.spacing.sm,
        backgroundColor: Brand.colors.gray[100],
        borderRadius: Brand.radius.chip,
    },
});
