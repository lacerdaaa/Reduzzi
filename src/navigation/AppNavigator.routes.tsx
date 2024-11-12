import React, { useEffect, useState } from "react";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Login } from "../app/pages/auth/login";
import { Register } from "../app/pages/auth/register";
import { Home } from "../app/pages/home";
import { Wallet } from "../app/pages/wallet";
import { Profile } from "../app/pages/profile";
import { TrackIndication } from "../app/pages/indication/trackindicate";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  AppTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator(); 

function AppTabs() {  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" 
      component={Home} 
      options={{ title: "Início" }} />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{ title: "Carteira" }}
      />
      <Tab.Screen
        name="Indicações"
        component={TrackIndication}
        options={{ title: "Indicações" }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{ title: "Perfil" }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const [user, setUser] = useState<User | null>(null); // Permite que o estado aceite User ou null

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
      setUser(authenticatedUser); // Agora o tipo de user corresponde ao tipo do estado
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!user ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: "Cadastro" }}
            />
          </>
        ) : (
          <Stack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );

  
};

export default AppNavigator;

