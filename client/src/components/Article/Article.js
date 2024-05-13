import "./Article.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosWithToken } from "../../axiosWithToken";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineUpdate } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { MdRestore } from "react-icons/md";
import { FaRegCommentDots } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { BsEmojiFrown } from "react-icons/bs";

function Article() {
  let { state } = useLocation();
  let navigate = useNavigate();
  let { currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  let { register, handleSubmit } = useForm();
  let [comment, setComment] = useState("");
  let [articleEditStatus, setArticleEditStatus] = useState(false);
  let [currentArticle, setCurrentArticle] = useState(state);

  //enable edit state
  const enableEditState = () => {
    setArticleEditStatus(true);
  };

  //disable edit state
  const saveModifiedArticle = async (editedArticle) => {
    let modifiedArticle = { ...state, ...editedArticle };
    modifiedArticle.dateOfModification = new Date();
    //remove the _id
    delete modifiedArticle._id;
    let res = await axiosWithToken.put(
      "http://localhost:4000/author-api/article",
      modifiedArticle
    );
    if (res.data.message === "Artcile modified") {
      setArticleEditStatus(false);
      navigate(`/author-profile/article/${modifiedArticle.articleId}`, {
        state: res.data.article,
      });
    }
  };

  //detelet Article
  const deleteArticle = async () => {
    let art = { ...currentArticle };
    delete art._id;
    let res = await axiosWithToken.put(
      `http://localhost:4000/author-api/article/${currentArticle.articleId}`,
      art
    );
    if (res.data.message === "Article removed") {
      setCurrentArticle({ ...currentArticle, status: res.data.payload });
    }
  };

  //restore Article
  const restoreArticle = async () => {
    let art = { ...currentArticle };
    delete art._id;
    let res = await axiosWithToken.put(
      `http://localhost:4000/author-api/article/${currentArticle.articleId}`,
      art
    );
    if (res.data.message === "Article restored") {
      setCurrentArticle({ ...currentArticle, status: res.data.payload });
    }
  };

  //function to writeComment
  const writeComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    console.log(commentObj);
    let res = await axiosWithToken.post(
      `http://localhost:4000/user-api/comment/${state.articleId}`,
      commentObj
    );
    if (res.data.message === "comment posted") {
      setComment(res.data.message);
    }
  };

  //function to convert ISO Date to UTC Date
  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  return (
    <div>
      {articleEditStatus === false ? (
        <>
          <div className="d-flex justify-content-between mt-2 border-bottom pb-4  ">
            <div>
              <h1>{state.title}</h1>
              <span>
                <small className=" fw-normal fs-5 me-3  text-info">
                  <LuCalendarClock className="text-primary" />
                  Created on {ISOtoUTC(state.dateOfCreation)}
                </small>
                <small className=" fw-normal fs-5  text-info">
                  <MdOutlineUpdate className="text-warning" />
                  Modified on {ISOtoUTC(state.dateOfModification)}
                </small>
              </span>
            </div>
            <div>
              {currentUser.userType === "author" && (
                <>
                  <button
                    onClick={enableEditState}
                    className="me-2 edit_btn"
                    style={{ backgroundColor: "none" }}
                  >
                    <FaRegEdit className="fs-1" />
                  </button>
                  {currentArticle.status === true ? (
                    <button
                      className="delete_btn"
                      style={{ backgroundColor: "none" }}
                      onClick={deleteArticle}
                    >
                      <MdDeleteOutline className="fs-1" />
                    </button>
                  ) : (
                    <button
                      className="delete_btn"
                      style={{ backgroundColor: "none" }}
                      onClick={restoreArticle}
                    >
                      <MdRestore className="fs-1" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <p className="mt-4 mb-4" style={{ whiteSpace: "pre-line" }}>
            {state.content}
          </p>

          {/* Read the existing comments */}
          <div className="my-2">
            {state.comments.length === 0 ? (
              <p className="fs-5 text-secondary fw-normal">
                No comments yet <BsEmojiFrown className="text-warning fs-5" />{" "}
                Add One to Start Conversion.
              </p>
            ) : (
              state.comments.map((commentObj, index) => {
                return (
                  <div className="mt-2">
                    <div className="d-flex">
                      <div>
                        <VscAccount className="me-2 fs-2" />
                      </div>
                      <div>
                        <p className="fs-5 text-dark fw-medium ">
                          {commentObj.username}
                        </p>
                      </div>
                    </div>
                    <div
                      className=" p-1 rounded-bottom-3  rounded-end-3 w-75 ms-5 mb-2"
                      style={{ backgroundColor: "#DEDDDD" }}
                    >
                      <p className=" text-dark fs-5 ">
                        <FaRegCommentDots className="fs-4 mr-3 me-1" />
                        {commentObj.comment}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <h3>{comment}</h3>
          {currentUser.userType === "user" && (
            <form
              onSubmit={handleSubmit(writeComment)}
              className="bg-light border border-primary shadow rounded d-flex mb-4"
              style={{ alignItems: "center" }}
            >
              <input
                type="text"
                className="mb-4 bg-light  w-100 p-2"
                placeholder="Write your Comment here...."
                {...register("comment")}
                style={{ border: "none", outline: "none" }}
              />
              <div>
                <button type="submit" className="btn btn-light float-end me-2">
                  <LuSend className="fs-4 text-primary" />
                </button>
              </div>
            </form>
          )}
        </>
      ) : (
        <div className="border rounded p-2">
          <form onSubmit={handleSubmit(saveModifiedArticle)}>
            <div className="mb-3">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="title1 "
                {...register("title")}
                defaultValue={state.title}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Select a category
              </label>
              <select
                id="category"
                className="form-select"
                {...register("category")}
                defaultValue={state.category}
              >
                <option value="programming">Programming</option>
                <option value="machinelearning">MachineLearning</option>
                <option value="database">Database</option>
                <option value=""></option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="textarea">Content</label>
              <textarea
                name="content"
                id="content"
                rows="10"
                className="form-control"
                {...register("content")}
                defaultValue={state.content}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mx-auto d-block">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Article;
