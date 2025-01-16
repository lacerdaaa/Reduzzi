import { StyleSheet } from "react-native";

  export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bottomSheetContent: {
    backgroundColor: "#fff",
    padding: 16,
    height: 450,
  },
  obraItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  obraTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    marginTop: 4,
  },
  pendente: {
    color: "orange",
  },
  aprovado: {
    color: "green",
  },
  negado: {
    color: "red",
  },
});