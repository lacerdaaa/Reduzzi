import { ButtonIndicate } from '@/src/components/home-button1';
import { LoginComponent } from '@/src/components/login';
import { View, SafeAreaView, Text } from 'react-native';

export default function Home() {
 return (
   <SafeAreaView>
      <View className='w-full h-full items-center justify-center'>
      <Text className='text-3xl font-bold'>Seja bem vindo, </Text>
      <ButtonIndicate/>
      </View>
   </SafeAreaView>
 );
}