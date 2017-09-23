import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Right,
  Body,
  CardItem,
  Thumbnail,
  Card,
  View
} from "native-base";
import { Image } from 'react-native';

import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from "./styles";
import { shuffle } from './../../utils/common';
import questionImage from './../../assets/images/question.png';

class VariantComponent extends Component {

  render() {
    const { input, variant, isRight, isWrong, isDisabled, _onPress, ...restProps } = this.props

    return (
      <Button
        style={styles.variantBtn}
        success={isRight}
        danger={isWrong}
        onPress={() => {
          if (!isDisabled) {
            input.onChange(variant.id)
            _onPress(variant.id)
          }
        }}
        { ...restProps }
      >
        <Text style={styles.variantText}>{variant.text}</Text>
      </Button>
    )
  }
}

class Question extends Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.data.id !== nextProps.data.id) {
      this.setState({
        selectedVariantId: null
      })
    }
  }

  state = {
    selectedVariantId: null
  }

  render() {
    const {
      data,
      totalQuestionsCount,
      isCorrectAnswerDisplayed,
      isWrongAnswerDisplayed,
      questionDisplayTimeout,
      currentQuestionIdx
    } = this.props;
    const { selectedVariantId } = this.state;

    return (
      <View style={styles.mainView}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={questionImage} />
              <Body>
                <Text>Вопрос</Text>
                <Text note>{currentQuestionIdx + 1}/{totalQuestionsCount}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Body>
              <Text style={styles.question}>{data.text}</Text>
            </Body>
          </CardItem>
        </Card>

        <Grid style={styles.variantsGrid}>
          {data.variants.map((variant, idx) =>
            <Row key={idx}>
              <Col size={100} style={styles.variantCol}>
                <Field
                  name='variant'
                  component={VariantComponent}
                  variant={variant}
                  isDisabled={!!selectedVariantId}
                  isRight={selectedVariantId ? isCorrectAnswerDisplayed && (variant.id === data.answer) : false}
                  isWrong={selectedVariantId ? isWrongAnswerDisplayed && (selectedVariantId === variant.id) && selectedVariantId !== data.answer : false}
                  _onPress={(variantId) => {
                    this.setState({
                      selectedVariantId: variantId
                    })

                    setTimeout(() => {
                      this.props.handleSubmit()
                    }, questionDisplayTimeout)
                  }}
                />
              </Col>
            </Row>
          )}
        </Grid>
      </View>
    );
  }
}

const QuestionSwag = reduxForm(
  {
    form: 'quesion',
    onSubmit: (values, dispatch, props) => {
      props.onAnswer(values.variant === props.data.answer)
    }
  }
)(Question)

export default QuestionSwag;

