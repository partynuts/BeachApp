import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default function Heading() {

    return (
      <View>
        <Text style={styles.heading}>Beach Time </Text>
      <Separator/>
      </View>
    )
  }

const styles = StyleSheet.create({
  heading: {
    marginBottom: 10,
    color: "white"
  }
});
