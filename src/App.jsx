/* eslint-disable react-hooks/exhaustive-deps */
/*
 * React components bisa dibuat dalam 2 cara:
 * 1> Class Component
 * 2> Functional Component (Regular & Arrow)
 *    > Regular function: function componentName() {}
 *    > Arrow function: const componentName = () => {}
 */

//* Class Component
import { useEffect, useState } from "react";
//* import "./App.css";
import axios from "axios";
// import NavbarComponent from "./layouts/Navbar";
import FooterComponent from "./layouts/Footer";
import HomeComponent from "./pages/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import AboutComponent from "./pages/About";
import ContactComponent from "./pages/Contact";
import CreateArticle from "./pages/CreateArticle";
import DetailArticle from "./pages/DetailArticle";
import LoginComponent from "./pages/Login";
import RegisterComponent from "./pages/Register";
import { AuthContext } from "./helpers/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    username: "",
    status: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const apiUrlAuth = "https://localhost:8001/auth/auth";
    axios
      .get(apiUrlAuth, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            id: response.data.id,
            username: response.data.username,
            status: true,
          });
        }
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      id: 0,
      username: "",
      status: false,
    });
    navigate("/");
  };

  return (
    <div>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="container-fluid">
            <nav
              className="navbar navbar-expand-lg fixed-top"
              data-bs-theme="dark"
              style={{ backgroundColor: "#0a4275" }}
            >
              <div className="container">
                <Link className="navbar-brand" to="https://inixindo.id">
                  <img
                    src="https://i.ibb.co.com/MnPN2H8/Logo-X-Transparent-White.png"
                    alt="Logo-X"
                    width="30"
                    height="30"
                    className="d-inline-block align-text-top me-3"
                  />
                  My React App
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link to="/" className="nav-link">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">
                        About
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/contact">
                        Contact
                      </Link>
                    </li>
                    {authState.status ? (
                      <li className="nav-item">
                        <Link className="nav-link" to="/articles">
                          Articles
                        </Link>
                      </li>
                    ) : (
                      <li className="nav-item"></li>
                    )}
                  </ul>
                  {!authState.status ? (
                    <ul className="navbar-nav mb-2 mb-lg-0">
                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link dropdown-toggle"
                          to="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          User Area
                        </Link>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link to="/register" className="dropdown-item">
                              Register
                            </Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li className="nav-item">
                            <Link to="/login" className="dropdown-item">
                              Login
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  ) : (
                    <ul className="navbar-nav mb-2 mb-lg-0">
                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link dropdown-toggle"
                          to="#"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {authState.username}
                        </Link>
                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <Link to="/profile" className="dropdown-item">
                              Profile
                            </Link>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li className="nav-item">
                            <Link
                              onClick={handleLogout}
                              className="dropdown-item"
                            >
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </nav>
            ;
          </div>
          <Routes>
            <Route path="/" element={<HomeComponent />}></Route>
            <Route path="/about" element={<AboutComponent />}></Route>
            <Route path="/contact" element={<ContactComponent />}></Route>
            <Route path="/articles" element={<ArticlesComponent />}></Route>
            <Route path="/createarticle" element={<CreateArticle />}></Route>
            <Route path="/article/:id" element={<DetailArticle />}></Route>
            <Route path="/login" element={<LoginComponent />}></Route>
            <Route path="/register" element={<RegisterComponent />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          <FooterComponent />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

//* Functional Component (regular function)
export function TitleComponent() {
  return (
    <div>
      <h1>Title Component</h1>
      <p>This is a functional component.</p>
    </div>
  );
}

//* Functional Component (arrow function)
export const DescriptionComponent = () => {
  return (
    <div>
      <h2>Description Component</h2>
      <p>This is a functional component with arrow function.</p>
    </div>
  );
};

export const ArticlesComponent = () => {
  const [articles, setArticles] = useState([]); //* nilai awal adalah empty array
  const [searchItem, setSearchItem] = useState("");
  const [filteredArticles, setFilteredArticles] = useState([]);
  const navigate = useNavigate();
  const [likedArticle, setLikedArticle] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      const apiUrl = "http://127.0.0.1:8001/articles";
      axios
        .get(apiUrl, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log("RESPONSE: ", response);
          setArticles(response.data.data);
          setFilteredArticles(response.data.data);
          setLikedArticle(
            response.data.likedArticle.map((liked) => {
              return liked.ArticleId; //* read liked on article by ArticleId
            })
          );
        });
    }
  }, []); //* []: only rendered one time

  const handleSearchInput = (event) => {
    const searchKeyword = event.target.value;
    setSearchItem(searchKeyword);
    const filteredItems = articles.filter(
      (found) =>
        found.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        found.username.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredArticles(filteredItems);
  };

  const addLikeArticle = (articleId) => {
    const apiUrlLikeArticle = "http://localhost:8001/likes";
    axios
      .post(
        apiUrlLikeArticle,
        {
          ArticleId: articleId,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setArticles(
          articles.map((article) => {
            if (article.id === articleId) {
              if (response.data.liked) {
                return { ...article, Likes: [...article.Likes, 0] };
              } else {
                const likesArray = article.Likes;
                likesArray.pop();
                return { ...article, Likes: likesArray };
              }
            } else {
              return article; //* total likes on article
            }
          })
        );

        //* detect liked on article
        if (likedArticle.includes(articleId)) {
          setLikedArticle(
            likedArticle.filter((id) => {
              return id != articleId;
            })
          );
        } else {
          setLikedArticle([...likedArticle, articleId]);
        }

        toast.success(response.data.message);
      });
  };

  return (
    <div className="container py-5 px-3 mt-3">
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
      <div className="d-flex justify-content-between align-items-center">
        <span className="h1 fw-bold">All Articles</span>
        <Link
          to="/createarticle"
          className="btn btn-md fw-bold text-white"
          style={{ backgroundColor: "#0a4275" }}
        >
          Create New Article
        </Link>
      </div>
      <hr />
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="search"
            name="search"
            className="form-control"
            autoComplete="off"
            placeholder="Search article by title or author name"
            value={searchItem}
            onChange={handleSearchInput}
          />
        </div>
      </div>
      <div className="container">
        {filteredArticles.length === 0 ? (
          <p className="h3">No articles found!</p>
        ) : (
          <div className="row">
            {filteredArticles &&
              filteredArticles.map((article) => {
                return (
                  <div className="col-md-4" key={article.id}>
                    <div className="card shadow mb-4">
                      <div
                        className="card-header text-white fw-bold"
                        style={{ backgroundColor: "#0a4275" }}
                      >
                        <div className="d-flex justify-content-between align-items center">
                          <span>{article.title}</span>
                          <span>[{article.id}]</span>
                        </div>
                      </div>
                      <div
                        className="card-body"
                        onClick={() => navigate(`/article/${article.id}`)}
                      >
                        <p className="card-text">{article.articleBody}</p>
                      </div>
                      <div
                        className="card-footer text-white d-flex justify-content-between align-items-center"
                        style={{ backgroundColor: "#0a4275" }}
                      >
                        <span className="fw-bold">by {article.username}</span>
                        <input
                          type="text"
                          readOnly
                          onClick={() => {
                            addLikeArticle(article.id);
                          }}
                          className="btn btn-sm btn-outline-light"
                          style={{ width: "60px" }}
                          value={
                            likedArticle.includes(article.id)
                              ? "Unlike"
                              : "Like"
                          }
                        />
                        <span className="text-white fw-bold">
                          {article.Likes.length}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
