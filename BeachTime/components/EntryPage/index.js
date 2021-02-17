import React from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import {
  AsyncStorage,
  Button,
  ImageBackground,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { apiHost } from '../../config';
import { stylesAndroid, stylesIos } from './style';
import GlobalState from "../../contexts/GlobalState";

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default function EntryPage() {


  const [_, setState] = React.useContext(GlobalState);
  const [username, setUsername] = React.useState({});
  const [email, setEmail] = React.useState({});
  const [paypal_username, setPaypalUsername] = React.useState({});
  const [errorMsg, setErrorMsg] = React.useState({});

  React.useEffect(() => {
    AsyncStorage.getItem('@User')
      .then(storageItem => {
        const userData = JSON.parse(storageItem);
        setState((state) => ({ ...state, user: userData }));
      })
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      `${apiHost}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          paypal_username
        })
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          let errorMsg = 'Something went terribly wrong!';
          try {
            errorMsg = (await res.json()).errorMsg;
          } catch (e) {

          }
          return setErrorMsg(errorMsg)
        }
        const data = await res.json();
        console.log("ENTRY PAGE DATENZEUGS", data)
        try {
          await AsyncStorage.setItem('@User', JSON.stringify(data));
          setState((state) => ({ ...state, user: data }));
        } catch (e) {
          console.log(e);
        }

      })
  }

  const styles = Platform.OS === 'ios' ? stylesIos : stylesAndroid;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://i.pinimg.com/originals/88/5a/fd/885afd3f8182489c0b729b161157d1e8.jpg' }}
        style={{
          flex: 1,
          resizeMode: 'cover',
          justifyContent: 'center',
          padding: 0
        }}>
      <Text style={styles.title}>Sign in!</Text>
      <Separator />
      <TextInput
        style={styles.textInput}
        placeholder="Username*"
        onChangeText={(input) => setUsername(input)}
        value={username}
      />
      <TextInput
        style={styles.textInput}
        placeholder="PayPal username"
        onChangeText={(input) => setPaypalUsername(input)}
        value={paypal_username}
      />
      <TextInput
        style={styles.textInput}
        type="email"
        placeholder="Email*"
        onChangeText={(input) => setEmail(input)}
        value={email}
        keyboardType='email-address'
      />
      <Separator />

      {Platform.OS !== 'ios' ?
        <Button
          title="Go"
          onPress={(e) => handleSubmit(e)}
        /> :
        <TouchableOpacity
          onPress={(e) => handleSubmit(e)}
          style={styles.button}>
          <Text style={styles.btnText}>Go</Text>
        </TouchableOpacity>
      }
      </ImageBackground>
    </View>
  )
}



