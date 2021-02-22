import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import colors from '../colors'
import LogoutIcon from "../components/LogoutIcon";
import { AsyncStorage, Text, View } from "react-native";
import Profile from "../components/Profile/index";
import ProfileView from "../components/ProfileView";
import { styles } from "../components/Header/style";
import EntryPage from "../components/EntryPage";

const Stack = createStackNavigator();

export default function LoginNavigator() {
  // const [userData, setUserdata] = React.useState(undefined);
  // React.useEffect(() => {
  //   AsyncStorage.getItem('@User')
  //     .then(res => JSON.parse(res))
  //     .then(user => {
  //         setUserdata(user)
  //       }
  //     );
  //
  //   return () => {
  //   }
  // }, []);
  // console.log("userData in Nav", userData)
  // if (!userData) {
  //   return <></>
  // }


  return (
    <Stack.Navigator
      screenOptions={{
        title: "Sign in",
        headerTintColor: 'black',
        headerTitleAlign: 'centre',
        headerStyle: {
          backgroundColor: colors.creme
        }
      }}
    >
      <Stack.Screen
        name="Log in"
        component={EntryPage}
        // initialParams={{ userData }}
        // options={{
        //   headerRight: () =>
        //     <View style={styles.container}>
        //       <Text style={styles.greeting}>Bye {userData.username}?</Text>
        //       <LogoutIcon user={userData} />
        //     </View>
        // }}
      />

    </Stack.Navigator>
  );
}
