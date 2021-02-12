import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import EntryPage from "./components/EntryPage";
import { NavigationContainer } from '@react-navigation/native';
import EventsNavigator from './navigation/EventsNavigator';
import InfoNavigator from './navigation/InfoNavigator';
import ProfileNavigator from './navigation/ProfileNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GlobalState from "./contexts/GlobalState";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "./components/Profile";
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
    this.state = {
      userData: undefined,
      userDataLoaded: false
    }
  }

  async componentDidMount() {
    const [_, setState] = React.useContext(GlobalState);
    const userData = JSON.parse(await AsyncStorage.getItem('@User'));
    setState((state) => ({ ...state, user: userData }));

    console.log("USER DATA IN APP>JS", await AsyncStorage.getItem('@User'))
    this.setState({
      userDataLoaded: true
    })
  }

  authNavigator() {
    return (
      <Tab.Navigator initialRouteName="Events">
        <Tab.Screen
          name="Events"
          component={EventsNavigator}
          options={{
            tabBarIcon: () => <MaterialCommunityIcons size={30} name="calendar-heart" />,
          }}
        />
        <Tab.Screen
          name="Info"
          component={InfoNavigator}
          options={{
            tabBarIcon: () => <MaterialCommunityIcons size={30} name="information-outline" />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            tabBarIcon: () => <MaterialCommunityIcons size={30} name="account-circle-outline" />,
          }}
        />
      </Tab.Navigator>
    )
  }

  guestNavigator() {
    return (
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen name="Login" component={EntryPage} />
      </Tab.Navigator>
    )
  }

  render() {
    const [globalState, _] = React.useContext(GlobalState);

    if (!this.state.userDataLoaded) {
      return <></>
    }

    return (
      <GlobalState.Provider value={[this.state, this.setState]}>
        <NavigationContainer>
          {globalState.userData ?
            this.authNavigator()
            :
            this.guestNavigator()
          }
        </NavigationContainer>
      </GlobalState.Provider>
    )

    // return (
    //     <NavigationContainer>
    //       <Stack.Navigator
    //         screenOptions={{
    //           title: "Home",
    //           headerTintColor: 'black',
    //           headerTitleAlign: 'centre',
    //           headerStyle: {
    //             backgroundColor: colors.orangeBrown
    //           }
    //         }}
    //       >
    //         <Stack.Screen
    //           name="EntryPage"
    //           component={EntryPage}
    //           options={{ title: "Sign up" }}
    //         />
    //         <Stack.Screen
    //           name="Home"
    //           component={Home}
    //           options={{
    //             headerRight: () =>
    //                 <ProfileIcon user={userData} />
    //           }}
    //         />
    //         <Stack.Screen
    //           name="EventCreationView"
    //           component={EventCreationView}
    //           options={{
    //             title: "Create an event",
    //             headerRight: () => <ProfileIcon user={userData} />,
    //           }}
    //         />
    //         <Stack.Screen
    //           name="Event"
    //           component={Event}
    //           options={{
    //             title: "Event",
    //             headerRight: () => <ProfileIcon user={userData} />,
    //           }}
    //         />
    //         <Stack.Screen
    //           name="WallOfShame"
    //           component={WallOfShame}
    //           options={{
    //             title: "Wall of shame",
    //             headerRight: () => <ProfileIcon user={userData} />,
    //           }}
    //         />
    //         <Stack.Screen
    //           name="Heading"
    //           component={Heading}
    //         />
    //         <Stack.Screen
    //           name="CourtInfo"
    //           component={CourtInfo}
    //           options={{
    //             title: "Court operators info",
    //             headerRight: () => <ProfileIcon user={userData} />,
    //           }}
    //         />
    //         <Stack.Screen
    //           name="Profile"
    //           component={Profile}
    //           options={{ title: "Edit your profile" }}
    //         />
    //       </Stack.Navigator>
    //     </NavigationContainer>
    // );
  }
}
//
// const userData = App.getInitialProps = async () => {
//   const userData = JSON.parse(await AsyncStorage.getItem('@User'));
//   console.log("-------------UD----------", JSON.stringify(userData.username))
//   return userData;
// };

