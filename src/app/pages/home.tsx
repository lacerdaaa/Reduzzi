import { ButtonIndicate } from '@/src/components/home-button1';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

export default function Home() {

  const styles = StyleSheet.create({
    home: {
      backgroundColor: '#232323',
      height: '100%',
      width: '100%',
      
    }
  });

  return (
    <SafeAreaView >
      <View style={styles.home}>
        <Text className='text-3xl font-bold'> </Text>
        <ButtonIndicate />
      </View>
    </SafeAreaView>
  );
}