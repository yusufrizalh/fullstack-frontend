const HomeComponent = () => {
  return (
    <div className="container">
      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold text-body-emphasis">
          Welcome to My React App
        </h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-sm-3"
            >
              Getting Started
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Close
            </button>
          </div>
        </div>
        <div className="overflow-hidden" style={{ "maxHeight": "30vh" }}>
          <div className="container px-5">
            <img
              src="https://i.ibb.co.com/MnPN2H8/Logo-X-Transparent-White.png"
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Logo-X"
              width="100"
              height="100"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
