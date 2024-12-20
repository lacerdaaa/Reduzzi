import { StyleSheet } from "react-native";
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
    button: {
        height: 150,
        width: '85%',
        borderRadius: 0,
    },
    buttonImageBackground: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 24,
        fontFamily: fontFamily.semiBold,
        letterSpacing: 2,
    }
})