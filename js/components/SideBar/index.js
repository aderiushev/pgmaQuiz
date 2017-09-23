import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
import navLogoImage from './../../assets/images/nav-logo.png';
import navBgImage from './../../assets/images/nav-bg.jpg';

const routes = [
  {name: "Вход", screen: 'Login' },
  {name: "Главная", screen: 'Home' },
  {name: "Тренировка", screen: 'Train' },
  {name: "Экзамен", screen: 'Exam' },
  {name: "Архив", screen: 'Archive' }
];

class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={navBgImage}
            style={{
              height: 200,
              width: '100%',
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              style={{ height: 146, width: 300 }}
              source={navLogoImage}
            />
          </Image>
          <List
            dataArray={routes}
            renderRow={route => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(route.screen)}>
                  <Text>{route.name}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default SideBar