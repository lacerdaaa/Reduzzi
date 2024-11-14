import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'

import  Home  from '../app/pages/home'
import  Profile  from '../app/pages/profile'
import  Wallet from  '../app/pages/wallet'
import  TrackIndication from '../app/pages/indication/trackindicate'

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}  
                options={{ 
                    tabBarIcon: () => <FontAwesome name='home' />,
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Carteira"
                component={Wallet}  
                options={{
                    tabBarIcon: () => <FontAwesome name='money' />
                }}
            />
            <Tab.Screen
                name="Indicações"
                component={TrackIndication}  
                options={{
                    tabBarIcon: () => <FontAwesome name='bookmark'/>
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}  
                options={{
                    tabBarIcon: () => <FontAwesome name='user'/>
                }}
            />
        </Tab.Navigator>
    )
}