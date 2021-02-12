import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import colors from '../colors'
import Info from '../components/Info'
import ProfileIcon from "../components/ProfileIcon";
import { AsyncStorage } from "react-native";
import WallOfShame from "../components/WallOfShame";
import CourtInfo from "../components/CourtInfo";
import Header from "../components/Header";

const Stack = createStackNavigator();

export default function InfoNavigator() {
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
        title: "Info",
        headerTintColor: 'black',
        headerTitleAlign: 'centre',
        headerStyle: {
          backgroundColor: colors.creme
        }
      }}
    >
      <Stack.Screen
        name="Info"
        component={Info}
        initialParams={{ userData }}
        options={{
          headerRight: () =>
            <Header userData={userData} />
        }}
      />
      <Stack.Screen
        name="CourtInfo"
        component={CourtInfo}
        options={{
          title: "Courts info",
          headerRight: () => <Header userData={userData} />
        }}
      />
      <Stack.Screen
        name="WallOfShame"
        component={WallOfShame}
        options={{
          title: "Wall of shame",
          headerRight: () => <Header userData={userData} />
        }}
      />
    </Stack.Navigator>
  );
}
