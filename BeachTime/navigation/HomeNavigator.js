import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
import colors from '../colors'
import Home from '../components/Home'
import EventCreationView from '../components/EventCreationView'
import Event from '../components/Event'
import ProfileIcon from "../components/ProfileIcon";
import { AsyncStorage } from "react-native";
import App from "../App";

export default function HomeNavigator() {
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
        title: "Home",
        headerTintColor: 'black',
        headerTitleAlign: 'centre',
        headerStyle: {
          backgroundColor: colors.orangeBrown
        }
      }}
    >
      <Stack.Screen
        name="Events"
        component={Home}
        initialParams={{userData}}
        options={{
          headerRight: () =>
            <ProfileIcon user={userData} />
        }}
      />
      <Stack.Screen
        name="EventCreationView"
        component={EventCreationView}
        options={{
          title: "Create an event",
          headerRight: () => <ProfileIcon user={userData} />,
        }}
      />
      <Stack.Screen
        name="Event"
        component={Event}
        options={{
          title: "Event",
          headerRight: () => <ProfileIcon user={userData} />,
        }}
      />
    </Stack.Navigator>
  );
}
