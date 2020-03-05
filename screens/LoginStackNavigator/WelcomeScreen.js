import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcome}>
          <Text style={styles.titleText}>Goals For Today</Text>
          <Ionicons
            name="ios-checkmark-circle"
            size={50}
            color={colors.logoColor}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <CustomActionButton
            style={styles.welcomeButtons}
            onPress={() => this.props.navigation.navigate("LoginScreen")}
          >
            <Text style={styles.welcomeButtonText}>Log In</Text>
          </CustomActionButton>
          <CustomActionButton
            style={styles.welcomeButtons}
            onPress={() => this.props.navigation.navigate("SignUpScreen")}
          >
            <Text style={styles.welcomeButtonText}>Sign Up</Text>
          </CustomActionButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 40,
    padding: 10,
    marginBottom: 10,
    color: colors.txtDark
  },
  welcomeButtons: {
    width: 200,
    backgroundColor: "#c7e3ee",
    borderWidth: 0,
    marginBottom: 10,
    borderRadius: 10
  },
  welcomeButtonText: {
    fontWeight: "normal",
    color: colors.txtDark
  }
});

export default WelcomeScreen;
