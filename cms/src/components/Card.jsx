import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

export default function Card({ product, base_url, fetchProducts }) {
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `${base_url}/apis/branded-things/products/${product.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      fetchProducts();

      Toastify({
        text: "Succeed delete data",
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

  async function handleUpload() {
    try {
      // menggunakan FormData
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.patch(
        `${base_url}/apis/branded-things/products/${product.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );

      fetchProducts();

      Toastify({
        text: data.message,
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
      <tr>
        <td scope="row">#{product.id}</td>
        <td className="fw-bold">{product.name}</td>
        <td>
          <img src={product.imgUrl} className="img-fluid" />
        </td>
        <td className="">
          {product.description.length > 100
            ? product.description.substring(0, 100) + " . . ."
            : product.description}
        </td>
        <td>{product.stock}</td>
        <td className="fw-bold">{product.price}</td>
        <td>{product.User.email}</td>
        <td>
          <span className="d-flex">
            {/* tombol delete  */}
            <Link to="" className="ms-3">
              <span
                className="icon material-symbols-outlined text-danger"
                onClick={handleDelete}
              >
                delete
              </span>
            </Link>

            {/* tombol edit  */}
            <Link to="" className="ms-3">
              <span
                className="icon material-symbols-outlined text-danger"
                onClick={() => navigate(`/edit/${product.id}`)}
              >
                edit
              </span>
            </Link>

            {/* tombol upload  */}
            <span className="ms-3">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className=""
                style={{ width: "250px", cursor: "pointer" }}
              />

              <span
                className="icon material-symbols-outlined text-danger cursor-pointer"
                onClick={handleUpload}
                style={{ cursor: "pointer" }}
              >
                upload
              </span>
            </span>
          </span>
        </td>
      </tr>
    </>
  );
}
