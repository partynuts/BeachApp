import { StyleSheet } from 'react-native';
import colors from "./colors";

export const globalStyles = StyleSheet.create({
  textBold: {
    color: "black",
    fontWeight: "700",
    paddingBottom: 5,
    paddingTop: 5,
    textAlign: 'center'
  },
  imageBackground: {
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 0,
    minHeight: '100%',
  },
  scrollView: {
    padding: 40
  },
  card: {
    opacity: 0.75
  },
  resultsContainer: {
    position: "relative",
    padding: 5,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: colors.textWhite,
    backgroundColor: colors.textWhite,
    borderRadius: 5
  },
  eventElement: {
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    fontWeight: "700",
  },
  eventDetailWrapper: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  participantsWrapper: {
    backgroundColor: colors.textWhite,
    borderRadius: 5,
    width: '100%'
  },
  buttonCal: {
    width: "25%",
    height: "100%",
    padding: 5,
    borderRadius: 7,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.darkBlue,
    backgroundColor: colors.textWhite,
  },
});
