import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const [obrasAprovadas, setObrasAprovadas] = useState(0);
  const [obrasEmAnalise, setObrasEmAnalise] = useState(0);
  const [obrasNegadas, setObrasNegadas] = useState(0);

  useEffect(() => {
    const buscarObras = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        try {
          const obrasRef = collection(db, 'obras');
          const q = query(obrasRef, where('usuarioId', '==', userId));
          const querySnapshot = await getDocs(q);

          let aprovadas = 0;
          let emAnalise = 0;
          let negadas = 0;

          querySnapshot.forEach((doc) => {
            const obra = doc.data();
            switch (obra.status) {
              case 'aprovada':
                aprovadas++;
                break;
              case 'em análise':
                emAnalise++;
                break;
              case 'negada':
                negadas++;
                break;
            }
          });

          setObrasAprovadas(aprovadas);
          setObrasEmAnalise(emAnalise);
          setObrasNegadas(negadas);
        } catch (error) {
          console.error('Erro ao buscar obras:', error);
        }
      }
    };

    buscarObras();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.aprovadas]}>
        <Text style={styles.numero}>{obrasAprovadas}</Text>
        <Text style={styles.label}>Obras Aprovadas</Text>
      </View>
      <View style={[styles.box, styles.analise]}>
        <Text style={styles.numero}>{obrasEmAnalise}</Text>
        <Text style={styles.label}>Obras em Análise</Text>
      </View>
      <View style={[styles.box, styles.negadas]}>
        <Text style={styles.numero}>{obrasNegadas}</Text>
        <Text style={styles.label}>Obras Negadas</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  box: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: '30%',
  },
  aprovadas: {
    backgroundColor: 'green',
  },
  analise: {
    backgroundColor: 'yellow',
  },
  negadas: {
    backgroundColor: 'red',
  },
  numero: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
});

export default Dashboard;