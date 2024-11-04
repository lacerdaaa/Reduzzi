import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

export function DashboardComponent() {
  return (
      <View className="flex-1 justify-center items-center px-6">
        <View className="rounded-2xl overflow-hidden border border-white h-3/5">
          <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Image
                source={require("../../assets/Reduzzi-logo-azul.png")}
                style={{ width: 147, height: 44 }}
                resizeMode="contain"
              />
            </View>

            <View className="flex-1 justify-center items-center">
              <Text className="text-4xl font-bold mb-4">Dashboard</Text>
              <Text className="text-gray-500 mb-6">Bem vindo à sua conta</Text>

              <View className="bg-white rounded-lg w-80 p-6 mb-4">
                <Text className="text-2xl font-bold mb-4">Resumo:</Text>
                <Text className="text-lg mb-2">Nome: Fulano de Tal</Text>
                <Text className="text-lg mb-2">CPF: 123.456.789-00</Text>
                <Text className="text-lg mb-2">Telefone: (11) 99999-9999</Text>
              </View>

              <View className="bg-white rounded-lg w-80 p-6 mb-4">
                <Text className="text-2xl font-bold mb-4">
                  Últimas Atividades:
                </Text>
                <Text className="text-lg mb-2">- Indicação: Obra 1</Text>
                <Text className="text-lg mb-2">- Indicação: Obra 2</Text>
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
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    Nova Indicação
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-col items-center p-2">
                <TouchableOpacity>
                  <Text className="text-blue-500 text-lx">Sair</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
  );
}
