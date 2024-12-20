import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { useNavigation } from "expo-router";
import * as Location from "expo-location";

const IndicateComponent = () => {
  const navigation = useNavigation();
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [imagens, setImagens] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("pendente");
  const [dataIndicacao, setDataIndicacao] = useState<string>("");
  const [usuarioId, setUsuarioId] = useState<string>("");
  const [nomeDonoObra, setNomeDonoObra] = useState<string>("");
  const [telefoneDonoObra, setTelefoneDonoObra] = useState<string>("");
  const [telefoneResponsavelTecnico, setTelefoneResponsavelTecnico] =
    useState<string>("");
  const [comercial, setComercial] = useState<{
    statusDono: string;
    statusRespTecnico: string;
  } | null>(null);
  const [financial, setFinancial] = useState<{
    statusPagamento: string;
  } | null>(null);

  const handleGetLocation = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if ( status != 'granted') {
            Alert.alert("Permissao negada!", "Voce precisa permitir o acesso a localização para continuar.");
            return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
        Alert.alert("Localização obtida", "Localização obtida com sucesso.");
    } catch (error) {
        console.log(error);
        Alert.alert("Erro ao obter localização", "Ocorreu um erro ao obter a localização do dispositivo.");
    }
  }

  const handleIndicate = async () => {
    if(!location) {
        Alert.alert("Localização não informada!", "Você precisa informar a localização para continuar.")
        return
    }

    try {
        const obraData = {
            location,
            imagens,
            status,
            dataIndicacao,
            usuarioId,
            nomeDonoObra,
            telefoneDonoObra,
            telefoneResponsavelTecnico,
        }

        const obraCollection = collection(db, "obras");
        const obraDocRef = await addDoc(obraCollection, obraData);

        if(comercial) {
            const comercialRef = doc(collection(obraDocRef, "comercial"));
            await setDoc(comercialRef, comercial);
        }

        if(financial) {
            const financialRef = doc(collection(obraDocRef, "financial"));
            await setDoc(financialRef, financial);
        }

        Alert.alert("Obra indicada", "Obra indicada com sucesso!")
        // navigation.replace("Main");

    } catch (error) {
        Alert.alert("Erro ao indicar obra", "Ocorreu um erro ao indicar a obra. Tente novamente mais tarde.")
    }
  }

  return (
    <View>
        <Text>Indicar Obra</Text>
        <TouchableOpacity onPress={handleGetLocation}>Obter Localização Atual</TouchableOpacity>
        
    </View>
  )
};
