import React, { Component } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addTask, updateTaskName, updateDescription } from "../../actions/task";
import Firebase, { db } from "../../config/Firebase";

class TodoScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      documentData: [],
      isAddNewGoalVisible: false,
      isLoading: true,
      taskname: "",
      taskdesc: ""
    };
  }

  componentDidMount() {
    var curUser = Firebase.auth().currentUser;
    this.unsubscribe = db
      .collection("Tasks")
      .where("uid", "==", curUser.uid)
      .orderBy("Date_Created")
      .onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    const documentData = [];
    querySnapshot.forEach(doc => {
      const { Task_Name, Description, Task_ID, Status } = doc.data();
      documentData.push({
        key: doc.id,
        doc, // DocumentSnapshot
        Task_Name,
        Description,
        Status,
        Task_ID
      });
    });
    this.setState({
      documentData,
      isLoading: false
    });
    console.log("documentData = " + this.state.documentData);
  };

  showAddNewGoal = () => {
    this.setState({ isAddNewGoalVisible: true });
  };

  hideAddNewGoal = () => {
    this.setState({ isAddNewGoalVisible: false, taskname: "", taskdesc: "" });
  };

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  handleAddGoal = () => {
    if (this.state.taskname != "") {
      if (this.state.taskdesc != "") {
        this.props.addTask(this.state.taskname, this.state.taskdesc);
        this.hideAddNewGoal();
      } else {
        alert(
          "Please enter a task description between 1 and 200 characters long."
        );
      }
    } else {
      alert("Please enter a task name between 1 and 100 characters long.");
    }
  };

  markAsCompleted = () => {};

  handleRedirectToView = item => {
    this.props.navigation.navigate("ViewTodoScreen", {
      taskID: item.key
    });
  };

  renderItem = (item, index) => (
    <TouchableOpacity
      onPress={() => {
        this.handleRedirectToView(item);
      }}
    >
      {item.Status === false && (
        <View style={styles.listItemContainer}>
          <Text style={styles.taskName}>{item.Task_Name}</Text>
          <Text style={styles.taskDescription}>{item.Description}</Text>
        </View>
      )}

      {item.Status === true && (
        <View style={styles.listItemContainerGrey}>
          <Text style={styles.taskNameGrey}>{item.Task_Name}</Text>
          <Text style={styles.taskDescriptionGrey}>{item.Description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      );
    }
    return (
      <View style={styles.todoContainer}>
        <SafeAreaView />
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={this.showAddNewGoal}
          >
            <Ionicons name="ios-add" color="white" size={40} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{this.props.user.Username}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TeamTodoScreen")}
            style={styles.headerButton}
          >
            <Ionicons name="ios-people" color="white" size={40} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          {this.state.isAddNewGoalVisible && (
            <View>
              <View style={styles.textInputContainer}>
                <TextInput
                  onChangeText={text => this.updateTextInput(text, "taskname")}
                  style={styles.textInput}
                  placeholder="Enter New Goal"
                  placeholderTextColor="grey"
                  maxLength={100}
                />
              </View>
              <View style={styles.textInputContainer}>
                <TextInput
                  onChangeText={text => this.updateTextInput(text, "taskdesc")}
                  style={styles.textInput}
                  placeholder="Enter Description"
                  placeholderTextColor="grey"
                  maxLength={200}
                />
                <CustomActionButton
                  style={styles.checkmarkButton}
                  onPress={this.handleAddGoal}
                >
                  <Ionicons name="ios-checkmark" color="white" size={40} />
                </CustomActionButton>
                <CustomActionButton
                  style={styles.deleteButton}
                  onPress={this.hideAddNewGoal}
                >
                  <Ionicons name="ios-close" color="white" size={40} />
                </CustomActionButton>
              </View>
            </View>
          )}

          <FlatList
            data={this.state.documentData}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            keyExtractor={(item, index) => item.key}
            ListEmptyComponent={
              <Text style={styles.listEmptyComponentText}>
                You do not have any goals set.
              </Text>
            }
          />
        </View>

        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  todoContainer: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  headerButton: {
    margin: 10,
    backgroundColor: colors.logoColor,
    borderRadius: 25,
    width: 45,
    height: 45,
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 28,
    color: "#172e38",
    fontFamily: "Lora-Bold"
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center"
  },
  listEmptyComponentText: {
    fontFamily: "SourceSansPro-Italic",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 20
  },
  textInputContainer: {
    height: 50,
    flexDirection: "row",
    marginBottom: 5
  },
  textInputContainer2: {
    height: 50,
    flexDirection: "row"
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.bgTextInput,
    paddingLeft: 5,
    fontFamily: "SourceSansPro-Regular"
  },
  checkmarkButton: {
    backgroundColor: colors.bgSuccess
  },
  deleteButton: {
    backgroundColor: colors.bgError
  },
  listItemContainer: {
    margin: 10,
    padding: 16,
    backgroundColor: "#deecf2",
    borderRadius: 7
  },
  listItemContainerGrey: {
    margin: 10,
    padding: 16,
    backgroundColor: "#dde0e2",
    marginHorizontal: 10,
    borderRadius: 7
  },
  taskName: {
    fontFamily: "SourceSansPro-Bold",
    color: colors.txtDark,
    marginBottom: 10
  },
  taskNameGrey: {
    fontFamily: "SourceSansPro-BoldItalic",
    color: colors.txtGrey,
    marginBottom: 10
  },
  taskDescription: {
    fontFamily: "SourceSansPro-Regular",
    color: colors.txtDark
  },
  taskDescriptionGrey: {
    fontFamily: "SourceSansPro-Italic",
    color: colors.txtGrey
  },
  addNewGoalButton: {
    backgroundColor: colors.logoColor,
    borderRadius: 25
  },
  addNewGoalButtonText: {
    color: "white",
    fontSize: 30
  },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
    flexDirection: "row"
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { addTask, updateTaskName, updateDescription },
    dispatch
  );
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
)(TodoScreen);
