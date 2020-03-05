import Firebase, { db } from "../config/Firebase.js";

export const UPDATE_COMMENTTEXT = "UPDATE_COMMENTTEXT";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const UPDATE_COMMENT = "UPDATE_COMMENT";

export const updateCommentText = Comment_Text => {
  return {
    type: UPDATE_COMMENTTEXT,
    payload: Comment_Text
  };
};

export const addComment = (Task_ID, Comment_Text) => {
  return async (dispatch, getState) => {
    try {
      const { Username, uid, Team } = getState().user;
      const response = await db.collection("Comments").doc();
      if (response.id) {
        const comment = {
          uid: uid,
          Author_Name: Username,
          Teamname: Team,
          Comment_ID: response.id,
          Task_ID: Task_ID,
          Comment_Text: Comment_Text,
          Date_Created: Date.now()
        };

        db.collection("Comments")
          .doc(response.id)
          .set(comment);

        dispatch({ type: ADD_COMMENT, payload: { comment } });
      }
    } catch (e) {
      alert(e);
    }
  };
};

export const updateComment = (Comment_ID, Comment_Text) => {
  return async (dispatch, getState) => {
    try {
      const comment = {
        Comment_ID: Comment_ID,
        Comment_Text: Comment_Text,
        Date_Created: Date.now()
      };
      db.collection("Comments")
        .doc(Comment_ID)
        .update(comment);
      dispatch({ type: UPDATE_COMMENT, payload: comment });
    } catch (e) {
      alert(e);
    }
  };
};

export const deleteComment = item => {
  return async (dispatch, getState) => {
    try {
      const Comment_ID = item.Comment_ID;
      console.log("inside deleteComment, Comment_ID = " + Comment_ID);
      db.collection("Comments")
        .doc(Comment_ID)
        .delete();
      dispatch({ type: DELETE_COMMENT });
    } catch (e) {
      alert(e);
    }
  };
};
