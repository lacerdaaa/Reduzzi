import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabRoutes from "./tab.routes";
import Register from "../app/pages/auth/register";
import Login from "../app/pages/auth/login";
import Indication from "../app/pages/indication/indicate";
import Comercial from "@/app/comercial";
import Financeiro from "@/app/financeiro";
import DetalhesComercial from "@/app/comercial/details";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
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
      <Stack.Screen
        name="Comercial"
        component={Comercial}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
      name="Financeiro" 
      component={Financeiro} 
      />
      <Stack.Screen 
      name="DetalhesComercial" 
      component={DetalhesComercial} 
      />
    </Stack.Navigator>
  );
}
