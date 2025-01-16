import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface Obra {
  id: string;
  nomeDonoObra: string;
}

type RootStackParamList = {
  Home: undefined;
  Details: { obraId: string };
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchObras = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'obras'));
        const obrasData = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Obra)
        );
        setObras(obrasData);
      } catch (error) {
        console.error('Erro ao buscar obras: ', error);
        Alert.alert('Erro', 'Ocorreu um erro ao buscar as obras.');
      } finally {
        setLoading(false);
      }
    };

    fetchObras();
  }, []);

  const renderItem = ({ item }: { item: Obra }) => (
    <TouchableOpacity
      style={styles.obraItem}
      onPress={() => navigation.navigate('Details', { obraId: item.id })}
    >
      <Text style={styles.obraTitle}>{item.nomeDonoObra}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={obras}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  obraItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  obraTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});