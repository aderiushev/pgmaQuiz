import React, { Component } from "react";
import { Image, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
  Header,
  Left,
  Right,
  Body,
  Title
} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Field, reduxForm } from "redux-form";
import { setUser } from "../../actions/user";
import screenStyles from './../styles';
import styles from "./styles";

const nurseImage = require("./../../assets/images/nurse.png");

const validate = values => {
  const errors = {}

  if (!values.name) {
    errors.name = 'Обязательное поле'
  }

  return errors
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.renderInput = this.renderInput.bind(this);
  }

  renderInput({
    input,
    label,
    type,
    meta: { touched, error, warning },
    inputProps
  }) {
    const hasError = (error !== undefined && touched)

    return (
      <Item error={hasError}>
        <Icon active name={input.name === "name" ? "person" : ""} />
        <Input
          placeholder={input.name === "name" ? "Ф.И.О." : ''}
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
    return (
      <Container style={screenStyles.container}>
        <Header>
          <Body>
            <Title>Вход в систему</Title>
          </Body>
        </Header>
        <Content>
          <View style={screenStyles.mainView}>
            <Image
              source={nurseImage}
              style={styles.logo}
            />
            <Text style={styles.title}>Добро пожаловать в систему тестирования</Text>
            <Text style={styles.subtitle}>ПГМА 2017</Text> 

            <Text style={styles.authText}>Авторизуйтесь для продолжения</Text>
            <Field
              name="name" 
              component={this.renderInput}
            />
            <Button
              type='submit'
              style={styles.btn}
              onPress={this.props.handleSubmit}
            >
              <Text>Войти</Text>
            </Button>

          </View>
        </Content>
      </Container>
    );
  }
}

const LoginSwag = reduxForm(
  {
    form: 'login',
    validate,
    onSubmit: (values, dispatch, props) => {
      dispatch(
        setUser({
          name: values.name
        })
      )
      props.navigation.navigate("Home")
    }
  }
)(Login);

LoginSwag.navigationOptions = {
  header: null
};
export default LoginSwag;
