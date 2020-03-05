import React from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from "react-native";
import CustomActionButton from "../../components/CustomActionButton";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { user_logout } from "../../actions/user";
import Firebase from "../../config/Firebase";

class ProfileScreen extends React.Component {
  handleSignout = () => {
    this.props.user_logout();
    this.props.navigation.navigate("WelcomeScreen");
  };

  handleRedirectToEditProfile = () => {
    this.props.navigation.navigate("EditProfileScreen");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topItemContainer}>
          <Text style={styles.profileText}>{this.props.user.Username}</Text>
          <Text style={styles.fieldText}>Name</Text>
        </View>
        <View style={styles.listItemContainer}>
          <Text style={styles.profileText}>{this.props.user.Team}</Text>
          <Text style={styles.fieldText}>Team</Text>
        </View>
        <View style={styles.listItemContainer}>
          <Text style={styles.profileText}>{this.props.user.Email}</Text>
          <Text style={styles.fieldText}>Email</Text>
        </View>
        <View style={styles.buttonContainer}>
          <CustomActionButton
            style={styles.editButton}
            onPress={this.handleRedirectToEditProfile}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </CustomActionButton>

          <CustomActionButton
            style={styles.editButton}
            onPress={this.handleSignout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </CustomActionButton>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  topItemContainer: {
    marginTop: 50,
    paddingHorizontal: 10,
    marginHorizontal: 40
  },
  listItemContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    marginHorizontal: 40
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  profileText: {
    fontSize: 24,
    fontFamily: "Lora-Bold",
    color: "#315475"
  },
  fieldText: {
    fontSize: 18,
    fontFamily: "SourceSansPro-Regular",
    color: colors.logoColor
  },
  editButton: {
    width: 180,
    backgroundColor: "#c7e3ee",
    borderWidth: 0,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: 16,
    color: colors.txtDark
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ user_logout }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen);
