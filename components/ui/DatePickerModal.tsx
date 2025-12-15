import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Brand } from '../../constants/brand';

interface DatePickerModalProps {
    visible: boolean;
    onClose: () => void;
    date: Date;
    onChange: (event: any, date?: Date) => void;
    mode?: 'date' | 'time' | 'datetime';
}

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
    visible,
    onClose,
    date,
    onChange,
    mode = 'date',
}) => {
    if (Platform.OS === 'ios') {
        return (
            <Modal
                transparent={true}
                animationType="fade"
                visible={visible}
                onRequestClose={onClose}
            >
                <TouchableOpacity
                    style={styles.iosDatePickerOverlay}
                    activeOpacity={1}
                    onPress={onClose}
                >
                    <View
                        style={styles.iosDatePickerContainer}
                        onStartShouldSetResponder={() => true}
                    >
                        <View style={styles.iosDatePickerHeader}>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.iosDatePickerDone}>Fertig</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            value={date}
                            mode={mode}
                            display="inline"
                            onChange={onChange}
                            style={styles.iosDatePicker}
                            themeVariant="light"
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }

    if (!visible) return null;

    return (
        <DateTimePicker
            value={date}
            mode={mode}
            display="default"
            onChange={(event, selectedDate) => {
                onClose();
                onChange(event, selectedDate);
            }}
        />
    );
};

const styles = StyleSheet.create({
    iosDatePickerOverlay: {
        flex: 1,
        backgroundColor: Brand.theme.light.overlayLight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Brand.spacing.xl,
    },
    iosDatePickerContainer: {
        backgroundColor: Brand.colors.white,
        borderRadius: Brand.radius.lg,
        padding: Brand.spacing.lg,
        width: '100%',
        maxWidth: 400,
        ...Brand.shadows.xl,
    },
    iosDatePickerHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: Brand.spacing.sm,
        paddingBottom: Brand.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Brand.colors.gray[100],
    },
    iosDatePickerDone: {
        color: Brand.colors.primary,
        fontWeight: Brand.typography.fontWeight.semibold,
        fontSize: Brand.typography.fontSize.lg,
    },
    iosDatePicker: {
        height: 320,
    },
});
