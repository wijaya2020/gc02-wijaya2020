import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import loadingAnimation from "../components/assets/Spinner@1x-1.0s-200px-200px.svg";

export default function DetailProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductById = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://h8-phase2-gc.vercel.app/apis/pub/branded-things/products/${id}`
        );
        // console.log(data, "<<<<<<<<<<<<<<<<<< data");
        setProduct(data.data);
      } catch (error) {
        console.log(error, "<<<<<<<<<<<<<<<<<<<< error");
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [id]);

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-screen">
            {/* <b className="text-4xl">Loading...</b> */}
            <img src={loadingAnimation} />
          </div>
        </>
      ) : (
        <>
          <div className="mx-9 mt-5 flex flex-start bg-green-400 border-2 border-black p-5 rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] h-full">
            <div>
              <img
                src={product.imgUrl}
                alt="product-image"
                className="border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1) mb-3] h-full"
              />
            </div>

            <div className="flex mx-10 flex-col w-1/2 justify-between">
              <b className="mt-2 mb-5 text-4xl">{product.name}</b>

              <p className="mt-1 text-lg w-full ">{product.description}</p>
              <b className="mt-1 text-2xl">Price: Rp {product.price}</b>
              <Link
                to="/"
                className="flex justify-center mt-5 w-1/5 bg-blue-600 text-white py-2 border-2 border-black p-5 rounded-2xl hover:bg-blue-700 transition duration-200 shadow-[2px_2px_0px_rgba(0,0,0,1)] text-center "
              >
                Back to Home
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
