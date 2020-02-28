import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EntryPage from "./components/EntryPage";
import { NavigationContainer } from '@react-navigation/native';
import Home from "./components/Home";
import {createStackNavigator} from '@react-navigation/stack';
import EventCreationView from "./components/EventCreationView";

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Screen
        name="EntryPage"
        component={EntryPage}
        options={{title: "sign up for the app"}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: "create or sign up for an event"}}
        />
      {/*<EntryPage />*/}
      {/*<Home />*/}
      <EventCreationView />
    </NavigationContainer>
  );
}

