import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import CustomActionButton from "../../components/CustomActionButton";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  updateEmail,
  updatePassword,
  signup,
  updateTeamname,
  updateName,
  getUser
} from "../../actions/user";
import Firebase from "../../config/Firebase";

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamname: "",
      username: ""
    };
  }
  componentDidMount = () => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.getUser(user.uid);
        if (this.props.user != null) {
          this.props.navigation.navigate("TodoScreen");
        }
      } else {
        this.props.navigation.navigate("LoginStackNavigator");
      }
    });
  };

  componentWillUnmount = () => {
    this.setState({
      teamname: "",
      username: ""
    });
  };

  handleSignup = () => {
    console.log(this.props.user.Team);
    if (this.state.teamname != "") {
      if (this.state.username != "") {
        this.props.signup(this.state.teamname);
      } else {
        alert("Please enter a User name.");
      }
    } else {
      alert("Please enter a Team name.");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.goalsTitle}>
          <Text style={styles.titleText}>Goals For Today</Text>
          <Ionicons
            name="ios-checkmark-circle"
            size={40}
            color={colors.logoColor}
          />
        </View>
        <View style={styles.listItemContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={Username => this.props.updateName(Username)}
            placeholder="Name"
            placeholderTextColor={colors.bgTextInputDark}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={Team => this.setState({ teamname: Team })}
            placeholder="Team Name"
            placeholderTextColor={colors.bgTextInputDark}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email Address"
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={email => this.props.updateEmail(email)}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor={colors.bgTextInputDark}
            secureTextEntry={true}
            onChangeText={password => this.props.updatePassword(password)}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <CustomActionButton
            onPress={() => this.handleSignup()}
            style={styles.loginButtons}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </CustomActionButton>
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  goalsTitle: {
    margin: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#315475",
    marginHorizontal: 10,
    marginBottom: 4
  },
  listItemContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    marginHorizontal: 40
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginBottom: 20,
    padding: 10,
    fontFamily: "SourceSansPro-Regular",
    borderRadius: 10,
    color: colors.txtBlack,
    fontSize: 16
  },
  loginButtons: {
    width: 200,
    backgroundColor: "#c7e3ee",
    borderWidth: 0,
    marginBottom: 10,
    borderRadius: 10
  },
  buttonText: {
    fontFamily: "SourceSansPro-Regular",
    fontSize: 16,
    color: colors.txtDark
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateEmail,
      updatePassword,
      signup,
      updateName,
      updateTeamname,
      getUser
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);
