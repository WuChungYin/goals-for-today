import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import PropTypes from "prop-types";
import { createStackNavigator } from "react-navigation-stack";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from "../screens/LoginStackNavigator/LoginScreen";
import WelcomeScreen from "../screens/LoginStackNavigator/WelcomeScreen";
import SignUpScreen from "../screens/LoginStackNavigator/SignUpScreen";
import colors from "../assets/colors";

const LoginStackNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        headerShown: false,
        headerBackTitle: null
      }
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {
        title: "Log In",
        headerBackTitle: "Back"
      }
    },
    SignUpScreen: {
      screen: SignUpScreen,
      navigationOptions: {
        title: "Sign Up",
        headerBackTitle: "Back"
      }
    }
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain
      }
    }
  }
);

export default LoginStackNavigator;
