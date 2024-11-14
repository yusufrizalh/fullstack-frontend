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

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    username: "",
    status: false,
  });

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
                    <li className="nav-item">
                      <Link className="nav-link" to="/articles">
                        Articles
                      </Link>
                    </li>
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

  useEffect(() => {
    const apiUrl = "http://127.0.0.1:8001/articles";
    axios.get(apiUrl).then((response) => {
      console.log("RESPONSE: ", response);
      setArticles(response.data.data);
      setFilteredArticles(response.data.data);
    });
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

  return (
    <div className="container py-5 px-3 mt-3">
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
                    <div
                      className="card shadow mb-4"
                      onClick={() => navigate(`/article/${article.id}`)}
                    >
                      <div
                        className="card-header text-white fw-bold"
                        style={{ backgroundColor: "#0a4275" }}
                      >
                        <div className="d-flex justify-content-between align-items center">
                          <span>{article.title}</span>
                          <span>[{article.id}]</span>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="card-text">{article.articleBody}</p>
                      </div>
                      <div
                        className="card-footer text-white"
                        style={{ backgroundColor: "#0a4275" }}
                      >
                        Written by{" "}
                        <span className="fw-bold">{article.username}</span>
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
