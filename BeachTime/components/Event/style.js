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
    fontSize: 16,
    marginBottom: 10
  },
  textResults: {
    color: "black",
    fontSize: 16,
    marginRight: 50
  },
  costsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
  resultsContainer: {
    position: "relative",
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white"
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  tableUser: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  column: {
    color: "white",
    fontSize: 18,
  },
  column1: {
    color: "white",
    fontSize: 16
  },
  column2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: "20%",
    color: "white",
    fontSize: 16,
    borderColor: 'red',
    borderWidth: 1,
  },
  externalPlayer: {
    color: "white",
    fontSize: 16,
    backgroundColor: "dodgerblue",
    paddingLeft: 10
  },
  calBtn: {
    backgroundColor: "#FF6347"
  },
  editBtn: {
    width: "20%",
    padding: 5,
    position: "absolute",
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: 'dodgerblue',
  },
  btnText: {
    fontSize: 16,
    color: "white",
  },
  buttonCal: {
    width: "100%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "purple",
  },
  icon: {
    marginLeft: 5
  }
});

export const stylesIos = StyleSheet.create({
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
    fontSize: 16,
    marginBottom: 10
  },
  textResults: {
    color: "black",
    fontSize: 16,
    marginRight: 50
  },
  costsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
  resultsContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white"
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  tableUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  column: {
    color: "white",
    fontSize: 18
  },
  column1: {
    // width: "50%",
    color: "white",
    fontSize: 16
  },
  column2: {
    color: "white",
    fontSize: 18,
    paddingRight: "10%"
  },
  externalPlayer: {
    color: "white",
    fontSize: 16,
    backgroundColor: "#0066FF",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  btnText: {
    fontSize: 18,
    color: "white",
  },
  button: {
    width: "100%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: "#0066FF",
  },
  buttonCal: {
    width: "100%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "purple",
  },
  textInput: {
    color: "white",
    fontSize: 18
  },
  editBtn: {
    width: "20%",
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: "#0066FF",
  },
});
