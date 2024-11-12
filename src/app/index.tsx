import React, { useEffect, useState } from "react";
import AppNavigator from "../navigation/AppNavigator.routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged, User } from "firebase/auth";
import { Login } from "./pages/auth/login";
import { Home } from "./pages/home";
import { Wallet } from "./pages/wallet";
import { Indication } from "./pages/indication/indicate";
import { Profile } from "./pages/profile";
import { TrackIndication } from "./pages/indication/trackindicate";
import { auth } from "../../firebaseConfig"; 

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Wallet" component={Wallet} />
      <Tab.Screen name="Indicações" component={TrackIndication} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null); // Tipando o estado como User ou null

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current user:", currentUser); // Depuração para verificar o estado do usuário
      if (currentUser) {
        setUser(currentUser); // Se houver um usuário autenticado, define o estado
      } else {
        setUser(null); // Se não houver usuário, define como null
      }
    });

    // Remover o listener quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  console.log("User state:", user); // Log para depurar o estado do usuário

  // Remova o NavigationContainer de dentro do componente AppTabs
  return user ? <AppTabs /> : <Login />;
}

