import { StyleSheet } from 'react-native';
import colors from "../../colors";

export const stylesAndroid = StyleSheet.create({
  container: {
    minHeight: '100%',
    // padding: 40,
    backgroundColor: colors.creme,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textColorBlack
  },
  textInput: {
    height: 40,
    borderWidth: 0.2,
    borderColor: colors.textColorBlack,
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 30
  },
  btnText: {
    fontSize: 20,
    color: "white",
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

export const stylesIos = StyleSheet.create({
  container: {
    minHeight: '100%',
    // padding: 40,
    backgroundColor: colors.creme,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textColorBlack
  },
  textInput: {
    height: 40,
    borderWidth: 0.2,
    borderColor: colors.textColorBlack,
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 30
  },
  btnText: {
    fontSize: 20,
    color: "white",
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
