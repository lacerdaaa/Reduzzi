import IndicationForm from '@/components/indicate/index';
import { View, ImageBackground } from 'react-native';

export default function Indication() {
  return (
    <ImageBackground
      source={require('@/assets/indicate-background.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <IndicationForm />
    </ImageBackground>
  )
}