import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { Loading } from "@/components/loaded/index";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s, gradientColors } from "./style";

export function LoginComponent() {
  const navigation = useNavigation<any>();
  const [cpf, setCpf] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!cpf || !phone) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const formattedCpf = cpf.trim();
    const cleanPhone = phone.replace(/[()\s-]/g, "");

    console.log("CPF:", formattedCpf, "Phone:", cleanPhone);
    setLoading(true);

    try {
      const usersRef = collection(db, "users");
      const q = query(
        usersRef,
        where("cpf", "==", formattedCpf),
        where("phone", "==", cleanPhone)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        Alert.alert("Login bem-sucedido!");

        const user = querySnapshot.docs[0].data();
        const userId = querySnapshot.docs[0].id;
        console.log("UserId: ", userId);
        if (rememberMe) {
          await AsyncStorage.setItem("rememberMe", JSON.stringify(true));
          await AsyncStorage.setItem("userId", userId);
        } else {
          await AsyncStorage.removeItem("rememberMe");
          await AsyncStorage.removeItem("userId");
        }
        console.log("User:", user);
        if (user.tipo === "indicador") {
          navigation.replace("Main");
        } else if (user.tipo === "comercial") {
          navigation.replace("MainComercial");
        } else if (user.tipo === "financeiro") {
          navigation.replace("MainFinanceiro");
        } else {
          Alert.alert("Erro", "Tipo de usuário inválido");
        }
      } else {
        Alert.alert(
          "Usuário não encontrado",
          "Verifique se o CPF e o telefone estão corretos e tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      Alert.alert("Erro ao autenticar", "Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoToRegister = () => {
    navigation.replace("Register");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ImageBackground
      source={require("../../assets/Reduzzi-app-background.jpeg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="flex-1 justify-center items-center px-6">
        <View className="rounded-2xl overflow-hidden border border-white h-3/5">
          <LinearGradient
            colors={gradientColors as [string, string]}
            style={s.gradient}
          >
            <View style={s.logoContainer}>
              <Image
                source={require("../../assets/Reduzzi-logo-azul.png")}
                style={s.logo}
                resizeMode="contain"
              />
            </View>
            <View style={s.inputs}>
              <Text style={s.title}>Bem vindo(a)</Text>
              <Text className="text-gray-500 mb-6">
                Insira seus dados e acesse a plataforma
              </Text>

              <TextInput
                className="bg-white rounded-lg w-80 p-4 mb-4"
                placeholder="Digite seu CPF"
                keyboardType="numeric"
                value={cpf}
                onChangeText={setCpf}
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
                placeholderTextColor={"#AAA"}
              />

              <TextInput
                className="bg-white rounded-lg w-80 p-4 mb-4"
                placeholder="Digite seu telefone"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
                placeholderTextColor={"#AAA"}
              />
              <View className="w-full px-8 flex-row justify-between items-center mb-8">
                <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                  <Text className="text-blue-500">
                    {rememberMe ? "✔ Lembrar de mim" : "Lembrar de mim"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text className="text-blue-500">Esqueci minha senha</Text>
                </TouchableOpacity>
              </View>
              <View style={{ alignItems: "center", marginBottom: 16 }}>
                <TouchableOpacity style={s.loginButton} onPress={handleLogin}>
                    {loading ? (
                      <Loading />
                    ) : (
                      <Text style={s.loginButtonText}>Entrar</Text>
                    )}
                </TouchableOpacity>
              </View>
              <View className="flex-col items-center p-2">
                <View>
                  <TouchableOpacity onPress={handleGoToRegister}>
                    <Text className="text-slate-600 text-lx">
                      Não tem conta?
                      <Text className="text-blue-500 text-lx">Criar uma</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>
    </ImageBackground>
  );
}
