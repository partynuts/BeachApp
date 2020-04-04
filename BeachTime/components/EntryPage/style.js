import { StyleSheet } from 'react-native';

export const stylesAndroid = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 40,
    backgroundColor: 'orange',
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white"
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 30
  }
});

export const stylesIos = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 40,
    backgroundColor: 'orange',
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white"
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 30
  },
  btnText: {
    fontSize: 20,
    color: "white",
    paddingTop: "2%"
  },
  button: {
    width: "100%",
    height: "6%",
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: "#0066FF",
  }
});
