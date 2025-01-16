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
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Loading } from "@/components/loaded/index";
import { LinearGradient } from "expo-linear-gradient";
import { db } from "./../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { gradientColors } from "./style";
import { colors, fontFamily } from "@/styles/theme";

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
        } else {
          await AsyncStorage.removeItem("rememberMe");
          await AsyncStorage.removeItem("userId");
        }
        await AsyncStorage.setItem("userId", userId);
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
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ImageBackground
        source={require("../../assets/ReduzziLoginBackground.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <LinearGradient
              colors={gradientColors as [string, string]}
              style={styles.gradient}
            >
              <View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/LogoReduzzi.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.inputs}>
                <Text style={styles.title}>Bem vindo(a)</Text>
                <Text style={styles.subtitle}>
                  Insira seus dados e acesse a plataforma
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Digite seu CPF"
                  keyboardType="numeric"
                  value={cpf}
                  onChangeText={setCpf}
                  returnKeyType="done"
                  onSubmitEditing={dismissKeyboard}
                  placeholderTextColor={"#AAA"}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Digite seu telefone"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  returnKeyType="done"
                  onSubmitEditing={dismissKeyboard}
                  placeholderTextColor={"#AAA"}
                />
                <View style={styles.rememberMeContainer}>
                  <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                    <Text style={styles.rememberMeText}>
                      {rememberMe ? "✔ Lembrar de mim" : "Lembrar de mim"}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>
                      Esqueci minha senha
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.loginButtonContainer}>
                  <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    {loading ? (
                      <Loading />
                    ) : (
                      <Text style={styles.loginButtonText}>Entrar</Text>
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.registerContainer}>
                  <TouchableOpacity onPress={handleGoToRegister}>
                    <Text style={styles.registerText}>
                      Não tem conta?{" "}
                      <Text style={styles.registerLinkText}>Criar uma</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    zIndex: -1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "white",
    height: "60%",
    width: "100%",
    
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  inputs: {
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
    textAlign: "center",
    fontFamily: fontFamily.bold,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    padding: 16,
    marginBottom: 16,
  },
  rememberMeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  rememberMeText: {
    color: colors.blue.primary,
  },
  forgotPasswordText: {
    color: colors.blue.primary,
  },
  loginButtonContainer: {
    alignItems: "center",
    marginBottom: 16,
  
  },
  loginButton: {
    backgroundColor: colors.blue.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: "100%",
    height: 50,
  },
  loginButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  registerContainer: {
    alignItems: "center",
    padding: 2,
  },
  registerText: {
    color: "gray",
    fontSize: 12,
  },
  registerLinkText: {
    color: colors.blue.primary,
    fontSize: 16,
  },
});