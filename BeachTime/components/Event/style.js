import { StyleSheet } from 'react-native';
import colors from "../../colors";

export const stylesAndroid = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  costsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  column: {
    color: colors.textWhite,
    fontSize: 18,
  },
  column1: {
    fontSize: 16
  },
  externalPlayer: {
    color: colors.textWhite,
    fontSize: 16,
    backgroundColor: colors.darkBlue,
    paddingLeft: 10
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textWhite,
  },
  btnTxtSecondary: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textWhite,
  },
  icon: {
    marginLeft: 5
  },
  eventBtns: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  }
});

export const stylesIos = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  costsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  column: {
    color: colors.textWhite,
    fontSize: 18
  },
  column1: {
    fontSize: 16
  },
  externalPlayer: {
    color: colors.textWhite,
    fontSize: 16,
    backgroundColor: colors.darkBlue,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  textInput: {
    color: colors.textWhite,
    fontSize: 18
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textWhite,
  },
  btnTxtSecondary: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textWhite,
  },
  eventBtns: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  }
});
