import Firebase, { db } from "../config/Firebase.js";

export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const UPDATE_NAME = "UPDATE_NAME";
export const UPDATE_TEAMNAME = "UPDATE_TEAMNAME";
export const LOGIN = "LOGIN";
export const SIGNUP = "SIGNUP";
export const USER_LOGOUT = "USER_LOGOUT";
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const updateEmail = Email => {
  return {
    type: UPDATE_EMAIL,
    payload: Email
  };
};

export const updatePassword = password => {
  return {
    type: UPDATE_PASSWORD,
    payload: password
  };
};

export const updateName = Username => {
  return {
    type: UPDATE_NAME,
    payload: Username
  };
};

export const updateTeamname = Team => {
  return {
    type: UPDATE_TEAMNAME,
    payload: Team
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { Email, password } = getState().user;
      const response = await Firebase.auth().signInWithEmailAndPassword(
        Email,
        password
      );

      dispatch(getUser(response.user.uid));
    } catch (e) {
      alert(e);
    }
  };
};

export const getUser = uid => {
  return async (dispatch, getState) => {
    try {
      const user = await db
        .collection("Users")
        .doc(uid)
        .get();
      dispatch({ type: LOGIN, payload: user.data() });
    } catch (e) {
      alert(e);
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { Email, password, Username, Team } = getState().user;
      const response = await Firebase.auth().createUserWithEmailAndPassword(
        Email,
        password
      );
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          Email: Email,
          Username: Username,
          Team: Team,
          Completed_Tasks: 0,
          Tasks_To_Do: 0
        };

        db.collection("Users")
          .doc(response.user.uid)
          .set(user);

        dispatch({ type: SIGNUP, payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};

export const user_logout = () => async dispatch => {
  await Firebase.auth()
    .signOut()
    .then(() => {})
    .catch(error => {
      console.log(error);
    });
  dispatch({ type: USER_LOGOUT });
};

export const updateProfile = (Username, Team) => {
  return async (dispatch, getState) => {
    try {
      const { uid, Email, Completed_Tasks, Tasks_To_Do } = getState().user;

      const user = {
        uid: uid,
        Email: Email,
        Username: Username,
        Team: Team,
        Completed_Tasks: Completed_Tasks,
        Tasks_To_Do: Tasks_To_Do
      };

      db.collection("Users")
        .doc(uid)
        .set(user);

      const collection = db.collection("Tasks");

      const newName = {
        Username: Username,
        Team: Team
      };

      const commentName = {
        Author_Name: Username,
        Teamname: Team
      };

      collection
        .where("uid", "==", uid)
        .get()
        .then(response => {
          let batch = db.batch();
          response.docs.forEach(doc => {
            const docRef = db.collection("Tasks").doc(doc.id);
            batch.update(docRef, newName);
          });
          batch.commit().then(() => {
            console.log("updated all documents inside Tasks");
          });
        });

      const commentRef = db.collection("Comments");

      commentRef
        .where("uid", "==", uid)
        .get()
        .then(response => {
          let batch = db.batch();
          response.docs.forEach(doc => {
            const docRef = db.collection("Comments").doc(doc.id);
            batch.update(docRef, commentName);
          });
          batch.commit().then(() => {
            console.log("updated all documents inside Comments");
          });
        });

      dispatch({ type: UPDATE_PROFILE, payload: user });
    } catch (e) {
      alert(e);
    }
  };
};
