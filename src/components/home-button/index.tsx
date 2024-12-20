import React from "react";
import {
  TouchableOpacity,
  Text,
  ImageBackground,
  TouchableOpacityProps,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { s } from "./style";

type IndicateButtonProps = TouchableOpacityProps & {
  backgroundImage: any;
  buttonText: string;
  navigateTo: string;
};

export function IndicateButton({
  backgroundImage,
  buttonText,
  navigateTo,
  ...rest
}: IndicateButtonProps) {
  const navigation = useNavigation<any>();

  const handleNavigation = () => {
    navigation.navigate(navigateTo);
  };

  return (
    <TouchableOpacity
      style={s.button}
      onPress={handleNavigation}
      activeOpacity={0.7}
      {...rest}
    > 
      <ImageBackground source={backgroundImage} style={s.buttonImageBackground}>
        <View>
        <Text onPress={handleNavigation} style={s.buttonText}>
          {buttonText}
        </Text>
        <Text onPress={handleNavigation} style={s.buttonText}>
          CONFIRA  
        </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
