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
  Right
} from "native-base";

import Header from './../../components/Header';
import { openDrawer } from "../../actions/drawer";
import screenStyles from './../styles';
import styles from "./styles";

class Home extends Component {
  static navigationOptions = {
    header: null
  };

  static propTypes = {
    user: React.PropTypes.object
  };

  render() {
    const { navigation, user } = this.props

    return (
      <Container style={screenStyles.container}>
        <Header
          text='Информация'
          onMenuClick={() => navigation.navigate("DrawerOpen")}
        />
        <Content>
          <View style={screenStyles.mainView}>
            <Text>Добро пожаловать, {user.name}</Text>
            <Text>Здесь будет общая информация о всех видах тестирования и общее описание приложения</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {

  };
}

const mapStateToProps = state => ({
  user: state.user
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);

HomeSwagger.navigationOptions = {
  header: null
};
export default HomeSwagger;
