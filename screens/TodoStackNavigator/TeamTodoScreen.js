import React, { Component } from "react";
import {
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
import Firebase, { db } from "../../config/Firebase";

class TeamTodoScreen extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      documentData: [],
      isAddNewGoalVisible: false,
      isLoading: true
    };
  }

  componentDidMount() {
    var team = this.props.user.Team;
    this.unsubscribe = db
      .collection("Tasks")
      .where("Team", "==", team)
      .orderBy("Date_Created")
      .onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = querySnapshot => {
    const documentData = [];
    querySnapshot.forEach(doc => {
      const { Username, Task_Name, Description, Task_ID, Status } = doc.data();
      documentData.push({
        key: doc.id,
        doc,
        Task_Name,
        Username,
        Description,
        Status,
        Task_ID
      });
    });
    this.setState({
      documentData,
      isLoading: false
    });
  };

  showAddNewGoal = () => {
    this.setState({ isAddNewGoalVisible: true });
  };

  hideAddNewGoal = () => {
    this.setState({ isAddNewGoalVisible: false });
  };

  handleRedirectToView = item => {
    this.props.navigation.navigate("ViewTeamTodoScreen", {
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
          <Text style={styles.taskUsername}>{item.Username}</Text>
          <Text style={styles.taskDescription}>{item.Description}</Text>
        </View>
      )}

      {item.Status === true && (
        <View style={styles.listItemContainerGrey}>
          <Text style={styles.taskNameGrey}>{item.Task_Name}</Text>
          <Text style={styles.taskUsernameGrey}>{item.Username}</Text>
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
      <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
        <SafeAreaView />
        <View style={styles.header}>
          <View style={styles.headerSpacer}></View>

          <Text style={styles.headerTitle}>{this.props.user.Team}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TodoScreen")}
            style={styles.headerButton}
          >
            <Ionicons name="ios-person" color="white" size={40} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={this.state.documentData}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={(item, index) => String(index)}
          ListEmptyComponent={
            <View style={styles.listEmptyComponent}>
              <Text style={styles.listEmptyComponentText}>
                You do not have any goals set.
              </Text>
            </View>
          }
        />

        <CustomActionButton
          position="right"
          style={styles.addNewGoalButton}
          onPress={this.showAddNewGoal}
        >
          <Text style={styles.addNewGoalButtonText}>+</Text>
        </CustomActionButton>

        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  headerSpacer: {
    margin: 10,
    width: 45,
    height: 45,
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
    fontSize: 20
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
  taskUsername: {
    fontFamily: "SourceSansPro-Regular",
    color: colors.txtDark,
    marginBottom: 10
  },
  taskUsernameGrey: {
    fontFamily: "SourceSansPro-Italic",
    color: colors.txtGrey,
    marginBottom: 10
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

const mapStateToProps = state => {
  return {
    user: state.user,
    task: state.task
  };
};

export default connect(mapStateToProps)(TeamTodoScreen);
