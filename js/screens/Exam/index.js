import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Title,
  Content,
  Text,
  View,
  Button,
  Icon,
  Left,
  Body,
  Label,
  Item,
  Right,
  Input,
  Form
} from "native-base";
import { Field, reduxForm } from "redux-form";

import Header from './../../components/Header';
import { openDrawer } from "./../../actions/drawer";
import screenStyles from './../styles';
import styles from "./styles"
import { prepareTest } from './../../actions/test';

class Exam extends Component {

  render() {
    const { navigation } = this.props

    return (
      <Container style={screenStyles.container}>
        <Header
          text='Экзамен'
          onMenuClick={() => navigation.navigate("DrawerOpen")}
        />
        <Content>
          <View style={screenStyles.mainView}>
            <Text>Описание тренировки и условия</Text>
            <Text>У вас будет 30 минут и 60 вопросов</Text>
            <Text>Для успешной сдачи экзамена вам необходимо решить 80% заданий (ответить правильно на 48 вопросов)</Text>

            <Button
              style={styles.startBtn}
              onPress={this.props.handleSubmit}
            >
              <Text>Начать экзамен</Text>
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
  exam: state.exam
});

Exam.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(
    {
      form: 'exam',
      onSubmit: (values, dispatch, props) => {
        dispatch(prepareTest('exam'))
        props.navigation.navigate("Test")
      }
    }
  )(Exam)
);
