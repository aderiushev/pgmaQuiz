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
import { setTrain } from './../../actions/train'
import { prepareTest } from './../../actions/test'
import screenStyles from './../styles';
import styles from "./styles";

const validate = values => {
  const errors = {}

  if (!values.totalQuestionsCount) {
    errors.totalQuestionsCount = 'Обязательное поле'
  } else if (!Number(values.totalQuestionsCount)) {
    errors.totalQuestionsCount = 'Введите число'
  } else if (Number(values.totalQuestionsCount) < 0 || Number(values.totalQuestionsCount) > 100) {
    errors.totalQuestionsCount = 'от 1 до 100'
  }

  return errors
};

class Train extends Component {

  renderInput = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
    inputProps
  }) => {
    const hasError = (error !== undefined && touched)

    return (
      <Item error={hasError}>
        <Icon active name='leaf' />
        <Input
          placeholder='Количество вопросов'
          {...input}
        />
        {hasError
          ? <Item style={{ borderColor: "transparent" }}>
              <Icon active style={{ color: "red", marginTop: 5 }} name="bug" />
              <Text style={{ fontSize: 15, color: "red" }}>{error}</Text>
            </Item>
          : <Text />}
      </Item>
    );
  }

  render() {
    const { navigation } = this.props

    return (
      <Container style={screenStyles.container}>
        <Header
          text='Тренировка'
          onMenuClick={() => navigation.navigate("DrawerOpen")}
        />
        <Content>
          <View style={screenStyles.mainView}>
            <Text>Описание тренировки и условия</Text>

   
            <Field
              name='totalQuestionsCount'
              component={this.renderInput}
            />

            <Button
              style={styles.startBtn}
              onPress={this.props.handleSubmit}
            >
              <Text>Начать тренировку</Text>
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
  train: state.train,
  initialValues: {
    totalQuestionsCount: String(state.train.totalQuestionsCount)
  }
});

Train.navigationOptions = {
  header: null
};

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm(
    {
      form: 'train',
      validate,
      onSubmit: (values, dispatch, props) => {
        dispatch(
          setTrain({
            totalQuestionsCount: Number(values.totalQuestionsCount)
          })
        )
        dispatch(prepareTest('train'))
        props.navigation.navigate("Test")
      }
    }
  )(Train)
);
