import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';

interface Obra {
  id: string;
  nomeDonoObra: string;
  valorRecebido: number;
}

export default function Wallet() {
  const [obras, setObras] = useState<Obra[]>([]);
  const [totalRecebido, setTotalRecebido] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name || '');
        }
      }
    };

    const fetchObras = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const q = query(
          collection(db, 'obras'),
          where('usuarioId', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        const obrasData = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Obra)
        );
        setObras(obrasData);
        const total = obrasData.reduce((sum, obra) => sum + obra.valorRecebido, 0);
        setTotalRecebido(total);
      }
    };

    fetchUserData();
    fetchObras();
  }, []);

  const renderItem = ({ item }: { item: Obra }) => (
    <View style={styles.obraItem}>
      <Text style={styles.obraTitle}>{item.nomeDonoObra}</Text>
      <Text style={styles.valorRecebido}>R$ {item.valorRecebido.toFixed(2)}</Text>
    </View>
  );

  return (
    <ImageBackground source={require('@/assets/indicate-background.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{userName}</Text>
          <Text style={styles.totalRecebido}>Total Recebido: R$ {totalRecebido.toFixed(2)}</Text>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={['25%', '50%', '90%']}
          style={styles.bottomSheet}
        >
          <BottomSheetFlatList
            data={obras}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
          />
        </BottomSheet>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  totalRecebido: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  bottomSheet: {
    width: '100%',
    margin: 0,
  },
  contentContainer: {
    padding: 20,
  },
  obraItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  obraTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  valorRecebido: {
    fontSize: 16,
    color: 'green',
  },
});