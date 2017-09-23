import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import Question from "./../../components/Question";
import Timer from "./../../components/Timer";
import Result from "./../../screens/Result";
import { addAnswer, changeTimeSpent } from './../../actions/test';
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
import { Grid, Row } from "react-native-easy-grid";

import { openDrawer } from "../../actions/drawer";
import testData from './../../assets/jsonData.json'
import { shuffle } from './../../utils/common'
import screenStyles from './../styles';
import styles from "./styles";

class Test extends Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    const questions = shuffle(testData.questions)
      .splice(0, props.settings.totalQuestionsCount)
      .map(question => ({ ...question, variants: shuffle(question.variants) }))

    this.state = {
      questions,
      currentQuestionIdx: 0,
      secondsSpent: 0
    }
  }

  handleOnAnswer = (isCorrectAnswer) => {
    this.props.addAnswer(isCorrectAnswer)

    this.setState((state) => {
      return {
        ...state,
        currentQuestionIdx: state.currentQuestionIdx + 1
      }
    })
  }

  onTestFinish = () => {
    this.props.navigation.navigate('Result')
  }

  render() {
    const { test, settings } = this.props
    const { questions, answers, currentQuestionIdx, secondsSpent } = this.state

    const question = questions[currentQuestionIdx]
    const isLastQuestion = !questions[currentQuestionIdx + 1]

    return question ? (
      <Container style={screenStyles.container}>
        <Header>
          <Body>
            <Title>Тестирование</Title>
          </Body>
        </Header>
        <Content>
          <View style={screenStyles.mainView}>
            <Question
              isCorrectAnswerDisplayed={settings.isCorrectAnswerDisplayed}
              isWrongAnswerDisplayed={settings.isWrongAnswerDisplayed}
              questionDisplayTimeout={settings.questionDisplayTimeout}
              data={
                {
                  ...question,
                  variants: question.variants
                }
              }
              currentQuestionIdx={currentQuestionIdx}
              totalQuestionsCount={settings.totalQuestionsCount}
              onAnswer={(data) => {
                this.handleOnAnswer(data)
                if (isLastQuestion) {
                  this.onTestFinish()
                }
              }}
            />
            {settings.totalSecondsCount &&
              <Timer
                totalSecondsCount={settings.totalSecondsCount}
                onExpired={this.onTestFinish}
                onChange={(value) => {
                  changeTimeSpent(settings.totalSecondsCount - value)
                }}
              />
            }
            <Button
              danger
              onPress={this.onTestFinish}
            >
              <Text>Завершить</Text>
            </Button>
          </View>
        </Content>
      </Container>  
    ) : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addAnswer: (data) => dispatch(addAnswer(data)),
    changeTimeSpent: (seconds) => dispatch(changeTimeSpent(seconds))
  };
}

function mapStateToProps(state, ownProps) {
  return {
    test: state.test,
    settings: state[state.test.mode],
  }
}

Test.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
