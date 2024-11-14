import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const data = { username: username, password: password };
    const apiUrlLogin = "http://127.0.0.1:8001/auth/login";
    axios.post(apiUrlLogin, data).then((response) => {
      console.log(response);
      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        localStorage.setItem("accessToken", response.data.accessToken);
      }
    });
  };

  return (
    <div className="container mt-5 py-3 px-3">
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white h5 fw-bold">
              Login
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="username" className="fw-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
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
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="form-control"
                  placeholder="Please enter your password"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="btn btn-md btn-primary"
                >
                  Login
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
    </div>
  );
};

export default LoginComponent;
