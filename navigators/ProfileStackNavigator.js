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

import ProfileScreen from "../screens/ProfileStackNavigator/ProfileScreen";
import EditProfileScreen from "../screens/ProfileStackNavigator/EditProfileScreen";

const ProfileStackNavigator = createStackNavigator(
  {
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: {
        title: "Profile",
        headerBackTitle: null
      }
    },
    EditProfileScreen: {
      screen: EditProfileScreen,
      navigationOptions: {
        title: "Edit Profile",
        headerBackTitle: "Back"
      }
    }
  },
  {
    initialRouteName: "ProfileScreen",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain
      }
    }
  }
);

export default ProfileStackNavigator;
