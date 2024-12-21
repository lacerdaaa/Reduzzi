import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, Alert, SafeAreaView, TouchableOpacity, StyleSheet, Pressable, ImageBackground } from "react-native";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { db } from "../../../firebaseConfig"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = getStorage();

const IndicationForm = () => {
  const [phoneOwner, setPhoneOwner] = useState<string>("");
  const [nameOwner, setNameOwner] = useState<string>("");
  const [phoneManager, setPhoneManager] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };
    fetchUserId();
  }, []);

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

  const captureImage = async () => {
    if (images.length >= 3) {
      Alert.alert("Limite de fotos", "Você já capturou 3 fotos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const newImageUri = result.assets[0].uri;
      setImages([...images, newImageUri]);
      console.log("Imagem capturada:", newImageUri);
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
  };

  const submitIndication = async () => {
    if ((!phoneManager && !phoneOwner) || images.length < 3 || !location) {
      Alert.alert(
        "Preencha todos os campos",
        "Certifique-se de que pelo menos um telefone, a localização e as 3 fotos foram fornecidos."
      );
      return;
    }

    try {
      const imageUrls = await uploadImages();
      const obraRef = await addDoc(collection(db, "obras"), { 
        localizacao: {
          latitude: location.latitude,
          longitude: location.longitude, 
        },
        imagens: imageUrls,
        status: "pendente",
        dataIndicacao: new Date(),
        usuarioId: userId,
        nomeDonoObra: nameOwner,
        telefoneDonoObra: phoneOwner,
        nomeRespTecnico: "", 
        telefoneRespTecnico: phoneManager,
      });
   
      await setDoc(doc(db, `obras/${obraRef.id}/comercial/status`), {
        statusDono: "pendente",
        statusRespTecnico: "pendente",
      });
   
      await setDoc(doc(db, `obras/${obraRef.id}/financeiro/status`), {
        statusPagamento: "pendente",
      });

      Alert.alert("Sucesso", "Indicação enviada com sucesso!");

      setPhoneManager("");
      setPhoneOwner("");
      setNameOwner("");
      setImages([]);
      setLocation(null);
    } catch (error) {
      console.error("Erro ao enviar indicação:", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar a indicação.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={styles.container}>
          <Text style={styles.title}>Indique a Obra</Text>

          <Pressable style={styles.pressable}>
            <Button title="Selecionar Localização" onPress={getLocation} />
            {location && (
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>Localização selecionada:</Text>
                <Text style={styles.locationText}>{location.latitude.toFixed(6)}</Text>
                <Text style={styles.locationText}>{location.longitude.toFixed(6)}</Text>
              </View>
            )}
          </Pressable>

          <Pressable style={styles.pressable}>
            <Button title="Capturar Foto" onPress={captureImage} />
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
            style={styles.submitButton}
            onPress={submitIndication}
            disabled={
              !(phoneOwner || phoneManager) || images.length < 3 || !location
            }
          >
            <Text style={styles.submitButtonText}>Enviar Indicação</Text>
          </TouchableOpacity>
        </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 650,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  pressable: {
    backgroundColor: "white",
    minWidth: "90%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
  },
  locationContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    padding: 3,
  },
  locationText: {
    fontSize: 16,
    color: "black",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    minWidth: "90%",
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    height: 55,
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
    backgroundColor: "#3B82F6",
    borderRadius: 8,
    minWidth: "90%",
    padding: 16,
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default IndicationForm;