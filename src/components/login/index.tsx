import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard, ImageBackground, Image } from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export function LoginComponent() {
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log("Usuário:")
    console.log(`CPF: ${cpf}`);
    console.log(`Telefone: ${phone}`);
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
            colors={[
              "rgba(255,255,255,0.7)",
              "rgba(255,255,255,0.4)",
              "rgba(255,255,255,0.7)",
            ]}
            style={{ flex: 1, justifyContent: "center", padding: 16 }}
          >
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Image
                source={require("../../assets/Reduzzi-logo-azul.png")}
                style={{ width: 147, height: 44 }}
                resizeMode="contain"
              />
            </View>

            <View className="flex-1 justify-center items-center">
              <Text className="text-4xl font-bold mb-4">Bem vindo(a)</Text>
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
                <TouchableOpacity
                  style={{
                    backgroundColor: "#3b82f6",
                    width: "100%",
                    paddingVertical: 12,
                    paddingHorizontal: 110,
                    borderRadius: 8,
                    alignItems: "center",
                  }}
                  onPress={handleLogin}
                >
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 1)",
                      "rgba(255, 255, 255, 0.5559873949579832)",
                    ]}
                  ></LinearGradient>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                      fontWeight: "bold",
                      shadowColor: "rgba(55, 93, 251, 1)",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.5,
                      shadowRadius: 5,
                      elevation: 5,
                    }}
                  >
                    Entrar
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-col items-center p-2">
                


                <View>
                  <TouchableOpacity>
                    <Text className="text-slate-600 text-lx">
                      Não tem conta?
                      <Text className="text-blue-500 text-lx"> Criar uma</Text>
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
