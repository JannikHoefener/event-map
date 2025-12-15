/**
 * BottomSheet Component
 * 
 * Wiederverwendbares Bottom Sheet Modal mit Handle und Backdrop.
 */

import React from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    Dimensions,
} from 'react-native';
import { Brand } from '../../constants/brand';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface BottomSheetProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    height?: number | `${number}%`;
    showHandle?: boolean;
    style?: ViewStyle;
    contentStyle?: ViewStyle;
}

export default function BottomSheet({
    visible,
    onClose,
    children,
    height = '85%',
    showHandle = true,
    style,
    contentStyle,
}: BottomSheetProps) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                {/* Backdrop */}
                <TouchableOpacity
                    style={styles.backdrop}
                    onPress={onClose}
                    activeOpacity={1}
                />

                {/* Sheet Container */}
                <View
                    style={[
                        styles.container,
                        typeof height === 'string'
                            ? { height }
                            : { height },
                        style,
                    ]}
                >
                    {showHandle && <View style={styles.handle} />}

                    <View style={[styles.content, contentStyle]}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: Brand.theme.light.overlay,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    container: {
        backgroundColor: Brand.colors.white,
        borderTopLeftRadius: Brand.radius.modal,
        borderTopRightRadius: Brand.radius.modal,
        padding: Brand.spacing.xl,
        paddingBottom: Brand.spacing.huge,
    },
    handle: {
        width: Brand.components.modal.handleWidth,
        height: Brand.components.modal.handleHeight,
        backgroundColor: Brand.components.modal.handleColor,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: Brand.spacing.xl,
    },
    content: {
        flex: 1,
    },
});
