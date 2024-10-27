import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function Login({ base_url, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    // karena by default submit ada refresh
    e.preventDefault();

    try {
      const { data } = await axios.post(`${base_url}/apis/login`, {
        email,
        password,
      });
      // console.log(data, "<<<<<<<<<<<<<<<<<<<<<<<< data");

      localStorage.setItem("access_token", data.data.access_token);
      // console.log(localStorage, "<<<<<<<<<<<<<<<<<<<<<<<< localStorage");

      // setPage('home')
      navigate("/");

      // Toastify
      Toastify({
        text: "Login Success",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocusef: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    } catch (error) {
      // console.log(error);
      // Toastify
      Toastify({
        text: error.response.data.error,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocusef: true, // Prevents dismissing of toast on hover
        style: {
          background: "#FF0000",
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    }
  }

  return (
    <>
      {/* Login Section */}
      <section className="container" id="login-section">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5">Login Options</h1>
            <span>
              Log in and autocomplete your order with your personal data, or
              sign up to enjoy all the benefits of an IDEA account.
            </span>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <div className="row">
              <div className="col-12 col-md-6 border-end p-5 text-left">
                <img
                  src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/561/1056141_PE848273_S4.webp"
                  width="350px"
                  alt="sofa"
                />
              </div>
              <div className="col-12 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  {/* form login  */}
                  <form id="login-form" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 display-1">
                      Log in to your account
                    </h1>
                    <span>
                      Log in on your profile to autocomplete your purchase order
                      with your personal data.
                    </span>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email">Email</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="login-email"
                        placeholder="Enter email address ..."
                        autoComplete="off"
                        required=""
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-password">Password</label>
                        <label className="text-danger text-end fw-bold">
                          *
                        </label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="login-password"
                        placeholder="Enter your password ..."
                        autoComplete="off"
                        required=""
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {/* <div className="checkbox mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="login-remember"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="login-remember"
                        >
                          Remember me
                        </label>
                      </div>
                    </div> */}

                    <button className="btn btn-lg btn-primary rounded-pill w-100 p-2">
                      Log In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Login Section */}
    </>
  );
}
