import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import colors from "../../assets/colors";
import Firebase, { db } from "../../config/Firebase";
class TeamStatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completedCount: 0,
      todoCount: 0
    };
  }
  componentDidMount = () => {
    try {
      this.retrieveTodo();
      this.retrieveCompleted();

      this.willFocusSubscription = this.props.navigation.addListener(
        "willFocus",
        () => {
          this.retrieveTodo();
          this.retrieveCompleted();
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUnmount = () => {
    this.willFocusSubscription.remove();
  };

  retrieveCompleted = async () => {
    let documentSnapshots = await db
      .collection("Tasks")
      .where("Team", "==", this.props.user.Team)
      .where("Status", "==", true)
      .orderBy("Date_Created")
      .get();
    this.setState({ completedCount: documentSnapshots.size });
  };

  retrieveTodo = async () => {
    let documentSnapshot2 = await db
      .collection("Tasks")
      .where("Team", "==", this.props.user.Team)
      .where("Status", "==", false)
      .orderBy("Date_Created")
      .get();
    this.setState({ todoCount: documentSnapshot2.size });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerSpacer}></View>
          <Text style={styles.headerTitle}>{this.props.user.Team}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("StatScreen")}
            style={styles.headerButton}
          >
            <Ionicons name="ios-person" color="white" size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.completed}>
          <Text style={styles.statusText}> Completed Tasks:</Text>
          <Text style={styles.numberText}>{this.state.completedCount}</Text>
        </View>
        <View style={styles.toDo}>
          <Text style={styles.statusText}> Tasks Left To Do:</Text>
          <Text style={styles.numberText}>{this.state.todoCount}</Text>
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
  completed: {
    flex: 2,
    backgroundColor: colors.logoColor,
    justifyContent: "center",
    alignItems: "center"
  },
  statusText: {
    fontSize: 28
  },
  numberText: {
    fontSize: 40,
    fontWeight: "bold"
  },
  toDo: {
    flex: 2,
    backgroundColor: colors.txtWhite,
    justifyContent: "center",
    alignItems: "center"
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
  }
});

//This is a function that maps the REDUX state to the PROP for this component
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

// This is a function that is going to return
export default connect(mapStateToProps)(TeamStatScreen);
