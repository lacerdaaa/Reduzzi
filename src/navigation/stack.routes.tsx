import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabRoutes from './tab.routes'
import Register  from "../app/pages/auth/register";
import Login  from '../app/pages/auth/login';
import Indication from '../app/pages/indication/indicate';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={TabRoutes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Indicate"
          component={Indication}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
}


