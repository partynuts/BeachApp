import { StyleSheet } from 'react-native';

export const stylesAndroid = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 40,
    backgroundColor: 'orange'
  },
  text: {
    marginTop: 30,
    fontWeight: "700",
    color: "white"
  }
});

export const stylesIos = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 40,
    backgroundColor: 'orange'
  },
  text: {
    marginTop: 30,
    fontWeight: "700",
    color: "white"
  },
  btnText: {
    // marginTop: 30,
    // fontWeight: "700",
    fontSize: 20,
    color: "white",
    paddingTop: "2%"
  },
  button: {
    width: "100%",
    height: "6%",
    flexDirection: 'row',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderColor: "red",
    borderRadius: 7,
    backgroundColor: "#0066FF",
  }
});
