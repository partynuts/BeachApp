import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Text } from "react-native-gesture-handler";
import { styles } from './style';
import colors from "../../colors";

export default function ProfileIcon({ user }) {
  const navigation = useNavigation();

  if (!user) {
    return <></>;
  }

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Profile")}>
      <FontAwesome5 style={styles.icon} name="user-circle" size={25} color={colors.grey} />

    </TouchableOpacity>
  );
}
