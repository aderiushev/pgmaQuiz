import React, { Component } from "react";
import Login from "./../screens/Login/";
import Home from "./../screens/Home/";
import Train from "./../screens/Train/";
import Exam from "./../screens/Exam/";
import Test from "./../screens/Test/";
import Archive from "./../screens/Archive/";
import Result from "./../screens/Result/";
import { DrawerNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
import SideBar from "../components/SideBar/";

const Router = DrawerNavigator(
  {  
    Login: { screen: Login },
    Home: { screen: Home },
    Train: { screen: Train },
    Exam: { screen: Exam },
    Archive: { screen: Archive },
    Test: { screen: Test },
    Result: { screen: Result },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export default Router