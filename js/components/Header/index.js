import React, { Component } from "react";
import {
  Header as RnbHeader,
  Left,
  Button,
  Icon,
  Body,
  Title
} from "native-base";

import styles from "./styles";

class Header extends Component {

  render() {
    const { text, onMenuClick } = this.props;
   

    return (
      <RnbHeader>
        <Left>
          <Button
            transparent
            onPress={onMenuClick}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{text}</Title>
        </Body>
      </RnbHeader>
    );
  }
}

export default Header;

