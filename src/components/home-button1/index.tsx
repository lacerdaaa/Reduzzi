import { View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";



export function ButtonIndicate() {
    const navigation = useNavigation();

    const handleGoToIndication = () => {
        navigation.navigate('Indicate');
    }
 return (
   <View className="items-center justify-center bg-gray-300">
     <TouchableOpacity className="w-10/12 rounded-full overflow-hidden">
       <ImageBackground
         source={require("../../assets/indicate-background.png")}
         resizeMode="cover"
         className="w-full h-20 justify-center bg-black bg-opacity-30 rounded-full"
         imageStyle={{ opacity: 0.8 }}
       >
         <View className="flex-row items-center justify-between px-4 rounded-full">
           <Text className="text-white text-lg font-bold">Indicar Obra</Text>

           {/* Botão pequeno */}
           <TouchableOpacity className="bg-blue-500 rounded-full px-3 py-1" onPress={handleGoToIndication}>
             <Text className="text-white text-sm font-semibold">
               Indicar &gt;
             </Text>
           </TouchableOpacity>
         </View>
       </ImageBackground>
     </TouchableOpacity>
   </View>
 );
}