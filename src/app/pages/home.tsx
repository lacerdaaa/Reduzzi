import { IndicateButton } from '@/components/home-button';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';


export default function Home() {

  return (
    <SafeAreaView style={{flex:1}} >
      <IndicateButton buttonText='Indicar Obra' backgroundImage={require("@/assets/indicate-button-background.png")} navigateTo='Indicate'/>
      <IndicateButton buttonText='Indicar' backgroundImage={require("@/assets/indicate-button-background.png")} navigateTo='Indicate'/>
    </SafeAreaView>
  );
}