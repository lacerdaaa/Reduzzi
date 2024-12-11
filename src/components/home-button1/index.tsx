import { TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";

export function IndicateButton() {
  const navigation = useNavigation();

  function handleGoToIndication() {
    navigation.navigate('Indication');
  }

  const styles = StyleSheet.create(
    {
      button: {
        width: '85%',
        height: 75,
      },
      background: {
        width: '100%',
        height: '100%',
        flex: 1,
      },
      text: {
        
      }
    }
  )
  return (
    <TouchableOpacity style={styles.button} onPress={handleGoToIndication}>
      <ImageBackground>
        <Text
        onPress={handleGoToIndication}>Indicar</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}