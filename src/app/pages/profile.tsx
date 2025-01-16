import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [name, setName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pixKey, setPixKey] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [userType, setUserType] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || '');
          setCpf(userData.cpf || '');
          setPhone(userData.phone || '');
          setEmail(userData.email || '');
          setPixKey(userData.pixKey || '');
          setSelectedState(userData.selectedState || '');
          setSelectedCity(userData.selectedCity || '');
          setUserType(userData.type || '');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os dados do usuário.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          await updateDoc(userDocRef, {
            name: name || userData.name,
            cpf: cpf || userData.cpf,
            phone: phone || userData.phone,
            email: email || userData.email,
            pixKey: pixKey || userData.pixKey,
            selectedState: userData.selectedState,
            selectedCity: userData.selectedCity,
            type: userData.type,
          });
          Alert.alert('Sucesso', 'Dados salvos com sucesso!');
        }
      }
    } catch (error) {
      console.error('Erro ao salvar dados: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
    } finally {
      setLoading(false);
    }
  }, [name, cpf, phone, email, pixKey]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        editable={true}
        onChangeText={setName}
      />
      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={cpf}
        editable={true}
        onChangeText={setCpf}
      />
      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        value={phone}
        editable={true}
        onChangeText={setPhone}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        editable={true}
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Estado</Text>
      <TextInput
        style={styles.input}
        value={selectedState}
        editable={false}
      />
      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        value={selectedCity}
        editable={false}
      />
      <Text style={styles.label}>Chave Pix</Text>
      <TextInput
        style={styles.input}
        value={pixKey}
        onChangeText={setPixKey}
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});