import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, Alert, ImageBackground, TouchableOpacity, Keyboard, StyleSheet, Pressable } from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../../firebaseConfig"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO: add a picker for state and city in this component

const storage = getStorage();

const IndicationForm = () => {
  const [phoneOwner, setPhoneOwner] = useState<string>("");
  const [nameOwner, setNameOwner] = useState<string>("")
  const [phoneManager, setPhoneManager] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [comercial, setComercial] = useState<{ statusDono: string; statusRespTecnico: string } | null>(null);
  const [financial, setFinancial] = useState<{ statusPagamento: string } | null>(null);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada",
        "Precisamos da permissão para acessar a localização."
      );
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  const pickImage = async () => {
    if (images.length >= 3) {
      Alert.alert('Limite de fotos', 'Você já selecionou 3 fotos.');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
  
    if (!result.canceled && result.assets.length) {
      const novasImagens = result.assets.slice(0, 3).map((asset) => asset.uri);
      
      setImages([...images, ...novasImagens]); 
    }
  };

  const uploadImages = async () => {
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const imageRef = ref(storage, `images/${Date.now()}`);
        const blob = await fetch(image).then((response) => response.blob());
        await uploadBytes(imageRef, blob);
        return await getDownloadURL(imageRef);
      })
    );
    return imageUrls;
  }

  const submitIndication = async () => {
    if ((!phoneManager && !phoneOwner) || images.length < 3 || !location) {
      Alert.alert(
        "Preencha todos os campos",
        "Certifique-se de que pelo menos um telefone, a localização e as 3 fotos foram fornecidos."
      );
      return;
    }

  try {
    const userId = await AsyncStorage.getItem('userId');
    
    const imageUrls = await uploadImages();
   
    const docRef = await addDoc(collection(db, "indications"), { 
      location: {
        latitude: location.latitude,
        longitude: location.longitude, 
      },
      phoneManager: phoneManager,
      phoneOwner: phoneOwner,
      nameOwner: nameOwner,
      imageUrls: imageUrls,
      userId: userId,
      statusObra: "pendente",
      createdAt: new Date(),
      status: { dono: false, tecnico: "" },

    });

    Alert.alert("Sucesso", "Indicação enviada com sucesso!");


    setPhoneManager("");
    setPhoneOwner("");
    setImages([]);
    setLocation(null);
  } catch (error) {
    console.error("Erro ao enviar indicação:", error);
    Alert.alert("Erro", "Ocorreu um erro ao enviar a indicação.");
  }
};

  return (
    <ImageBackground
      source={require("../../assets/indicate-background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text className="text-5xl mb-12 font-bold text-white">
          Indique a Obra
        </Text>

        <Pressable className="bg-white w-full rounded-lg justify-center items-center">
          <Button title="Selecionar Localização" onPress={getLocation} />
          {location && (
            <View className="items-center justify-center gap-2 p-3">
              <Text className="font-bold text-slate-700">
                Localização selecionada:
              </Text>
              <Text className="text-slate-700">
                {location.latitude.toFixed(6)}
              </Text>
              <Text className="text-slate-700">
                {location.longitude.toFixed(6)}
              </Text>
            </View>
          )}
        </Pressable>

        <Pressable className="bg-white w-full rounded-lg justify-center items-center my-3 pb-3">
          <Button title="Selecionar Imagens" onPress={pickImage} />
          <View style={styles.imagesContainer}>
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.image} />
            ))}
          </View>
        </Pressable>

        <TextInput 
        style={styles.input}
        placeholder="Nome do Dono da Obra"
        value={nameOwner}
        onChangeText={(text) => setNameOwner(text)}
        />    

        <TextInput
          style={styles.input}
          placeholder="Telefone do Dono da Obra"
          keyboardType="phone-pad"
          value={phoneOwner}
          onChangeText={(phone) => setPhoneOwner(phone)}
          returnKeyType="done"
          placeholderTextColor="#AAA"
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone do Resp. Técnico"
          keyboardType="phone-pad"
          value={phoneManager}
          onChangeText={(phone) => setPhoneManager(phone)}
          returnKeyType="done"
          placeholderTextColor="#AAA"
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
          onPress={submitIndication}
          disabled={
            !(phoneOwner || phoneManager) || images.length === 0 || !location
          }
        >
          <Text className="font-bold text-white">Enviar Indicação</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 650,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  locationText: {
    marginTop: 10,
    fontSize: 16,
    color: "blue",
  },
  imagesContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  submitButton: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
});

export default IndicationForm;
