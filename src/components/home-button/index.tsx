import React from "react";
import {
  TouchableOpacity,
  Text,
  ImageBackground,
  TouchableOpacityProps,
  View,
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

  const words = buttonText.split(" ");

  return (
    <TouchableOpacity
      style={s.button}
      onPress={handleNavigation}
      activeOpacity={0.7}
      {...rest}
    >
      <ImageBackground source={backgroundImage} style={s.buttonImageBackground}>
        <View style={s.buttonContent}>
          {words.map((word, index) => (
            <Text key={index} onPress={handleNavigation} style={s.buttonText}>
              {word}
            </Text>
          ))}
        </View>
          <Text onPress={handleNavigation} style={s.buttonTextSecondary}>
            Confira &gt;
          </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}
