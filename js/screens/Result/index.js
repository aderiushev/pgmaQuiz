import React, { Component } from "react";
import { AsyncStorage, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import moment from 'moment';
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  View,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";

import { openDrawer } from "../../actions/drawer";
import styles from "./styles";

class Result extends Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {

    AsyncStorage.getItem('@pgmaQuizStorage:history', (err, result) => {
      const existingItems = result || '[]';
      const newItem = {
        correctAnswersCount: this.props.test.answers.reduce((a, b) => (a + Number(b)), 0),
        mode: this.props.mode,
        settings: this.props.settings,
        secondsSpent: this.props.test.secondsSpent,
        date: moment().utc().format('DD.MM')
      };

      const newStorage = [...JSON.parse(existingItems), newItem]

      AsyncStorage.setItem('@pgmaQuizStorage:history', JSON.stringify(newStorage));
    })
  }

  static propTypes = {
  };

  render() {
    const { test, settings } = this.props

    const correctAnswersCount = test.answers.reduce((a, b) => (a + Number(b)), 0)
    const correctAnswersPercent = Math.round((correctAnswersCount * 100) / settings.totalQuestionsCount);
    const isPassed = settings.minAcceptablePercent ? correctAnswersPercent >= settings.minAcceptablePercent : true;

    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Информация</Title>
          </Body>
        </Header>
        <Content>
          <View style={styles.mainView}>
            <Text>Тест завершён</Text>
            <Text>Ваш результат: {correctAnswersCount}/{settings.totalQuestionsCount} ({correctAnswersPercent}%)</Text>
            <Text>Тест {isPassed ? 'сдан' : 'не сдан'}</Text>
            <Button style={styles.btn} onPress={() => this.props.navigation.navigate("Home")}>
              <Text>Завершить</Text>
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

function mapStateToProps(state, ownProps) {
  const mode = state.test.mode;

  return {
    test: state.test,
    mode,
    settings: state[mode]
  }
}

Result.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
