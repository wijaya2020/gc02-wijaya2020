import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AddUserPage({ base_url }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  async function handleSubmit(
    e,
    username,
    email,
    password,
    phoneNumber,
    address
  ) {
    e.preventDefault();

    try {
      const body = {
        username,
        email,
        password,
        phoneNumber,
        address,
      };
      const { data } = await axios.post(`${base_url}/apis/add-user`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      navigate("/");

      Toastify({
        text: `User created successfully`,
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocusef: true, // Prevents dismissing of toast on hover
        style: {
          background: "#008000",
        },
      }).showToast();
    } catch (error) {
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
      }).showToast();
    }
  }

  return (
    <>
      {/* Add User */}
      <section
        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
        id="add-user-section"
      >
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="display-2">Add User</h1>
        </div>

        <div className="row">
          <div className="col-12 col-md-6">
            <form
              id="user-form"
              onSubmit={(e) =>
                handleSubmit(e, username, email, password, phoneNumber, address)
              }
            >
              <div className="mb-3">
                <label htmlFor="user-name">
                  Username <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="user-name"
                  placeholder="Enter user name"
                  autoComplete="off"
                  required=""
                  onChange={(e) => setUserName(e.target.value)}
                  value={username}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="product-desc">
                  Email <span className="text-danger fw-bold">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="user-email"
                  placeholder="Enter your email"
                  autoComplete="off"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="user-password">
                      Password <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="user-password"
                      placeholder="Enter your password"
                      autoComplete="off"
                      required=""
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="user-phone">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="user-phone"
                  placeholder="Enter phone number"
                  autoComplete="off"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="user-address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="user-address"
                  placeholder="Enter your address"
                  autoComplete="off"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>

              <div className="row mt-5 mb-3">
                <div className="col-6">
                  <Link
                    to="/"
                    className="btn btn-lg btn-light rounded-pill w-100 p-2"
                    href=""
                  >
                    Cancel
                  </Link>
                </div>
                <div className="col-6">
                  <button className="btn btn-lg btn-primary rounded-pill w-100 p-2">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* End New Product Section */}
    </>
  );
}
