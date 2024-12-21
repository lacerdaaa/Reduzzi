import { IndicateButton } from "@/components/home-button";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import Dashboard from "@/components/dashboard";
import { db } from "../../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, fontFamily } from "@/styles/theme";

export default function Home() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        console.log("userId: ", userId);
        if (userId) {
          const userDoc = await getDoc(doc(db, "users", userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const fullName = userData.name;
            const firstName = fullName.split(" ")[0];
            setUserName(firstName);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchName();
  }, []);

  console.log("username: ", userName);
  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <View
        style={{ flexDirection: "column", gap: 0, justifyContent: "center" }}
      >
        <Text style={{ fontFamily: fontFamily.semiBold, fontSize: 40 }}>
          Seja bem vindo,
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.bold,
            color: colors.blue.secundary,
            fontSize: 40,
          }}
        >
          {userName ? `${userName}\n` : "\n"}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          gap: 15,
          justifyContent: "center",
          marginBottom: 25,
        }}
      >
        <Dashboard />
      </View>
      <View
        style={{ flexDirection: "column", gap: 15, justifyContent: "center" }}
      >
        <IndicateButton
          buttonText="Indicar Obra"
          backgroundImage={require("@/assets/indicate-button-background.png")}
          navigateTo="Indicate"
        />
        <IndicateButton
          buttonText="Acompanhar Indicação"
          backgroundImage={require("@/assets/indicate-button-background.png")}
          navigateTo="AcompanharIndicacao"
        />
      </View>
    </SafeAreaView>
  );
}
