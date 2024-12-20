import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
    },
    box: {
      alignItems: 'center',
      padding: 20,
      borderRadius: 10,
      width: '30%',
    },
    aprovadas: {
      backgroundColor: 'green',
    },
    analise: {
      backgroundColor: 'yellow',
    },
    negadas: {
      backgroundColor: 'red',
    },
    numero: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
    },
  });
  