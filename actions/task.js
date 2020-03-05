import Firebase, { db } from "../config/Firebase.js";

export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASKNAME = "UPDATE_TASKNAME";
export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const MARK_COMPLETED = "MARK_COMPLETED";
export const MARK_INCOMPLETE = "MARK_INCOMPLETE";

export const updateTaskName = Task_Name => {
  return {
    type: UPDATE_TASKNAME,
    payload: Task_Name
  };
};

export const updateDescription = Description => {
  return {
    type: UPDATE_DESCRIPTION,
    payload: Description
  };
};

export const markAsCompleted = Task_ID => {
  return async (dispatch, getState) => {
    try {
      const {
        uid,
        Email,
        Username,
        Team,
        Completed_Tasks,
        Tasks_To_Do
      } = getState().user;
      const task = {
        Status: true
      };
      const user = {
        uid: uid,
        Email: Email,
        Username: Username,
        Team: Team,
        Tasks_To_Do: Tasks_To_Do - 1,
        Completed_Tasks: Completed_Tasks + 1
      };
      var batch = db.batch();
      var taskRef = db.collection("Tasks").doc(Task_ID);
      batch.update(taskRef, task);
      var userRef = db.collection("Users").doc(uid);
      batch.update(userRef, user);
      batch.commit();
      dispatch({ type: MARK_COMPLETED, payload: user });
    } catch (e) {
      alert(e);
    }
  };
};

export const markAsIncomplete = Task_ID => {
  return async (dispatch, getState) => {
    try {
      const {
        uid,
        Email,
        Username,
        Team,
        Tasks_To_Do,
        Completed_Tasks
      } = getState().user;
      const task = {
        Status: false
      };
      const user = {
        uid: uid,
        Email: Email,
        Username: Username,
        Team: Team,
        Tasks_To_Do: Tasks_To_Do + 1,
        Completed_Tasks: Completed_Tasks - 1
      };
      var batch = db.batch();
      var taskRef = db.collection("Tasks").doc(Task_ID);
      batch.update(taskRef, task);
      var userRef = db.collection("Users").doc(uid);
      batch.update(userRef, user);
      batch.commit();
      dispatch({ type: MARK_INCOMPLETE, payload: user });
    } catch (e) {
      alert(e);
    }
  };
};

export const addTask = () => {
  return async (dispatch, getState) => {
    try {
      const {
        Email,
        Username,
        Completed_Tasks,
        uid,
        Team,
        Tasks_To_Do
      } = getState().user;
      const { Task_Name, Description } = getState().task;
      const response = await db.collection("Tasks").doc();
      if (response.id) {
        const user = {
          uid: uid,
          Email: Email,
          Username: Username,
          Team: Team,
          Tasks_To_Do: Tasks_To_Do + 1,
          Completed_Tasks: Completed_Tasks
        };
        const task = {
          Task_Name: Task_Name,
          Description: Description,
          Date_Created: Date.now(),
          Status: false,
          uid: uid,
          Username: Username,
          Team: Team,
          Task_ID: response.id
        };

        var batch = db.batch();
        var taskRef = db.collection("Tasks").doc(response.id);
        batch.set(taskRef, task);
        var userRef = db.collection("Users").doc(uid);
        batch.update(userRef, user);
        batch.commit();

        dispatch({ type: ADD_TASK, payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};

export const updateTask = (Task_ID, Task_Name, Description) => {
  return async (dispatch, getState) => {
    try {
      const task = {
        Task_ID: Task_ID,
        Task_Name: Task_Name,
        Description: Description
      };
      db.collection("Tasks")
        .doc(Task_ID)
        .update(task);
      dispatch({ type: UPDATE_TASK, payload: task });
    } catch (e) {
      alert(e);
    }
  };
};

export const deleteTask = (Task_ID, Status) => {
  return async (dispatch, getState) => {
    try {
      const {
        uid,
        Email,
        Username,
        Team,
        Completed_Tasks,
        Tasks_To_Do
      } = getState().user;
      var completed = Completed_Tasks;
      var todo = Tasks_To_Do;
      if (Status) {
        completed = Completed_Tasks - 1;
      } else {
        todo = Tasks_To_Do - 1;
      }
      const user = {
        uid: uid,
        Email: Email,
        Username: Username,
        Team: Team,
        Tasks_To_Do: todo,
        Completed_Tasks: completed
      };
      console.log("user: " + getState().user);
      db.collection("Tasks")
        .doc(Task_ID)
        .delete();
      db.collection("Users")
        .doc(uid)
        .update(user);

      dispatch({ type: DELETE_TASK, payload: user });
    } catch (e) {
      alert(e);
    }
  };
};
