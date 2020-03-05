import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import PropTypes from "prop-types";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

import StatsStackNavigator from "./StatsStackNavigator.js";
import TodoStackNavigator from "./TodoStackNavigator.js";
import ProfileStackNavigator from "./ProfileStackNavigator.js";

const BottomTabNavigator = createBottomTabNavigator(
  {
    TodoScreen: {
      screen: TodoStackNavigator,
      navigationOptions: {
        tabBarLabel: "To Do",
        tabBarIcon: (
          <Ionicons name="ios-clipboard" color={colors.logoColor} size={45} />
        )
      }
    },
    ProfileScreen: {
      screen: ProfileStackNavigator,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: (
          <Ionicons name="ios-contact" color={colors.logoColor} size={45} />
        )
      }
    },
    StatScreen: {
      screen: StatsStackNavigator,
      navigationOptions: {
        tabBarLabel: "Statistics",
        tabBarIcon: (
          <Ionicons name="ios-stats" color={colors.logoColor} size={45} />
        )
      }
    }
  },
  {
    initialRouteName: "TodoScreen",
    order: ["StatScreen", "TodoScreen", "ProfileScreen"],
    tabBarOptions: {
      showLabel: true,
      tabBarVisible: true,
      activeTintColor: colors.logoColor,
      style: {
        height: 70,
        borderTopWidth: 1,
        backgroundColor: colors.txtWhite
      }
    }
  }
);

export default BottomTabNavigator;
