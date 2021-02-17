import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { AsyncStorage } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import GlobalState from "../../contexts/GlobalState";
import { styles } from './style';

export default function LogoutIcon() {
  const [_, setState] = React.useContext(GlobalState);

  async function logoutUser(e) {
    // console.log("EVENT IM LOGOUT", e)
    // e.preventDefault();
    // console.log("LOGGING OUT USER", state);
    setState(state => ({ ...state, user: undefined }))
    await AsyncStorage.removeItem('@User')
  }

  return (
    <TouchableOpacity
      onPress={(e) => logoutUser(e)}>
      <MaterialCommunityIcons
        name="logout"
        color={"#5a5a5a"}
        size={25}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}
