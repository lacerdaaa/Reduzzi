import {Slot} from "expo-router";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold, Poppins_800ExtraBold} from '@expo-google-fonts/poppins'
import { Loading } from "@/components/loaded";

import "../styles/global.css"


export default function Layout() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular, 
        Poppins_500Medium, 
        Poppins_600SemiBold,
        Poppins_700Bold,
        Poppins_800ExtraBold,
    })

    if(!fontsLoaded) {
        return <Loading/>
    }

    return (
        <Slot/>
    )
}
