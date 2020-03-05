import { combineReducers } from "redux";
import {
  LOGIN,
  SIGNUP,
  UPDATE_PROFILE,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_NAME,
  UPDATE_TEAMNAME,
  USER_LOGOUT
} from "../actions/user";
import {
  ADD_TASK,
  UPDATE_TASKNAME,
  UPDATE_DESCRIPTION,
  UPDATE_TASK,
  DELETE_TASK,
  MARK_COMPLETED,
  MARK_INCOMPLETE
} from "../actions/task";
import {
  ADD_COMMENT,
  UPDATE_COMMENTTEXT,
  DELETE_COMMENT,
  UPDATE_COMMENT
} from "../actions/comment";

const initialState = {
  user: { undefined },
  task: { undefined }
};

const task = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TASKNAME:
      return { ...state, Task_Name: action.payload };
    case UPDATE_DESCRIPTION:
      return { ...state, Description: action.payload };

    case UPDATE_TASK:
      return action.payload;
    case DELETE_TASK:
      return action.payload;
    default:
      return state;
  }
};

const comment = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_COMMENTTEXT:
      return { ...state, Comment_Text: action.payload };
    case ADD_COMMENT:
      return action.payload;
    case DELETE_COMMENT:
      return { ...state, Comment_ID: null };
    case UPDATE_COMMENT:
      return action.payload;
    default:
      return state;
  }
};

const user = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case UPDATE_PROFILE:
      return action.payload;
    case UPDATE_EMAIL:
      return { ...state, Email: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_NAME:
      return { ...state, Username: action.payload };
    case UPDATE_TEAMNAME:
      return { ...state, Team: action.payload };
    case ADD_TASK:
      return action.payload;
    case MARK_COMPLETED:
      return action.payload;
    case MARK_INCOMPLETE:
      return action.payload;
    case DELETE_TASK:
      return action.payload;
    default:
      return state;
  }
};

const appReducer = combineReducers({
  user,
  comment,
  task
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = initialState;
    console.log("User logged out");
  }
  return appReducer(state, action);
};

export default rootReducer;
