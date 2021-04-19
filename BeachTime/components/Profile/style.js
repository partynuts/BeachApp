import { StyleSheet } from 'react-native';
import colors from "../../colors";

export const styles = StyleSheet.create({
  container: {
    minHeight: '100%'
  },

  textInput: {
    height: 40,
    borderWidth: 0.2,
    backgroundColor: colors.textWhite,
    padding: 5,
    marginBottom: 30
  },
  btnText: {
    fontSize: 20,
    color: colors.textWhite
  },
  button: {
    width: "100%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: colors.darkBlue,
  }
});
