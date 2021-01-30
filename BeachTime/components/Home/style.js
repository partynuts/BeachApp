import { StyleSheet } from 'react-native';
import colors from "../../colors";

export const stylesAndroid = StyleSheet.create({
  container: {
    minHeight: '100%',
    // padding: 40,
    backgroundColor: colors.creme
  },
  text: {
    marginTop: 30,
    fontWeight: "700",
    color: "white"
  },
  btnText: {
    fontSize: 16,
    color: "white",
    // paddingTop: "2%"
  },
  button: {
    // width: "100%",
    // height: "6%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    // backgroundColor: "#0066FF",
    backgroundColor: colors.amberBackground,
  }
});

export const stylesIos = StyleSheet.create({
  container: {
    minHeight: '100%',
    // padding: 40,
    backgroundColor: colors.creme
  },
  text: {
    marginTop: 30,
    fontWeight: "700",
    color: "white"
  },
  btnText: {
    fontSize: 18,
    color: "white",
    // paddingTop: "2%"
  },
  button: {
    // width: "100%",
    // height: "6%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    // backgroundColor: "#0066FF",
    backgroundColor: colors.amberBackground,
  }
});
