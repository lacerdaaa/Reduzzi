import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  Alert,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from "react-native-picker-select";
import { db } from "../../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { colors, fontFamily } from "@/styles/theme";


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
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [states, setStates] = useState<State[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleRegister = async () => {
    try {
      const userData = {
        name,
        cpf,
        phone,
        email,
        pixKey,
        selectedState,
        selectedCity,
        tipo: "indicador",
      };

      const userCollection = collection(db, "users");
      await addDoc(userCollection, userData);

      Alert.alert("Sucesso", "Usuário registrado com sucesso!");
      navigation.replace("Login");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      Alert.alert("Erro", "Não foi possível registrar o usuário.");
    }
  };

  const fetchStates = async () => {
    try {
      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} ${response.statusText}`);
      }
      const data: State[] = await response.json();
      const statesData = data.map((state) => ({
        id: state.id,
        sigla: state.sigla,
        nome: state.nome,
      }));
      setStates(statesData);
    } catch (error) {
      console.error("Erro ao buscar estados:", error);
      Alert.alert("Erro", "Não foi possível buscar os estados.");
    }
  };

  const fetchCities = async (uf: string) => {
    try {
      const response = await fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );
      if (!response.ok) {
        throw new Error(`Erro: ${response.status} ${response.statusText}`);
      }
      const data: City[] = await response.json();
      const citiesData = data.map((city) => ({
        id: city.id,
        nome: city.nome,
      }));
      setCities(citiesData);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
      Alert.alert("Erro", "Não foi possível buscar as cidades.");
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
              colors={[
                "rgba(255,255,255,0.7)",
                "rgba(255,255,255,0.4)",
                "rgba(255,255,255,0.7)",
              ]}
              style={styles.gradient}
            >
              <View style={styles.content}>
                <Text style={styles.title}>Crie sua conta</Text>
                <Text style={styles.subtitle}>
                  Preencha os dados para se registrar
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Digite seu nome"
                  value={name}
                  onChangeText={setName}
                  returnKeyType="done"
                  onSubmitEditing={dismissKeyboard}
                  placeholderTextColor={"#AAA"}
                />

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

                <TextInput
                  style={styles.input}
                  placeholder="Digite seu email"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  returnKeyType="done"
                  onSubmitEditing={dismissKeyboard}
                  placeholderTextColor={"#AAA"}
                />

                <TextInput
                  style={styles.input}
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
                  style={pickerSelectStyles}
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
                  style={pickerSelectStyles}
                  useNativeAndroidPickerStyle={false}
                  placeholder={{
                    label: "Selecione uma cidade",
                    value: null,
                    color: "#AAA",
                  }}
                  disabled={cities.length === 0}
                />

                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={handleRegister}
                >
                  <Text style={styles.registerButtonText}>Cadastrar</Text>
                </TouchableOpacity>
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
    height: "80%",
    width: "100%",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: fontFamily.bold,
    color: "black",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    minWidth: "100%",
    padding: 16,
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: colors.blue.primary,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    minWidth: "100%",
    height: 50,
  },
  registerButtonText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    fontFamily: fontFamily.bold,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 16,
    backgroundColor: "white",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 16,
    backgroundColor: "white",
  },
});