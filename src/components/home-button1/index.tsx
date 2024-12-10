import { SafeAreaView, View, TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";



export function ButtonIndicate() {
  const navigation = useNavigation();
  const handleGoToIndication = () => {
    navigation.navigate('Indicate');
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      backgroundColor: '#F5F5F5',
      display: 'flex',
      alignItems: 'center'
    },
    text: { 
      fontSize: 30,
      color: '#757575',

      
    }
  });
  return (
    <SafeAreaView>
      <Text style={styles.text}>Bem vindo de volta, Douglas!</Text>
    </SafeAreaView>
  );
}