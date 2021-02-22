import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView, View } from 'react-native';
import Heading from "../Heading";
import { styles } from './style';
import { apiHost } from "../../config";
import * as Linking from "expo-linking";
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import { Separator } from "../../helper";

export default class CourtInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCardContent: false
    }
  }

  async componentDidMount() {
    console.log("SGTRING", `${apiHost}/users`)
    await fetch(
      `${apiHost}/courtsinfo`,
      {
        method: "GET"
      },
    )
      .then(res => res.json())
      .then(resp => {
        console.log("======RESPONSE from GET In COURT INFO======", resp)
        this.setState({
          allCourtsInfo: resp
        });

      })
      .catch(e => {
        console.log(e)
      });
  }

  createBookingLink(court) {
    if (court.telephone.startsWith('0')) {
      return `tel:${court.telephone}`
    } else {
      return `http://${court.telephone}`
    }
  }

  selectCard(e, index) {
    this.setState({
      selectedItem: index
    });

  }

  render() {
    console.log("STATE IM RENDER VON COURT INFO", this.state)

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1513233552420-84d7157d6a35?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=952&q=80' }}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            padding: 0
          }}>
          {this.state.allCourtsInfo &&
          <ScrollView style={styles.scrollView}>
            {this.state.allCourtsInfo.map((court, index) =>
              <Card
                elevation={10}
                style={styles.card}
                onPress={(e) => this.selectCard(e, index)}
                key={index}>
                {index === this.state.selectedItem ?
                  <Card.Content>
                    <Title>{court.courts_name}</Title>
                    <Paragraph>{court.address}</Paragraph>
                    <Paragraph>{court.time}</Paragraph>
                    <Card.Actions>
                      <Button
                        onPress={() => Linking.openURL(this.createBookingLink(court))}>{court.telephone}
                      </Button>
                    </Card.Actions>
                  </Card.Content> :
                  <Card.Content>
                    <Title>{court.courts_name}</Title>
                  </Card.Content>
                }
              </Card>
            )
            }
            <Separator />
            <Separator />
            <Separator />
            <Separator />
          </ScrollView>
          }
        </ImageBackground>
      </SafeAreaView>
    );
  }
}


