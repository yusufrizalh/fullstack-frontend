/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailArticle = () => {
  const { id } = useParams();
  const [articleObj, setArticleObj] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const apiUrl = `http://127.0.0.1:8001/articles/byid/${id}`;
    axios.get(apiUrl).then((response) => {
      console.log("RESPONSE: ", response);
      setArticleObj(response.data.data);
    });
    const apiUrlComments = `http://127.0.0.1:8001/comments/${id}`;
    axios.get(apiUrlComments).then((response) => {
      console.log("RESPONSE: ", response);
      setComments(response.data.data);
    });
  }, []); //* []: rendered on time only

  const addNewComment = () => {
    const apiUrlAddComment = "http://127.0.0.1:8001/comments";
    axios
      .post(
        apiUrlAddComment,
        {
          ArticleId: id,
          commentBody: newComment,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          const commentToAdded = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdded]);
          console.log("RESPONSE: ", response);
          toast.success(response.data.message);
          setNewComment("");
        }
      });
  };

  return (
    <div className="container mt-5 py-3 px-3">
      <h3 className="fw-bold">Detail Article with ID : {id}</h3>
      <hr />
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <span className="fw-bold">{articleObj.title}</span>
            </div>
            <div className="card-body">
              <p className="card-text">{articleObj.articleBody}</p>
            </div>
            `
            <div className="card-footer bg-primary text-white">
              Written by <span className="fw-bold">{articleObj.username}</span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <span className="fw-bold">Comment Section</span>
            </div>
          </div>
          <div className="card-body">
            <div className="shadow">
              {comments.map((comment) => {
                return (
                  <ul key={comment.id} className="list-group">
                    <li className="list-group-item">
                      <p>{comment.commentBody}</p>
                      <p className="text-primary">{comment.username}</p>
                    </li>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <span className="fw-bold">Add Comment</span>
            </div>
          </div>
          <div className="card-body">
            <div className="px-2 py-2">
              <input
                type="text"
                name="addcomment"
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
                className="form-control mb-3"
                placeholder="Please add your comment"
                autoComplete="off"
              />
              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={addNewComment}
              >
                Add Comment
              </button>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailArticle;
