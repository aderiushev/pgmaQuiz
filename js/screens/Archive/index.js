import React, { Component } from "react";
import { AsyncStorage, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import {
  Container,
  Title,
  Badge,
  Content,
  Text,
  View,
  Button,
  Icon,
  Left,
  Body,
  Right,
  List,
  ListItem
} from "native-base";

import Header from './../../components/Header';
import { openDrawer } from "../../actions/drawer";
import screenStyles from './../styles';
import styles from "./styles";

class Archive extends Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    user: React.PropTypes.object
  };

  state = {
    list: []
  }

  componentDidMount() {
    AsyncStorage.getItem('@pgmaQuizStorage:history', (err, result) => {
      const list = result || '[]';
      this.setState({
        list: JSON.parse(list).reverse()
      })
    })
  }

  onClearHistory = () => {
    AsyncStorage.clear(() => {
      this.setState((state) => {
        return {
          list: []
        }
      })
    })
  }

  render() {
    const { navigation, user } = this.props
    const { list } = this.state

    return (
      <Container style={screenStyles.container}>
        <Header
          text='Архив'
          onMenuClick={() => navigation.navigate("DrawerOpen")}
        />
        <Content>
          <View style={screenStyles.mainView}>
            <Text>Архив прохождения тестирования</Text>
            <List>
              {list.map((item, index) => {
                const correctAnswersPercent = Math.round((item.correctAnswersCount * 100) / item.settings.totalQuestionsCount);

                const isPassed = item.settings.minAcceptablePercent ? correctAnswersPercent >= item.settings.minAcceptablePercent : true;

                let itemStyles = {};

                if (item.mode === 'exam') {
                  if (isPassed) {
                    itemStyles = { ...itemStyles, ...styles.successItem }
                  } else {
                    itemStyles = { ...itemStyles, ...styles.failureItem }
                  }
                } else {
                  itemStyles = { ...itemStyles, ...styles.defaultItem }
                }

                return (
                  <ListItem key={index} style={itemStyles}>
                    <Body>
                      <Text
                        style={styles.modeTitle}
                      >
                        {item.date}
                        {item.mode === 'exam' ? ` Экзамен` : ` Тренировка`}
                        {item.mode === 'exam' ? (isPassed ? ` сдан` : ` не сдан`) : null}
                        {item.mode === 'exam' ? ` (${Math.round(moment.duration(item.secondsSpent, 's').asMinutes())}мин.)` : null}
                      </Text>
                    </Body>
                    <Right>
                      <Badge warning>
                        <Text>{correctAnswersPercent}%</Text>
                      </Badge>
                    </Right>
                  </ListItem>
                )
              })}
            </List>
            <Button style={styles.clearBtn} onPress={this.onClearHistory}>
              <Text>Очистить историю</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

const mapStateToProps = state => ({
  user: state.user
});


Archive.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Archive);
