import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import BottomTabNavigator from "./navigators/BottomTabNavigator";
import LoginStackNavigator from "./navigators/LoginStackNavigator";
import { Ionicons } from "@expo/vector-icons";
import CustomActionButton from "./components/CustomActionButton";
import colors from "./assets/colors";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import * as Font from "expo-font";
import reducer from "./reducers";

const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      "Lora-Regular": require("./assets/fonts/Lora-Regular.ttf"),
      "Lora-Bold": require("./assets/fonts/Lora-Bold.ttf"),
      "Lora-Italic": require("./assets/fonts/Lora-Italic.ttf"),
      "Lora-BoldItalic": require("./assets/fonts/Lora-BoldItalic.ttf"),
      "SourceSansPro-Regular": require("./assets/fonts/SourceSansPro-Regular.ttf"),
      "SourceSansPro-Bold": require("./assets/fonts/SourceSansPro-Bold.ttf"),
      "SourceSansPro-Italic": require("./assets/fonts/SourceSansPro-Italic.ttf"),
      "SourceSansPro-BoldItalic": require("./assets/fonts/SourceSansPro-BoldItalic.ttf")
    });
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoginStackNavigator,
  BottomTabNavigator
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
