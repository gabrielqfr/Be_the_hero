//Bibliotecas
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Criação do Stack Navigator
const AppStack = createStackNavigator();

//Screens
import Casos from './pages/Casos';
import Home from './pages/Home';

export default function Routes(){
    return(
        <NavigationContainer>

            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Casos" component={Casos}/>
            </AppStack.Navigator>

        </NavigationContainer>
    );
}