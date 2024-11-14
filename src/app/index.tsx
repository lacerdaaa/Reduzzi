import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebaseConfig"; 
import Routes from "../navigation";

export default function App () {
  return (
    <Routes/>
  )
}

