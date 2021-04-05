import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import colors from '../colors'
import LogoutIcon from "../components/LogoutIcon";
import { Text, View } from "react-native";
import Profile from "../components/Profile/index";
import ProfileView from "../components/ProfileView";
import { styles } from "../components/Header/style";
import GlobalState from "../contexts/GlobalState";

const Stack = createStackNavigator();

export default function ProfileNavigator() {
  const [state, setState] = React.useContext(GlobalState);

  return (
    <Stack.Navigator
      screenOptions={{
        title: "Profile",
        headerTintColor: 'black',
        headerTitleAlign: 'centre',
        headerStyle: {
          backgroundColor: colors.creme
        }
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileView}
        initialParams={{ userData: state.user }}
        options={{
          headerRight: () =>
            <View style={styles.container}>
              <Text style={styles.greeting}>Bye {state.user.username}?</Text>
              <LogoutIcon user={state.user} />
            </View>
        }}
      />

    </Stack.Navigator>
  );
}
