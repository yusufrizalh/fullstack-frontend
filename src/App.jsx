/*
 * React components bisa dibuat dalam 2 cara:
 * 1> Class Component
 * 2> Functional Component (Regular & Arrow)
 *    > Regular function: function componentName() {}
 *    > Arrow function: const componentName = () => {}
 */

//* Class Component
import { Component, useEffect, useState } from "react";
//* import "./App.css";
import axios from "axios";
import NavbarComponent from "./layouts/Navbar";
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

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavbarComponent />
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
      </div>
    );
  }
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
