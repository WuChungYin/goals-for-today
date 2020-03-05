import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView
} from "react-native";
import CustomActionButton from "../../components/CustomActionButton";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateTask } from "../../actions/task";
import Firebase, { db } from "../../config/Firebase";

class EditTodoScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      task: {},
      taskname: "",
      taskdesc: "",
      key: ""
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = db.collection("Tasks").doc(navigation.getParam("taskID"));
    ref.get().then(doc => {
      if (doc.exists) {
        const task = doc.data();
        this.setState({
          key: doc.id,
          taskname: task.Task_Name,
          taskdesc: task.Description,
          isLoading: false
        });
      } else {
        console.log("No task found");
      }
    });
  }
  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };
  handleUpdate = () => {
    this.props.updateTask(
      this.state.key,
      this.state.taskname,
      this.state.taskdesc
    );
    this.props.navigation.navigate("ViewTodoScreen");
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <ScrollView>
          <View style={styles.listItemContainerTop}>
            <Text style={styles.titleText}>Task Name:</Text>
            <TextInput
              style={styles.textInputName}
              onChangeText={text => this.updateTextInput(text, "taskname")}
              placeholder="Task Name"
              placeholderTextColor={colors.bgTextInputDark}
              value={this.state.taskname}
              maxLength={100}
            />
          </View>
          <View style={styles.listItemContainer}>
            <Text style={styles.titleText}>Description:</Text>
            <TextInput
              style={styles.textInputDesc}
              onChangeText={text => this.updateTextInput(text, "taskdesc")}
              placeholder="Description"
              placeholderTextColor={colors.bgTextInputDark}
              value={this.state.taskdesc}
              multiline={true}
              numberOfLines={4}
              maxLength={200}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <CustomActionButton
              onPress={this.handleUpdate}
              style={styles.editButton}
            >
              <Text style={styles.buttonText}>Update Task</Text>
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
    backgroundColor: colors.bgMain
  },
  listItemContainerTop: {
    marginTop: 10,
    paddingHorizontal: 10,
    marginHorizontal: 40
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
  },
  loginButtons: {
    borderWidth: 0.5,
    backgroundColor: "transparent",
    marginTop: 10,
    width: 200
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateTask }, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user,
    task: state.task
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTodoScreen);
