import { StyleSheet } from 'react-native';

export const stylesAndroid = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 40,
    backgroundColor: 'orange'
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white"
  },
  text: {
    color: "white",
    fontSize: 16
  },
  textResults: {
    color: "black",
    fontSize: 16
  },
  textBold: {
    color: "black",
    fontWeight: "700"
  },
  picker: {
    height: 40,
    width: 100,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 10
  },
  choiceContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  column: {},
  resultsContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white"
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
  },
  btnDisabled: {
    width: "100%",
    height: "6%",
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: 'deeppink'
  }
});
