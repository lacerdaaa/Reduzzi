import { colors, fontFamily } from '@/styles/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const s = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    logoContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    logo: {
        width: 147,
        height: 44
    },
    inputs: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: colors.white.primary,
        width: '100%',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        fontFamily: fontFamily.regular
    },
    title: {
        fontSize: 32,
        fontFamily: fontFamily.bold,
    },
    loginButton: {
        backgroundColor: "#3b82f6",
        minWidth: "85%",
        paddingVertical: 12,
        paddingHorizontal: 110,
        borderRadius: 8,
        alignItems: "center",
        minHeight: 50,
    },
    loginButtonText: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
        shadowColor: "rgba(55, 93, 251, 1)",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    }

})

export const gradientColors = [
    "rgba(255, 255, 255, 0.8)",
    "rgba(255, 255, 255, 0.5559873949579832)",
    
]