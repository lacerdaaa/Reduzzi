import React, { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, Keyboard, ImageBackground, Image, Alert } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import RNPickerSelect from "react-native-picker-select"


interface State {
  id: number;
  sigla: string;
  nome: string;
}

interface City {
  id: number;
  nome: string;
}

export function RegisterComponent() {

  
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [pixKey, setPixKey] = useState("")
  const [states, setStates] = useState<State[]>([])
  const [selectedState, setSelectedState] = useState<string>("")
  const [cities, setCities] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState<string>("")

  const fetchStates = async () => {
    try {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} ${response.statusText}`)
      }
      const data: State[] = await response.json()
      const statesData = data.map((state) => ({
        id: state.id,
        sigla: state.sigla,
        nome: state.nome,
      }))
      setStates(statesData)
    } catch (error) {
      console.error("Erro ao buscar estados:", error)
      Alert.alert("Erro", "Não foi possível buscar os estados.")
    }
  };

  const fetchCities = async (uf: string) => {
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      )
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} ${response.statusText}`)
      }
      const data: City[] = await response.json()
      const citiesData = data.map((city) => ({
        id: city.id,
        nome: city.nome,
      }));
      setCities(citiesData)
    } catch (error) {
      console.error("Erro ao buscar cidades:", error)
      Alert.alert("Erro", "Não foi possível buscar as cidades.")
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState);
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleRegister = () => {
    console.log("Usuário criado:")
    console.log(`Nome: ${name}`);
    console.log(`CPF: ${cpf}`);
    console.log(`Telefone: ${phone}`);
    console.log(`Email: ${email}`);
    console.log(`Chave PIX: ${pixKey}`);
    console.log(`Estado: ${selectedState}`);
    console.log(`Cidade: ${selectedCity}`);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ImageBackground
      source={require("../../assets/Reduzzi-app-background.jpeg")}
      style={{ flex: 1 }}
      resizeMode="cover"
      className="w-full"
    >
      <View className="flex-1 justify-center items-center px-6">
        <View className="rounded-2xl overflow-hidden border border-white h-4/6">
          <LinearGradient
            colors={[
              "rgba(255,255,255,0.7)",
              "rgba(255,255,255,0.4)",
              "rgba(255,255,255,0.7)",
            ]}
            style={{ flex: 1, justifyContent: "center", padding: 16 }}
          >
            <View style={{ alignItems: "center", marginTop: 20 }}></View>
            <View className="flex-1 justify-center items-center">
              <Text className="text-4xl font-bold mb-4">Crie sua conta</Text>
              <Text className="text-gray-500 mb-6">
                Preencha os dados para se registrar
              </Text>

              <TextInput
                className="bg-white rounded-lg w-80 p-4 mb-4"
                placeholder="Digite seu nome"
                value={name}
                onChangeText={setName}
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
                placeholderTextColor={"#AAA"}
              />

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

              <TextInput
                className="bg-white rounded-lg w-80 p-4 mb-4"
                placeholder="Digite seu email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
                placeholderTextColor={"#AAA"}
              />

              <TextInput
                className="bg-white rounded-lg w-80 p-4 mb-4"
                placeholder="Digite sua chave PIX"
                value={pixKey}
                onChangeText={setPixKey}
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
                placeholderTextColor={"#AAA"}
              />

          
              <RNPickerSelect
                onValueChange={(itemValue) => {
                  setSelectedState(itemValue);
                  console.log("Estado selecionado:", itemValue);
                }}
                items={[
                  { label: "Selecione um estado", value: "" },
                  ...states.map((state) => ({
                    label: state.nome,
                    value: state.sigla,
                  })),
                ]}
                style={{
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
                    borderWidth: 1,
                    borderColor: "gray",
                    borderRadius: 5,
                    height: 50,
                    backgroundColor: "white",
                    marginBottom: 12,
                  },
                  iconContainer: {
                    top: 10,
                    right: 12,
                  },
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{
                  label: "Selecione um estado",
                  value: null,
                  color: "#AAA",
                }}
              />

              <RNPickerSelect
                onValueChange={(itemValue) => {
                  setSelectedCity(itemValue);
                  console.log("Cidade selecionada:", itemValue);
                }}
                items={[
                  { label: "Selecione uma cidade", value: "" },
                  ...cities.map((city) => ({
                    label: city.nome,
                    value: city.nome,
                  })),
                ]}
                style={{
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
                  },
                  iconContainer: {
                    top: 10,
                    right: 12,
                  },
                }}
                useNativeAndroidPickerStyle={false}
                placeholder={{
                  label: "Selecione uma cidade",
                  value: null,
                  color: "#AAA",
                }}
                disabled={cities.length === 0}
              />

              <TouchableOpacity
                style={{
                  backgroundColor: "#3B82F6",
                  borderRadius: 8,
                  width: "100%",
                  padding: 16,
                  alignItems: "center",
                  marginTop: 5,
                  marginBottom: 10,
                }}
                onPress={handleRegister}
              >
                <Text className="text-white text-lg font-bold">Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </ImageBackground>

  );
}