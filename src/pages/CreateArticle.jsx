import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateArticle = () => {
  const initialValues = {
    title: "Default Title",
    articleBody: "Default article content",
    username: "yusufrizalh",
  };

  const handleOnSubmitFormik = (data) => {
    const apiUrl = "http://127.0.0.1:8001/articles";
    axios.post(apiUrl, data).then((response) => {
      console.log("Data created successfully: ", response);
      toast("Data created successfully!");
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title cannot be empty"),
    articleBody: Yup.string().required("Article content cannot be empty"),
    username: Yup.string()
      .required("Username cannot be empty")
      .min(8, "Username at least 8 characters")
      .max(24, "Username maximum is 24 characters"),
  });

  return (
    <div className="container mt-5 py-3 px-3">
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white fw-bold h3">
              Create Article
            </div>
            <div className="card-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmitFormik}
              >
                <Form>
                  <div className="mb-3">
                    <label htmlFor="title" className="fw-bold mb-2">
                      Article Title
                    </label>
                    <Field
                      className="form-control"
                      name="title"
                      placeholder="Please enter article title"
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      <ErrorMessage name="title" />
                    </span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="articleBody" className="fw-bold mb-2">
                      Article Content
                    </label>
                    <Field
                      className="form-control"
                      name="articleBody"
                      placeholder="Please enter article content"
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      <ErrorMessage name="articleBody" />
                    </span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="fw-bold mb-2">
                      Article Author
                    </label>
                    <Field
                      className="form-control"
                      name="username"
                      placeholder="Please enter article author"
                      autoComplete="off"
                    />
                    <span className="text-danger">
                      <ErrorMessage name="username" />
                    </span>
                  </div>
                  <div className="mt-5">
                    <button type="submit" className="btn btn-md btn-primary">
                      Create Article
                    </button>
                  </div>
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
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
