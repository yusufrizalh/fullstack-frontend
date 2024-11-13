import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <>
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
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        ;
      </div>
    </>
  );
};

export default NavbarComponent;
