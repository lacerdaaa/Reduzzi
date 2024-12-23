import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';

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

  useEffect(() => {
    const fetchObras = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const q = query(collection(db, 'obras'), where('usuarioId', '==', userId));
        const querySnapshot = await getDocs(q);
        const obrasData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Obra));
        setObras(obrasData);
      }
    };
    fetchObras();
  }, []);

  const renderItem = ({ item }: { item: Obra }) => (
    <View style={styles.obraItem}>
      <Text style={styles.obraTitle}>{item.nomeDonoObra}</Text>
      <Text style={[
        styles.status,
        item.status === 'pendente' ? styles.pendente :
        item.status === 'aprovado' ? styles.aprovado :
        styles.negado
      ]}>
        {item.status}
      </Text>
    </View>
  );

  const renderContent = () => (
    <View style={styles.bottomSheetContent}>
      <FlatList
        data={obras}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        snapPoints={[450, 300]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bottomSheetContent: {
    backgroundColor: 'white',
    padding: 16,
    height: 450,
  },
  obraItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  obraTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    marginTop: 4,
  },
  pendente: {
    color: 'orange',
  },
  aprovado: {
    color: 'green',
  },
  negado: {
    color: 'red',
  },
});