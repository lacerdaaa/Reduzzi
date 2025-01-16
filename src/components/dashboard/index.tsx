import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { s } from './style';

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
    <View style={s.container}>
      <View style={[s.box, s.aprovadas]}>
        <Text style={s.numero}>{obrasAprovadas}</Text>
        <Text style={s.label}>Obras Aprovadas</Text>
      </View>
      <View style={[s.box, s.analise]}>
        <Text style={s.numero}>{obrasEmAnalise}</Text>
        <Text style={s.label}>Obras em Análise</Text>
      </View>
      <View style={[s.box, s.negadas]}>
        <Text style={s.numero}>{obrasNegadas}</Text>
        <Text style={s.label}>Obras Negadas</Text>
      </View>
    </View> 
  );
};


export default Dashboard;