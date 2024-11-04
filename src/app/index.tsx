import { LoginComponent } from "@/src/components/login";
import { Text, View } from "react-native";
import { RegisterComponent } from "../components/register";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginComponent/>
    </View>
  );
}
