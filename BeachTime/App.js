import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import EntryPage from "./components/EntryPage";
import { NavigationContainer } from '@react-navigation/native';
import Home from "./components/Home";
import { createStackNavigator } from '@react-navigation/stack';
import EventCreationView from "./components/EventCreationView";
import Event from "./components/Event";
import WallOfShame from "./components/WallOfShame";
import CourtInfo from "./components/CourtInfo";
import Profile from "./components/Profile";
import Heading from "./components/Heading";
import ProfileIcon from "./components/ProfileIcon";
import TabNavigation from "./components/TabNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "./colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native-gesture-handler";
// Sentry.init({
//   dsn: "https://706e63e3c743494587fd7ea82fffe000@o447756.ingest.sentry.io/5428017",
//   enableInExpoDevelopment: true,
//   debug: true,
// });

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    accent: 'yellow',
    background: 'deeppink'
  },
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <NavigationContainer>
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
              name="EntryPage"
              component={EntryPage}
              options={{ title: "Sign up" }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
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
            <Stack.Screen
              name="WallOfShame"
              component={WallOfShame}
              options={{
                title: "Wall of shame",
                headerRight: () => <ProfileIcon user={userData} />,
              }}
            />
            <Stack.Screen
              name="Heading"
              component={Heading}
            />
            <Stack.Screen
              name="CourtInfo"
              component={CourtInfo}
              options={{
                title: "Court operators info",
                headerRight: () => <ProfileIcon user={userData} />,
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ title: "Edit your profile" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

const userData = App.getInitialProps = async () => {
  const userData = JSON.parse(await AsyncStorage.getItem('@User'));
  console.log("-------------UD----------", JSON.stringify(userData.username))
  return userData;
};


//  <Tab.Navigator
//           initialRouteName="Home">
//           <Tab.Screen
//             name="EntryPage"
//             component={EntryPage}
//             options={{ title: "Sign up for the app" }}
//           />
//           <Tab.Screen
//             name="Home"
//             component={Home}
//             onPress={() => {navigation.navigate('Home', {userData})}}
//             options={{
//               title: "Create or sign up for an event",
//               headerRight: () => <ProfileIcon user={userData} />,
//             }}
//           />
//           <Tab.Screen
//             name="EventCreationView"
//             component={EventCreationView}
//             options={{
//               title: "Create an event",
//               headerRight: () => <ProfileIcon user={userData} />,
//             }}
//           />
//           <Tab.Screen
//             name="Event"
//             component={Event}
//             options={{ title: "Event",
//               headerRight: () => <ProfileIcon user={userData} />,
//             }}
//           />
//           <Tab.Screen
//             name="WallOfShame"
//             component={WallOfShame}
//             options={{ title: "Wall of shame",
//               headerRight: () => <ProfileIcon user={userData} />,
//             }}
//           />
//           <Tab.Screen
//             name="Heading"
//             component={Heading}
//           />
//           <Tab.Screen name="CourtInfo" component={CourtInfo} options={{
//             tabBarIcon: () => (
//               <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} />
//             ),
//           }} />
//           <Tab.Screen
//             name="Profile"
//             component={Profile}
//             options={{ title: "Edit your profile" }}
//           />
//         </Tab.Navigator>
