import { StyleSheet } from 'react-native';
import colors from "../../colors";

export const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    // padding: 40,
    // backgroundColor: colors.creme,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white"
  },
  textInput: {
    height: 40,
    borderWidth: 0.2,
    borderColor: colors.textColorBlack,
    backgroundColor: colors.textWhite,
    padding: 5,
    marginBottom: 30
  },
  btnText: {
    fontSize: 20,
    color: "white",
    // paddingTop: "2%"
  },
  button: {
    width: "100%",
    // height: "6%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: "#0066FF",
  }
});
