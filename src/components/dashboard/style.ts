import { StyleSheet } from "react-native";
import { colors, fontFamily } from '@/styles/theme'


export const s = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 20,
    },
    box: {
      alignItems: 'center',
      paddingVertical: 20,
      borderRadius: 10,
      width: '31%',
    },
    aprovadas: {
      backgroundColor: colors.blue.secundary,
    },
    analise: {
      backgroundColor: colors.orange.primary,
    },
    negadas: {
      backgroundColor: colors.red.primary,
    },
    numero: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: colors.white.primary,
    },
    label: {
      fontSize: 16,
      color: colors.white.primary,
      textAlign: 'center',
      fontFamily: fontFamily.bold,
    },
  });
  