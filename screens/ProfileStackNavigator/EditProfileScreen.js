import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  Alert
} from "react-native";
import CustomActionButton from "../../components/CustomActionButton";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/user";
import Firebase from "../../config/Firebase";

class EditProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      teamname: ""
    };
  }

  componentDidMount() {
    this.setState({
      username: this.props.user.Username,
      teamname: this.props.user.Team
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  handleUpdate = () => {
    if (this.state.username != "") {
      if (this.state.teamname != "") {
        this.props.updateProfile(this.state.username, this.state.teamname);
        this.props.navigation.navigate("ProfileScreen");
      } else {
        alert("Please enter a Team name");
      }
    } else {
      alert("Please enter a Username");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <ScrollView>
          <View style={styles.listItemContainer}>
            <Text style={styles.titleText}>Name:</Text>
            <TextInput
              style={styles.textInputName}
              onChangeText={text => this.updateTextInput(text, "username")}
              placeholder="Name"
              placeholderTextColor={colors.bgTextInputDark}
              value={this.state.username}
            />
          </View>
          <View style={styles.listItemContainer}>
            <Text style={styles.titleText}>Team:</Text>
            <TextInput
              style={styles.textInputName}
              onChangeText={text => this.updateTextInput(text, "teamname")}
              placeholder="Team Name"
              placeholderTextColor={colors.bgTextInputDark}
              value={this.state.teamname}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomActionButton
              onPress={this.handleUpdate}
              style={styles.editButton}
            >
              <Text style={styles.buttonText}>Update</Text>
            </CustomActionButton>
          </View>
        </ScrollView>
        <SafeAreaView />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.bgMain
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center"
  },
  listItemContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    marginHorizontal: 40
  },
  titleText: {
    fontSize: 20,
    fontFamily: "SourceSansPro-Bold",
    color: "#315475",
    marginBottom: 5
  },
  textInputName: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginBottom: 10,
    padding: 10,
    fontFamily: "SourceSansPro-Regular",
    borderRadius: 10,
    color: colors.txtBlack,
    fontSize: 16
  },
  textInputDesc: {
    height: 150,
    fontFamily: "SourceSansPro-Regular",
    fontSize: 16,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    color: colors.txtBlack
  },
  editButton: {
    width: 200,
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
  return bindActionCreators({ updateProfile }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileScreen);
