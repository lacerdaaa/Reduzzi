import { colors, fontFamily } from "@/styles/theme";
import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        padding: 16
    },
    registerButton: {
        backgroundColor: "#3B82F6",
        borderRadius: 8,
        width: "100%",
        padding: 16,
        alignItems: "center",
        marginTop: 5,
        marginBottom: 10,
    },
    registerButtonText: {
        color: "white",
        fontSize: 16,
        fontFamily: fontFamily.bold,
    },
    input: {
      minWidth: '80%',
    }
})

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      color: "black",
      padding: 12,
      paddingRight: 30,
      borderRadius: 5,
      height: 50,
      backgroundColor: "white",
      marginBottom: 12,
    },
    inputAndroid: {
      color: "black",
      padding: 12,
      paddingRight: 30,
      borderRadius: 5,
      height: 50,
      backgroundColor: "white",
      marginBottom: 12,
      minWidth: '80%'
    },
    iconContainer: {
      top: 10,
      right: 12,
    },
  });