import { Image, View, Text } from "react-native";
import { db } from "../../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { s } from "./style";

export default function User() {
  const [user, setUser] = useState<string>("");
  const [mount, setMount] = useState<number>(0);

  async function getUser() {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUser(userData.name);
          setMount(userData.mount);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário: ", error);
      }
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={s.container}>
      <View style={s.subContainer}>
        <Image source={require("@/assets/user.png")} />
        <View>
          <Text>Olá,</Text>
          <Text>{user}</Text>
        </View>
      </View>
      <View>
        <Text>{mount}</Text>
      </View>
    </View>
  );
}
