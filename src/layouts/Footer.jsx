const FooterComponent = () => {
  return (
    <section className="">
      <footer
        className="text-center text-white"
        style={{ "backgroundColor": "#0a4275" }}
      >
        <div className="container p-4 pb-0">
          <section className="">
            <p className="d-flex justify-content-center align-items-center">
              <span className="me-3">Register for free</span>
              <button
                type="button"
                className="btn btn-outline-light btn-rounded"
              >
                Sign up!
              </button>
            </p>
          </section>
        </div>

        <div
          className="text-center p-3"
          style={{ "backgroundColor": "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright: &nbsp;
          <a className="fw-bold text-white text-decoration-none" href="https://inixindo.id">
            INIXINDO.ID
          </a>
        </div>
      </footer>
    </section>
  );
};

export default FooterComponent;
