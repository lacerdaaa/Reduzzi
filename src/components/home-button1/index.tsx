import { View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { useNavigation } from "@react-navigation/native";



export function ButtonIndicate() {
    const navigation = useNavigation();

    const handleGoToIndication = () => {
        navigation.navigate('Indicate');
    }
 return (
    <View className="items-center justify-center bg-gray-300">
     <TouchableOpacity
       className="w-10/12 rounded-full overflow-hidden"
       onPress={handleGoToIndication}
     >
      <ImageBackground
         source={require("../../assets/indicate-button-background.png")}
         resizeMode="cover"
         className="w-full justify-center bg-black bg-opacity-30 rounded-full"
         imageStyle={{ opacity: 0.9 }}
      >
         <View className="w-5/6 h-40 flex-row items-center justify-between px-4 rounded-full">
           <Text className="text-white text-lg font-bold">Indicar Obra</Text>
           <TouchableOpacity
             className="bg-blue-500 h-10 p-2 rounded-full py-1"
             onPress={handleGoToIndication}
           >
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