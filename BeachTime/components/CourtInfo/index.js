import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import { styles } from './style';
import { apiHost } from "../../config";
import * as Linking from "expo-linking";
import { Button, Card, Paragraph, Title } from 'react-native-paper';
import colors from "../../colors";
import { globalStyles } from "../../global-styles";

const court = require('../../assets/court.jpg');

export default class CourtInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCardContent: false
    }
  }

  async componentDidMount() {
    await fetch(
      `${apiHost}/courtsinfo`,
      {
        method: "GET"
      },
    )
      .then(res => res.json())
      .then(resp => {
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
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={court}
          style={globalStyles.imageBackground}>
          {this.state.allCourtsInfo &&
          <ScrollView
            contentContainerStyle={globalStyles.contentContainer}
            style={styles.scrollView}
          >
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
                        mode='outlined'
                        color={colors.darkBlue}
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
          </ScrollView>
          }
        </ImageBackground>
      </SafeAreaView>
    );
  }
}


