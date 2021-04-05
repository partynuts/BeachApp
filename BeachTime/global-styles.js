import { StyleSheet } from 'react-native';
import colors from "./colors";

export const globalStyles = StyleSheet.create({
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
});
