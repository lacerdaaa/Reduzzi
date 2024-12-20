import { StyleSheet } from "react-native";
import { colors, fontFamily } from '@/styles/theme'

export const s = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column'
    },
    subContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    avatar: {
        borderRadius: '100%',
        borderWidth: 1,
        borderColor: '#CCC'
    },
    title: {
        fontSize: 20,
        fontFamily: fontFamily.bold,
    },
    subtitle: {
        fontSize: 20,
    },
    amount: {
        fontSize: 70,
    },
})