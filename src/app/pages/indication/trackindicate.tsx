import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Text } from "react-native";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, fontFamily } from "@/styles/theme";
import Dashboard from "@/components/dashboard";
import TrackComponent from "@/components/trackIndication";

export default function TrackIndication() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Acompanhe suas indicações,</Text>
        <Text style={styles.userName}>{userName ? `${userName}\n` : "\n"}</Text>
      </View>
      <Dashboard />
      <TrackComponent />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: 'center'
  },
  header: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontFamily: fontFamily.semiBold,
    fontSize: 40,
  },
  userName: {
    fontFamily: fontFamily.bold,
    color: colors.blue.secundary,
    fontSize: 40,
    textAlign: "left",  
  },
});