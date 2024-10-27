import { useEffect, useState } from "react";
import ProductForm from "../components/ProductForm";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Toastify from "toastify-js";

export default function EditPage({ base_url }) {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(
    e,
    name,
    description,
    price,
    imgUrl,
    stock,
    categoryId
  ) {
    e.preventDefault();

    try {
      const body = {
        name,
        description,
        price: +price,
        imgUrl,
        stock: +stock,
        categoryId: +categoryId,
      };
      const { data } = await axios.put(
        `${base_url}/apis/branded-things/products/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      // console.log(data, "<<<<<<<<<<<<<<<<<< data");
      navigate("/");

      Toastify({
        text: `${data.message}`,
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

  async function fetchProduct() {
    try {
      // ambil data yg dari public aja
      const { data } = await axios.get(
        `${base_url}/apis/pub/branded-things/products/${id}`
      );

      // console.log(data, "<<<<<<<<<<<<<<<<< data");
      setProduct(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <ProductForm
        base_url={base_url}
        product={product}
        handleSubmit={handleSubmit}
        nameProp="Edit Product"
      />
    </>
  );
}
