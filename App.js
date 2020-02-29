// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen'
import ChatScreen from './screens/ChatScreen'
import UserScreen from "./screens/UserScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login">
          {props =><LoginScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="User" title="Chat Rooms Registered">
          {props =><UserScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {props =><ChatScreen {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;