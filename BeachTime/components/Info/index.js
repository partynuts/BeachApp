import React from 'react';
import { ImageBackground, Platform, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Heading from "../Heading";
import WallOfShame from "../WallOfShame";
import { stylesAndroid, stylesIos } from './style';
import CourtInfo from "../CourtInfo";
import { Button as Btn, Card, Paragraph, Title } from 'react-native-paper';
import colors from '../../colors'

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default class Info extends React.Component {
  constructor(props) {
    super(props);
    console.log("PROPS IN Info >>>", props.route.params)
    const routeParams = props.route.params.userData;
    this.state = {
      username: routeParams.username,
      userId: routeParams.userId,
      errorMsg: null
    }
  }

  handleButtonPress(e, component) {
    e.preventDefault();
    this.props.navigation.navigate(component)
  }

  async onRefresh() {
    this.setState({
      refreshing: true
    });

    this.setState({
      refreshing: false
    });
  }

  render() {
    console.log("STATE IN Info", this.state.username)
    const styles = Platform.OS === 'ios' ? stylesIos : stylesAndroid;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: 'https://i.pinimg.com/originals/88/5a/fd/885afd3f8182489c0b729b161157d1e8.jpg' }}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            padding: 0
          }}>
          <ScrollView
            style={{ padding: 40 }}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}
          >
            <Heading navigation={this.props.navigation} />
            {this.state.errorMsg &&
            <Text>{this.state.errorMsg}</Text>
            }
            <Card
              elevation={10}
              style={styles.card}
            >
              <Card.Content>
                <Title>Info</Title>
                <Paragraph>Here is all the info you need for the Beachvolleyball places we play at.</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Btn mode='outlined' color={colors.darkBlue}
                  onPress={(e) => this.handleButtonPress(e, 'CourtInfo')}>
                  <Text>Court Operators</Text>
                </Btn>
              </Card.Actions>
            </Card>
            <Separator />

            <Card
              elevation={10}
              style={styles.card}
            >
              <Card.Content>
                <Title>Info</Title>
                <Paragraph>Want to know who should book the next round?</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Btn mode='outlined' color={colors.darkBlue}
                  onPress={(e) => this.handleButtonPress(e, 'WallOfShame')}>
                  <Text>Wall of shame</Text>
                </Btn>
              </Card.Actions>
            </Card>
            <Separator />
            <Separator />
            <Separator />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
