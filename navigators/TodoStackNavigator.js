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

import TodoScreen from "../screens/TodoStackNavigator/TodoScreen";
import ViewTodoScreen from "../screens/TodoStackNavigator/ViewTodoScreen";
import EditTodoScreen from "../screens/TodoStackNavigator/EditTodoScreen";
import TeamTodoScreen from "../screens/TodoStackNavigator/TeamTodoScreen";
import ViewTeamTodoScreen from "../screens/TodoStackNavigator/ViewTeamTodoScreen";
import EditCommentScreen from "../screens/TodoStackNavigator/EditCommentScreen";
import EditTeamCommentScreen from "../screens/TodoStackNavigator/EditTeamCommentScreen";

const TodoStackNavigator = createStackNavigator(
  {
    TodoScreen: {
      screen: TodoScreen,
      navigationOptions: {
        headerShown: false,
        headerBackTitle: null
      }
    },
    ViewTodoScreen: {
      screen: ViewTodoScreen,
      navigationOptions: {
        title: "View Your Task",
        headerBackTitle: "Back"
      }
    },
    TeamTodoScreen: {
      screen: TeamTodoScreen,
      navigationOptions: {
        headerShown: false,
        headerBackTitle: "Back"
      }
    },
    ViewTeamTodoScreen: {
      screen: ViewTeamTodoScreen,
      navigationOptions: {
        title: "View Team Task",
        headerBackTitle: "Back"
      }
    },
    EditTodoScreen: {
      screen: EditTodoScreen,
      navigationOptions: {
        title: "Edit Your Task",
        headerBackTitle: "Back"
      }
    },
    EditTeamCommentScreen: {
      screen: EditTeamCommentScreen,
      navigationOptions: {
        title: "Edit Your Comment",
        headerBackTitle: "Back"
      }
    },
    EditCommentScreen: {
      screen: EditCommentScreen,
      navigationOptions: {
        title: "Edit Your Comment",
        headerBackTitle: "Back"
      }
    }
  },
  {
    initialRouteName: "TodoScreen",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain
      }
    }
  }
);

export default TodoStackNavigator;
