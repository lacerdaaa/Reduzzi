import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
    SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { styles } from "./style";
import { Loading } from "../loaded";


interface Obra {
  id: string;
  nomeDonoObra: string;
  status: string;
  usuarioId?: string;
  localizacao: {
    latitude: number;
    longitude: number;
  };
  imagens?: string[];
  dataIndicacao?: string;
}

export default function TrackComponent() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObras = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const q = query(
            collection(db, "obras"),
            where("usuarioId", "==", userId)
          );
          const querySnapshot = await getDocs(q);
          const obrasData = querySnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Obra)
          );
          setObras(obrasData);
        }
      } catch (error) {
        console.error("Erro ao buscar obras:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchObras();
  }, []);

  const renderItem = ({ item }: { item: Obra }) => (
    <View style={styles.obraItem}>
      <Text style={styles.obraTitle}>{item.nomeDonoObra}</Text>
      <Text
        style={[
          styles.status,
          item.status === "pendente"
            ? styles.pendente
            : item.status === "aprovado"
            ? styles.aprovado
            : styles.negado,
           
        ]}
      >
        {item.status}
      </Text>
      
    </View>
  );

  const bottomSheetRef = useRef<BottomSheet>(null);
  const dimensions = useWindowDimensions();
  const snapPoints = [150, dimensions.height - 100];;

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading/>
      ) : (
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
          <BottomSheetFlatList
            data={obras}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
          />
        </BottomSheet>
      )}
    </SafeAreaView>
  );
}

