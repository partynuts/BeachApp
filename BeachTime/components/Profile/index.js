import React from 'react';
import { apiHost } from '../../config';
import { AsyncStorage, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from './style';
import { Separator } from "../../helper";
import GlobalState from "../../contexts/GlobalState";
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const [state, setState] = React.useContext(GlobalState);
  const [username, setUsername] = React.useState(state.user.username);
  const [email, setEmail] = React.useState(state.user.email);
  const [paypal_username, setPaypalUsername] = React.useState(state.user.paypal_username);
  const [errorMsg, setErrorMsg] = React.useState(undefined);
  const [success, setSuccess] = React.useState(false)
  const navigation = useNavigation();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("ENTERED DATA", state);
    fetch(
      `${apiHost}/users/${state.user.id}`,
      {
        method: "PATCH",
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
            console.log("error in updating profile", e)
          }
          return setErrorMsg(errorMsg)
        }
        const data = await res.json();
        console.log("DATA FROM EDITING PROFILE", data);
        try {
          await AsyncStorage.setItem('@User', JSON.stringify(data));
          setSuccess(true);
          setState((state) => ({ ...state, user: data }));
          navigation.navigate('Events')
        } catch (e) {
          console.log(e);
        }
      })
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={(input) => setUsername(input)}
          value={username}
          placeholder='Username, i.e. Fritz'
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(input) => setPaypalUsername(input)}
          value={paypal_username}
          placeholder='Bratzo'
        />
        <TextInput
          style={styles.textInput}
          type="email"
          onChangeText={(input) => setEmail(input)}
          value={email}
          placeholder='example@mail.com'
          keyboardType='email-address'
        />
      </View>
      <Separator />
      <Separator />
      {errorMsg &&
      <Text>{errorMsg.toString()}</Text>
      }
      <TouchableOpacity
        onPress={(e) => handleSubmit(e)}
        style={styles.button}>
        <Text style={styles.btnText}>Update profile</Text>
      </TouchableOpacity>

    </View>
  )
}

