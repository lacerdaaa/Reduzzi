import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from 'reanimated-bottom-sheet';
import Dashboard from '../dashboard';

const TrackIndication = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [obras, setObras] = useState<any[]>([]);
  const [statusCounts, setStatusCounts] = useState({ aprovadas: 0, pendentes: 0, negadas: 0 });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const userDoc = await getDocs(query(collection(db, 'usuarios'), where('id', '==', userId)));
        if (!userDoc.empty) {
          const userData = userDoc.docs[0].data();
          setUserName(userData.nome);
        }
      }
    };

    const fetchObras = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const obrasQuery = query(collection(db, 'obras'), where('usuarioId', '==', userId));
        const obrasSnapshot = await getDocs(obrasQuery);
        const obrasList = obrasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setObras(obrasList);

        const statusCounts = { aprovadas: 0, pendentes: 0, negadas: 0 };
        obrasList.forEach(obra => {
          if (obra.status === 'aprovada') statusCounts.aprovadas++;
          else if (obra.status === 'pendente') statusCounts.pendentes++;
          else if (obra.status === 'negada') statusCounts.negadas++;
        });
        setStatusCounts(statusCounts);
      }
    };

    fetchUserData();
    fetchObras();
  }, []);

  const renderObraItem = ({ item }) => (
    <View style={styles.obraItem}>
      <Text style={styles.obraTitle}>{item.nomeDonoObra}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  const renderContent = () => (
    <View style={styles.bottomSheetContent}>
      <FlatList
        data={obras}
        renderItem={renderObraItem}
        keyExtractor={item => item.id}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.greeting}>Seja bem-vindo, {userName}</Text>
      <Dashboard obrasAprovadas={statusCounts.aprovadas} obrasEmAnalise={statusCounts.pendentes} obrasNegadas={statusCounts.negadas} />
      <BottomSheet
        snapPoints={[450, 300, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
});

export default TrackIndication;