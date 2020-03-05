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

import colors from "../assets/colors";

import StatScreen from "../screens/StatsStackNavigator/StatScreen";
import TeamStatScreen from "../screens/StatsStackNavigator/TeamStatScreen";

const StatsStackNavigator = createStackNavigator(
  {
    StatScreen: {
      screen: StatScreen,
      navigationOptions: {
        headerShown: false,
        headerBackTitle: null
      }
    },
    TeamStatScreen: {
      screen: TeamStatScreen,
      navigationOptions: {
        headerShown: false,
        headerBackTitle: null
      }
    }
  },
  {
    initialRouteName: "StatScreen",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain
      }
    }
  }
);

export default StatsStackNavigator;
