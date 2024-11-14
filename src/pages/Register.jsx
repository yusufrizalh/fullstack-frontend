const RegisterComponent = () => {
  return (
    <div className="container mt-5 py-3 px-3">
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white h5 fw-bold">
              Register
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="fw-bold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Please enter your username"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="fw-bold mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Please enter your password"
                    autoComplete="off"
                    required
                  />
                </div>
                <div className="mt-5">
                  <button type="button" className="btn btn-md btn-primary">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
