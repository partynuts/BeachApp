import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import colors from '../colors'
import Home from '../components/Home'
import EventCreationView from '../components/EventCreationView'
import Event from '../components/Event'
import { AsyncStorage } from "react-native";
import Header from "../components/Header";

const Stack = createStackNavigator();

export default function EventsNavigator() {
  const [userData, setUserdata] = React.useState(undefined);
  React.useEffect(() => {
    AsyncStorage.getItem('@User')
      .then(res => JSON.parse(res))
      .then(user => {
          setUserdata(user)
        }
      );

    return () => {
    }
  }, []);
  console.log("userData in Nav", userData)
  if (!userData) {
    return <></>
  }


  return (
    <Stack.Navigator
      screenOptions={{
        title: "Events",
        headerTintColor: 'black',
        headerTitleAlign: 'centre',
        headerStyle: {
          backgroundColor: colors.creme
        }
      }}
    >
      <Stack.Screen
        name="Events"
        component={Home}
        initialParams={{ userData }}
        options={{
          headerRight: () =>
            <Header userData={userData}/>
        }}
      />
      <Stack.Screen
        name="EventCreationView"
        component={EventCreationView}
        options={{
          title: "Create an event",
          headerRight: () => <Header userData={userData}/>
          ,
        }}
      />
      <Stack.Screen
        name="Event"
        component={Event}
        options={{
          title: "Event",
          headerRight: () => <Header userData={userData}/>
        }}
      />
    </Stack.Navigator>
  );
}
