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
import { updateComment } from "../../actions/comment";
import Firebase, { db } from "../../config/Firebase";

class EditCommentScreen extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      comment: {},
      commenttext: "",
      key: ""
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = db.collection("Comments").doc(navigation.getParam("commentID"));
    ref.get().then(doc => {
      if (doc.exists) {
        const comment = doc.data();
        this.setState({
          key: doc.id,
          commenttext: comment.Comment_Text,
          isLoading: false
        });
      } else {
        console.log("No comment found");
      }
    });
  }
  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
  };
  handleUpdate = () => {
    this.props.updateComment(this.state.key, this.state.commenttext);
    this.props.navigation.navigate("ViewTodoScreen");
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <ScrollView>
          <View style={styles.listItemContainer}>
            <Text style={styles.titleText}>Comment:</Text>
            <TextInput
              style={styles.textInputComment}
              placeholder="Comment"
              onChangeText={text => this.updateTextInput(text, "commenttext")}
              placeholderTextColor={colors.bgTextInputDark}
              value={this.state.commenttext}
              multiline={true}
              numberOfLines={4}
              maxLength={500}
            />
          </View>
          <View style={{ alignItems: "center" }}>
            <CustomActionButton
              onPress={this.handleUpdate}
              style={styles.editButton}
            >
              <Text style={styles.buttonText}>Update Comment</Text>
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
  listItemContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginHorizontal: 40
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#315475",
    marginBottom: 5
  },
  textInputComment: {
    height: 150,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
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
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateComment }, dispatch);
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
)(EditCommentScreen);
