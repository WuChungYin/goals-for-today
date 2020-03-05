import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList
} from "react-native";
import CustomActionButton from "../../components/CustomActionButton";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  deleteTask,
  markAsCompleted,
  markAsIncomplete
} from "../../actions/task";
import { addComment, deleteComment } from "../../actions/comment";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import Firebase, { db } from "../../config/Firebase";
import Moment from "react-moment";

class ViewTodoScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      task: {},
      taskID: "",
      isAddCommentVisible: false,
      documentData: [],
      commentID: "",
      newcomment: ""
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        const ref = db.collection("Tasks").doc(navigation.getParam("taskID"));
        ref.get().then(doc => {
          if (doc.exists) {
            this.setState({
              task: doc.data(),
              taskID: doc.id,
              isLoading: false
            });
          } else {
            console.log("No task found");
          }
        });
      }
    );
    this.unsubscribe = db
      .collection("Comments")
      .where("Task_ID", "==", navigation.getParam("taskID"))
      .orderBy("Date_Created")
      .onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount = () => {
    this.willFocusSubscription.remove();
    this.unsubscribe();
  };

  onCollectionUpdate = querySnapshot => {
    const documentData = [];
    querySnapshot.forEach(doc => {
      const {
        Comment_Text,
        Author_Name,
        Comment_ID,
        Date_Created,
        uid
      } = doc.data();
      documentData.push({
        key: doc.id,
        doc, // DocumentSnapshot
        Comment_Text,
        Author_Name,
        Comment_ID,
        Date_Created,
        uid
      });
    });
    this.setState({
      documentData,
      isLoading: false
    });
    console.log("comment documentData = " + this.state.documentData);
  };

  handleDeleteTask = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "NO",
        onPress: () => console.log("NO pressed"),
        style: "cancel"
      },
      {
        text: "YES",
        onPress: () => {
          this.props.deleteTask(
            this.state.task.Task_ID,
            this.state.task.Status
          );
          this.props.navigation.navigate("TodoScreen");
        }
      }
    ]);
  };

  handleMarkAsCompleted = () => {
    this.props.markAsCompleted(this.state.task.Task_ID);
    this.props.navigation.navigate("TodoScreen");
  };

  handleMarkAsIncomplete = () => {
    this.props.markAsIncomplete(this.state.task.Task_ID);
    this.props.navigation.navigate("TodoScreen");
  };

  showAddComment = () => {
    this.setState({ isAddCommentVisible: true });
  };

  hideAddComment = () => {
    this.setState({ isAddCommentVisible: false });
  };

  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };

  handleAddComment = () => {
    this.props.addComment(this.state.task.Task_ID, this.state.newcomment);
    this.hideAddComment();
  };

  handleDeleteComment = item => {
    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete your comment?",
      [
        {
          text: "NO",
          onPress: () => console.log("NO pressed"),
          style: "cancel"
        },
        {
          text: "YES",
          onPress: () => {
            this.props.deleteComment(item);
          }
        }
      ]
    );
  };

  handleUpdateComment = item => {
    // this.props.navigation.navigate("EditCommentScreen");
    this.props.navigation.navigate("EditCommentScreen", {
      commentID: item.key
    });
  };

  renderItem = (item, index) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{item.Author_Name}</Text>
      <Text style={styles.commentText}>{item.Comment_Text}</Text>
      <View style={styles.commentRow}>
        <Text style={styles.commentDate}>
          {new Date(item.Date_Created).toString().slice(0, 24)}
        </Text>
        {this.props.user.uid == item.uid && (
          <View style={styles.commentRow}>
            <TouchableOpacity
              onPress={() => {
                this.handleUpdateComment(item);
              }}
            >
              <Text style={styles.commentChange}> - Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.handleDeleteComment(item);
              }}
            >
              <Text style={styles.commentChange}> - Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
        <SafeAreaView />

        <View style={styles.taskContainer}>
          <Text style={styles.taskName}>{this.state.task.Task_Name}</Text>
          <Text style={styles.taskDescription}>
            {this.state.task.Description}
          </Text>
        </View>
        <View style={styles.buttonRow}>
          <CustomActionButton
            style={styles.taskButtons}
            onPress={() =>
              this.props.navigation.navigate("EditTodoScreen", {
                taskID: this.state.taskID
              })
            }
          >
            <Text style={styles.taskButtonText}>Edit</Text>
          </CustomActionButton>
          <CustomActionButton
            style={styles.taskButtons}
            onPress={() => this.handleDeleteTask()}
          >
            <Text style={styles.taskButtonText}>Delete</Text>
          </CustomActionButton>

          {!this.state.task.Status && (
            <TouchableOpacity
              style={styles.taskButtons}
              onPress={() => this.handleMarkAsCompleted()}
            >
              <Text style={styles.taskButtonText}>Mark Complete</Text>
            </TouchableOpacity>
          )}
          {this.state.task.Status && (
            <TouchableOpacity
              style={styles.taskButtons}
              onPress={() => this.handleMarkAsIncomplete()}
            >
              <Text style={styles.taskButtonText}>Mark Incomplete</Text>
            </TouchableOpacity>
          )}

          <CustomActionButton
            style={styles.taskButtons}
            onPress={this.showAddComment}
          >
            <Text style={styles.taskButtonText}>Comment</Text>
          </CustomActionButton>
        </View>

        {this.state.isAddCommentVisible && (
          <View>
            <View style={styles.textInputContainer}>
              <TextInput
                onChangeText={text => this.updateTextInput(text, "newcomment")}
                style={styles.textInput}
                placeholder="Leave a Comment..."
                placeholderTextColor="grey"
                maxLength={500}
              />
              <CustomActionButton
                style={styles.checkmarkButton}
                onPress={this.handleAddComment}
              >
                <Ionicons name="ios-checkmark" color="white" size={40} />
              </CustomActionButton>
              <CustomActionButton
                style={styles.deleteButton}
                onPress={this.hideAddComment}
              >
                <Ionicons name="ios-close" color="white" size={40} />
              </CustomActionButton>
            </View>
          </View>
        )}
        <View style={styles.container}>
          <FlatList
            data={this.state.documentData}
            renderItem={({ item, index }) => this.renderItem(item, index)}
            keyExtractor={(item, index) => item.key}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                Be the first to leave a comment.
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
  taskContainer: {
    borderWidth: 0.5,
    borderColor: colors.goalIncompleteColor,
    alignItems: "center",
    margin: 10,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 7
  },
  commentRow: {
    alignItems: "center",
    flexDirection: "row"
  },
  listItemTitleContainer: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    paddingLeft: 5
  },
  taskName: {
    fontFamily: "SourceSansPro-Bold",
    justifyContent: "center",
    color: colors.txtDark,
    fontSize: 30,
    marginTop: 5,
    marginBottom: 10
  },
  commentText: {
    fontFamily: "SourceSansPro-Regular",
    color: colors.txtDark,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  },
  emptyText: {
    fontFamily: "SourceSansPro-Italic",
    color: colors.txtDark,
    fontSize: 16,
    margin: 20
  },
  commentAuthor: {
    fontFamily: "SourceSansPro-Bold",
    color: colors.txtDark,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  },
  commentDate: {
    fontFamily: "SourceSansPro-Italic",
    color: colors.txtDark,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
  },
  commentChange: {
    fontFamily: "SourceSansPro-Italic",
    color: colors.logoColor,
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5
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
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
    borderColor: colors.txtDark,
    borderWidth: 0.5,
    paddingHorizontal: 5,
    fontFamily: "SourceSansPro-Regular",
    borderRadius: 10
  },
  checkmarkButton: {
    backgroundColor: colors.bgSuccess
  },
  deleteButton: {
    backgroundColor: colors.bgError
  },
  taskDescription: {
    fontFamily: "SourceSansPro-Regular",
    justifyContent: "center",
    color: colors.txtDark,
    fontSize: 20
  },
  taskButtons: {
    height: 40,
    width: 80,
    backgroundColor: "#c7e3ee",
    borderWidth: 0,
    margin: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  taskButtonText: {
    fontWeight: "normal",
    alignItems: "center",
    justifyContent: "center",
    color: colors.txtDark
  },
  buttonRow: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  commentContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#deecf2",
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colors.comment
  }
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteTask,
      markAsCompleted,
      markAsIncomplete,
      addComment,
      deleteComment
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    task: state.task,
    comment: state.comment
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTodoScreen);
